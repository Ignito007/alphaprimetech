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

  // if >2, keep newest 2 by posted date, turn off the rest
  const sorted = [...featured].sort((a, b) => {
    const ad = Date.parse(a.posted) || 0;
    const bd = Date.parse(b.posted) || 0;
    return bd - ad;
  });

  const keep = new Set(sorted.slice(0, 2).map((x) => x.id));
  return published.map((j) => (j.featured && !keep.has(j.id) ? { ...j, featured: false } : j));
}

/**
 * Next.js 16+ (in some setups) passes params as a Promise in route handlers.
 * We must await it before reading properties.
 */
type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const patch = await req.json();

    const store = await readStore();
    const idx = store.jobs.findIndex((j) => j.id === id);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Job not found." }, { status: 404 });
    }

    const current = store.jobs[idx];

    const next: Job = {
      ...current,
      ...patch,
      responsibilities: Array.isArray(patch?.responsibilities)
        ? patch.responsibilities.map(String)
        : current.responsibilities,
      requirements: Array.isArray(patch?.requirements)
        ? patch.requirements.map(String)
        : current.requirements,
      published: typeof patch?.published === "boolean" ? patch.published : current.published,
      featured: typeof patch?.featured === "boolean" ? patch.featured : current.featured,
    };

    const jobs = [...store.jobs];
    jobs[idx] = next;

    const normalized = enforceFeaturedLimit(jobs);
    await writeStore(normalized);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update job." }, { status: 500 });
  }
}

export async function DELETE(_: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const store = await readStore();
    const jobs = store.jobs.filter((j) => j.id !== id);

    await writeStore(jobs);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to delete job." }, { status: 500 });
  }
}
