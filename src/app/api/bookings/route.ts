
import { NextRequest, NextResponse } from "next/server";
import { randomUUID, createHash } from "node:crypto";
import { z } from "zod";

import { verifyTurnstile } from "@/lib/turnstile";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkBookingRateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 8192;

// Validate passenger booking details.
const bookingSchema = z
  .object({
    passenger_name: z.string().trim().min(2).max(120),

    email: z.email().max(254),

    phone: z
      .string()
      .trim()
      .min(7)
      .max(25)
      .regex(/^[+()\d\s-]+$/),

    pickup_address: z.string().trim().min(5).max(500),

    destination_address: z.string().trim().min(5).max(500),

    pickup_at: z.iso.datetime({ offset: true }),

    passengers: z.number().int().min(1).max(8),

    special_requirements: z
      .string()
      .trim()
      .max(1000)
      .optional(),

    turnstile_token: z.string().min(1).max(2048),
  })
  .strict();

// Return errors without exposing internal information.
function respondError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

// Identify request sources for rate limiting.
function getRateLimitIdentifier(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return "local-development";
  }

  if (process.env.HOSTING_PROVIDER !== "vercel") {
    throw new Error("Trusted proxy not configured");
  }

  const ip = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  if (!ip) {
    throw new Error("Trusted client IP unavailable");
  }

  const salt = process.env.RATE_LIMIT_IP_SALT;

  if (!salt) {
    throw new Error("Rate limit salt not configured");
  }

  return createHash("sha256")
    .update(`${salt}:${ip}`)
    .digest("hex");
}

export async function POST(request: NextRequest) {

  // 1. PUBLIC BOOKING SAFETY SWITCH
  // Keep bookings disabled until the system is approved
  // for live passenger use.
  if (process.env.ENABLE_PUBLIC_BOOKINGS !== "true") {
    return respondError(
      "Online booking requests are temporarily unavailable. Please contact info@transportnavigator.co.uk.",
      503
    );
  }

  // 2. RATE LIMITING
  try {
    const identifier = getRateLimitIdentifier(request);

    const result = await checkBookingRateLimit(identifier);

    if (!result.success) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": String(
              Math.max(
                1,
                Math.ceil(
                  (result.reset - Date.now()) / 1000
                )
              )
            ),
          },
        }
      );
    }
  } catch {
    console.error("Booking rate limit check failed");

    return respondError(
      "Booking service temporarily unavailable",
      503
    );
  }

  // 3. CONTENT TYPE VALIDATION
  const contentType =
    request.headers.get("content-type") ?? "";

  if (
    !contentType
      .toLowerCase()
      .startsWith("application/json")
  ) {
    return respondError(
      "JSON content required",
      415
    );
  }

  // 4. REQUEST SIZE VALIDATION
  const lengthHeader =
    request.headers.get("content-length");

  if (lengthHeader !== null) {
    const contentLength = Number(lengthHeader);

    if (
      !Number.isSafeInteger(contentLength) ||
      contentLength < 0 ||
      contentLength > MAX_BODY_BYTES
    ) {
      return respondError(
        "Request too large",
        413
      );
    }
  }

  try {
    const reader = request.body?.getReader();

    if (!reader) {
      return respondError(
        "Request body required",
        400
      );
    }

    const chunks: Buffer[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();

        return respondError(
          "Request too large",
          413
        );
      }

      chunks.push(Buffer.from(value));
    }

    // 5. PARSE JSON SAFELY
    let submitted: unknown;

    try {
      submitted = JSON.parse(
        Buffer.concat(chunks).toString("utf8")
      );
    } catch {
      return respondError(
        "Invalid JSON",
        400
      );
    }

    // 6. VALIDATE PASSENGER DETAILS
    const parsed = bookingSchema.safeParse(submitted);

    if (!parsed.success) {
      return respondError(
        "Please check your booking details",
        400
      );
    }

    const booking = parsed.data;

    const pickupTime = Date.parse(booking.pickup_at);

    if (
      !Number.isFinite(pickupTime) ||
      pickupTime <= Date.now() + 15 * 60 * 1000
    ) {
      return respondError(
        "Please select a future pickup time",
        400
      );
    }

    // 7. VERIFY CLOUDFLARE TURNSTILE
    const isHuman = await verifyTurnstile(
      booking.turnstile_token
    );

    if (!isHuman) {
      return respondError(
        "Security verification failed. Please try again.",
        403
      );
    }

    // 8. GENERATE UNIQUE BOOKING REFERENCE
    const reference = `TN-${randomUUID()
      .replaceAll("-", "")
      .slice(0, 12)
      .toUpperCase()}`;

    // 9. SAVE BOOKING TO SUPABASE
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("booking_requests")
      .insert({
        reference,
        passenger_name: booking.passenger_name,
        email: booking.email.toLowerCase(),
        phone: booking.phone,
        pickup_address: booking.pickup_address,
        destination_address:
          booking.destination_address,
        pickup_at: booking.pickup_at,
        passengers: booking.passengers,
        special_requirements:
          booking.special_requirements || null,
        status: "pending_review",
      });

    if (error) {
      console.error(
        "Booking insert failed:",
        error.code
      );

      return respondError(
        "Unable to submit your request",
        500
      );
    }

    // 10. RETURN BOOKING ACKNOWLEDGEMENT
    return NextResponse.json(
      {
        reference,
        status: "pending_review",
        message:
          "Your journey request has been received. It is not yet a confirmed booking.",
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    console.error(
      "Booking request processing failed"
    );

    return respondError(
      "Unable to process your request",
      500
    );
  }
}
