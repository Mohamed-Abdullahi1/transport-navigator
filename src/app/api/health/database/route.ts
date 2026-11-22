
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { status: "Supabase configuration missing" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: {
        apikey: key,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "Supabase connection failed",
          httpStatus: response.status,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: "Supabase connection successful",
      databaseAccess: "Not tested",
    });
  } catch {
    return NextResponse.json(
      { status: "Supabase connection failed" },
      { status: 503 }
    );
  }
}
