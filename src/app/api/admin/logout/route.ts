import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_OLD_NAMES } from "@/lib/adminCookie";

export async function POST(req: Request) {
  const origin = req.headers.get("origin") || "http://localhost:3000";
  const res = NextResponse.redirect(new URL("/?logout=1", origin));

  const allNames = [ADMIN_COOKIE_NAME, ...ADMIN_COOKIE_OLD_NAMES];
  for (const name of allNames) {
    res.cookies.set(name, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
  }

  return res;
}
