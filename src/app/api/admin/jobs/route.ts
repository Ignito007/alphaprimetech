import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

type Job = {
  id: string;
  title: string;
  location: string;
  mode: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  posted: string;
  published: boolean;
  featured: boolean;
};

const STORE_PATH = path.join(process.cwd(), "src", "data", "jobs.store.json");

async function readStore(): Promise<{ jobs: Job[] }> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const data = JSON.parse(raw);
    return { jobs: Array.isArray(data?.jobs) ? data.jobs : [] };
  } catch {
    return { jobs: [] };
  }
}

async function writeStore(jobs: Job[]) {
  const data = { jobs };
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

function enforceFeaturedLimit(jobs: Job[]) {
  // only published jobs can be featured; max 2 featured
  const published = jobs.map((j) => (j.published ? j : { ...j, featured: false }));

  const featured = published.filter((j) => j.featured);
  if (featured.length <= 2) return published;

  // if >2, keep the newest 2 by posted date, turn off the rest
  const sorted = [...featured].sort((a, b) => {
    const ad = Date.parse(a.posted) || 0;
    const bd = Date.parse(b.posted) || 0;
    return bd - ad;
  });

  const keep = new Set(sorted.slice(0, 2).map((x) => x.id));
  return published.map((j) => (j.featured && !keep.has(j.id) ? { ...j, featured: false } : j));
}

export async function GET() {
  const store = await readStore();
  const jobs = enforceFeaturedLimit(store.jobs);

  // keep store consistent
  if (JSON.stringify(jobs) !== JSON.stringify(store.jobs)) {
    await writeStore(jobs);
  }

  return NextResponse.json({ ok: true, jobs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body?.title || "").trim();
    const location = String(body?.location || "").trim();
    const mode = String(body?.mode || "").trim();
    const type = String(body?.type || "").trim();
    const summary = String(body?.summary || "").trim();

    const responsibilities = Array.isArray(body?.responsibilities) ? body.responsibilities.map(String) : [];
    const requirements = Array.isArray(body?.requirements) ? body.requirements.map(String) : [];

    if (!title || !location || !mode || !type || !summary) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (title, location, mode, type, summary)." },
        { status: 400 }
      );
    }

    const store = await readStore();

    const now = new Date();
    const job: Job = {
      id: `job-${Date.now()}`,
      title,
      location,
      mode,
      type,
      summary,
      responsibilities,
      requirements,
      posted: now.toISOString().slice(0, 10),
      published: Boolean(body?.published ?? true),
      featured: Boolean(body?.featured ?? false),
    };

    const jobs = enforceFeaturedLimit([job, ...store.jobs]);
    await writeStore(jobs);

    return NextResponse.json({ ok: true, job });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create job." }, { status: 500 });
  }
}
