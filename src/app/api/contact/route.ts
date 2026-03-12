import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), "src", "data", "submissions");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = path.join(dir, "contact.jsonl");
    const record = {
      type: "contact",
      ts: new Date().toISOString(),
      ...body,
    };

    fs.appendFileSync(file, JSON.stringify(record) + "\n", "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to submit." },
      { status: 500 }
    );
  }
}
