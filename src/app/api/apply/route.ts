import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const jobId = String(form.get("jobId") ?? "");
    const jobTitle = String(form.get("jobTitle") ?? "");
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const note = String(form.get("note") ?? "");
    const resume = form.get("resume");

    if (!jobId || !jobTitle || !name || !email || !resume || !(resume instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const submissionsDir = path.join(process.cwd(), "src", "data", "submissions");
    if (!fs.existsSync(submissionsDir)) fs.mkdirSync(submissionsDir, { recursive: true });

    const uploadsDir = path.join(submissionsDir, "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = resume.name.replace(/[^\w.\-()]/g, "_");
    const stamped = `${Date.now()}_${safeName}`;
    const outPath = path.join(uploadsDir, stamped);
    fs.writeFileSync(outPath, buffer);

    const logFile = path.join(submissionsDir, "applications.jsonl");
    const record = {
      type: "job-application",
      ts: new Date().toISOString(),
      jobId,
      jobTitle,
      name,
      email,
      phone,
      note,
      storedFile: `src/data/submissions/uploads/${stamped}`,
      originalFileName: resume.name,
      mimeType: resume.type,
      sizeBytes: resume.size,
    };

    fs.appendFileSync(logFile, JSON.stringify(record) + "\n", "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to apply." },
      { status: 500 }
    );
  }
}
