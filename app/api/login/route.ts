import { NextResponse } from "next/server";
import { checkPassword, createToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(req: Request) {
  const { senha } = await req.json().catch(() => ({ senha: "" }));

  if (!checkPassword(senha)) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = await createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
