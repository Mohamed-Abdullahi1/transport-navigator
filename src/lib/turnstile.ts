
import "server-only";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(
  token: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  const allowedHostnames = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? ""
  )
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (
    !secret ||
    !token ||
    token.length > 2048 ||
    allowedHostnames.length === 0
  ) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret,
          response: token,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result =
      (await response.json()) as TurnstileResponse;

    return (
      result.success === true &&
      result.action === "booking" &&
      allowedHostnames.includes(result.hostname ?? "")
    );
  } catch {
    return false;
  }
}
