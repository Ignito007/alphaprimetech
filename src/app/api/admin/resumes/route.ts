import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJsonlAny(pathsToTry: string[]) {
  for (const p of pathsToTry) {
    if (await fileExists(p)) {
      const raw = await fs.readFile(p, "utf8");
      const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
      const items = [];
      for (const line of lines) {
        try {
          items.push(JSON.parse(line));
        } catch {
          // ignore bad line
        }
      }
      return { usedPath: p, items };
    }
  }
  return { usedPath: null as string | null, items: [] as any[] };
}

export async function GET() {
  try {
    const submissionsDir = path.join(process.cwd(), "src", "data", "submissions");

    const candidates = [
      path.join(submissionsDir, "resumes.jsonl"),
      path.join(submissionsDir, "resume.jsonl"),
      path.join(submissionsDir, "resume-submissions.jsonl"),
    ];

    const { usedPath, items } = await readJsonlAny(candidates);

    // sort newest first
    items.sort((a, b) => {
      const ad = Date.parse(a?.submittedAt || a?.createdAt || "") || 0;
      const bd = Date.parse(b?.submittedAt || b?.createdAt || "") || 0;
      return bd - ad;
    });

    return NextResponse.json({
      ok: true,
      source: usedPath ? path.relative(process.cwd(), usedPath) : null,
      count: items.length,
      items,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to read resumes." }, { status: 500 });
  }
}
