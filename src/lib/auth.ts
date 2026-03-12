// Edge-safe auth helpers (no Node "crypto" import).
// Uses Web Crypto API in middleware/runtime environments.

type SessionPayload = {
  email: string;
  iat: number;
};

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET is missing or too short (set in .env.local).");
  }
  return s;
}

function base64urlFromBytes(bytes: Uint8Array) {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  const b64 = btoa(str);
  return b64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function bytesFromBase64url(input: string) {
  const pad = 4 - (input.length % 4 || 4);
  const b64 = input.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat(pad);
  const str = atob(b64);
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i);
  return out;
}

function base64urlFromString(input: string) {
  const bytes = new TextEncoder().encode(input);
  return base64urlFromBytes(bytes);
}

function stringFromBase64url(input: string) {
  const bytes = bytesFromBase64url(input);
  return new TextDecoder().decode(bytes);
}

async function hmacSha256Base64url(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64urlFromBytes(new Uint8Array(sig));
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const secret = getSecret();
  const body = base64urlFromString(JSON.stringify(payload));
  const signature = await hmacSha256Base64url(secret, body);
  return `${body}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getSecret();
    const [body, signature] = token.split(".");
    if (!body || !signature) return null;

    const expected = await hmacSha256Base64url(secret, body);
    if (signature !== expected) return null;

    const json = stringFromBase64url(body);
    const payload = JSON.parse(json) as SessionPayload;

    if (!payload?.email || typeof payload.iat !== "number") return null;

    // Expire after 7 days
    const ageMs = Date.now() - payload.iat;
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs) return null;

    return payload;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const envEmail = process.env.ADMIN_EMAIL || "";
  const envPass = process.env.ADMIN_PASSWORD || "";
  return email === envEmail && password === envPass;
}
