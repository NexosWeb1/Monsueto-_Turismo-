import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "mt_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET || "dev-secret-troque-em-producao-monsueto-turismo";
  return new TextEncoder().encode(secret);
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyToken(token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function checkPassword(senha: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "monsueto123";
  return senha === expected;
}

export const SESSION_MAX_AGE = MAX_AGE;
