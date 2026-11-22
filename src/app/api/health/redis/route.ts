
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function GET() {
  try {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      console.error("Redis configuration missing", {
        hasUrl: Boolean(url),
        hasToken: Boolean(token),
      });

      return NextResponse.json(
        { status: "Redis configuration missing" },
        { status: 503 }
      );
    }

    const redis = new Redis({ url, token });
    const result = await redis.ping();

    if (result !== "PONG") {
      console.error("Unexpected Redis ping response");

      return NextResponse.json(
        { status: "Redis connection failed" },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: "Redis connection successful",
    });
  } catch (error) {
    console.error(
      "Redis connection error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { status: "Redis connection failed" },
      { status: 503 }
    );
  }
}

