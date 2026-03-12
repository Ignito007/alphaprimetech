import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs"; // uses fs/Buffer; ensure Node runtime

const MAX_RESUME_BYTES = 1 * 1024 * 1024; // 1MB

// Allowed extensions (normalized to lower-case)
const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

// Allowed MIME types (best-effort; some browsers may send empty/odd values)
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/**
 * Basic IP rate limit (in-memory):
 * - 5 submissions per 10 minutes per IP
 * - Sliding window via timestamps
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

type RateEntry = { hits: number[] }; // timestamps (ms) within window

function getRateStore(): Map<string, RateEntry> {
  const g = globalThis as unknown as { __ap_resume_rate__?: Map<string, RateEntry> };
  if (!g.__ap_resume_rate__) g.__ap_resume_rate__ = new Map<string, RateEntry>();
  return g.__ap_resume_rate__;
}

function getClientIp(req: Request): string {
  // Try common proxy headers first
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    // first IP in list is original client
    const ip = xf.split(",")[0]?.trim();
    if (ip) return ip;
  }
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();

  // Fallback (best effort)
  return "unknown";
}

function rateLimitOrThrow(req: Request): { ok: true } | { ok: false; retryAfterSec: number } {
  const ip = getClientIp(req);
  const store = getRateStore();
  const now = Date.now();

  const entry = store.get(ip) ?? { hits: [] };

  // Keep only hits within window
  entry.hits = entry.hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (entry.hits.length >= RATE_LIMIT_MAX) {
    const oldest = entry.hits[0] ?? now;
    const retryAfterMs = Math.max(0, RATE_LIMIT_WINDOW_MS - (now - oldest));
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    store.set(ip, entry);
    return { ok: false, retryAfterSec };
  }

  // Record hit
  entry.hits.push(now);
  store.set(ip, entry);

  // Opportunistic cleanup to avoid unbounded growth
  // (remove "unknown" only if it's empty; otherwise keep it)
  if (store.size > 5000) {
    // prune entries with empty hits
    for (const [k, v] of store.entries()) {
      if (!v.hits.length) store.delete(k);
    }
  }

  return { ok: true };
}

function safeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);
}

function isAllowedResume(file: File) {
  const originalName = String(file.name || "").trim();
  const ext = path.extname(originalName).toLowerCase();

  const mime = String(file.type || "").toLowerCase();

  const extOk = ALLOWED_EXT.has(ext);

  // MIME can be unreliable (sometimes empty). We allow:
  // - MIME matches allow-list OR MIME empty/unknown but extension is allowed.
  const mimeOk = mime ? ALLOWED_MIME.has(mime) : true;

  return { extOk, mimeOk, ext, mime };
}

export async function POST(req: Request) {
  try {
    // 0) Rate limit (before reading file bytes)
    const rl = rateLimitOrThrow(req);
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please try again in ${rl.retryAfterSec} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rl.retryAfterSec),
          },
        }
      );
    }

    const form = await req.formData();

    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const note = String(form.get("note") || "").trim();

    const file = form.get("resume");

    if (!fullName || !email) {
      return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Resume file is required." }, { status: 400 });
    }

    // 1) Size limit enforcement (server-side)
    if (typeof file.size === "number" && file.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume exceeds 1MB. Please upload a file up to 1MB." },
        { status: 413 }
      );
    }

    // 2) Type enforcement (server-side) using extension + MIME
    const { extOk, mimeOk } = isAllowedResume(file);
    if (!extOk || !mimeOk) {
      return NextResponse.json(
        { error: "Invalid resume file type. Please upload PDF, DOC, or DOCX." },
        { status: 415 }
      );
    }

    const now = new Date();
    const ts = now.toISOString();
    const date = ts.slice(0, 10);

    const original = safeFilename(file.name || "resume");
    const ext = path.extname(original).toLowerCase() || ".pdf";
    const base = safeFilename(path.basename(original, ext)) || "resume";
    const storedName = `${date}-${Date.now()}-${base}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await fs.mkdir(uploadsDir, { recursive: true });

    const bytes = Buffer.from(await file.arrayBuffer());
    const storedPath = path.join(uploadsDir, storedName);
    await fs.writeFile(storedPath, bytes);

    const record = {
      id: `res-${Date.now()}`,
      submittedAt: ts,
      fullName,
      email,
      phone,
      note,
      file: {
        originalName: file.name,
        storedName,
        publicUrl: `/uploads/resumes/${storedName}`,
        size: file.size,
        type: file.type,
      },
      source: "careers",
    };

    const submissionsDir = path.join(process.cwd(), "src", "data", "submissions");
    await fs.mkdir(submissionsDir, { recursive: true });

    const jsonlPath = path.join(submissionsDir, "resumes.jsonl");
    await fs.appendFile(jsonlPath, JSON.stringify(record) + "\n", "utf8");

    return NextResponse.json({ ok: true, record });
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
