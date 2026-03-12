"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function AdminJobsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Job[]>([]);
  const [q, setQ] = useState("");

  // create form
  const [cTitle, setCTitle] = useState("");
  const [cLocation, setCLocation] = useState("");
  const [cMode, setCMode] = useState("Hybrid");
  const [cType, setCType] = useState("Contract");
  const [cSummary, setCSummary] = useState("");
  const [cResp, setCResp] = useState("");
  const [cReq, setCReq] = useState("");
  const [cPublish, setCPublish] = useState(true);
  const [cFeatured, setCFeatured] = useState(false);
  const [createMsg, setCreateMsg] = useState<string>("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs", { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data?.jobs) ? data.jobs : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((j) => {
      const hay = `${j.title} ${j.location} ${j.mode} ${j.type} ${j.summary}`.toLowerCase();
      return hay.includes(query);
    });
  }, [items, q]);

  async function patchJob(id: string, patch: Partial<Job>) {
    setItems((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));

    const res = await fetch(`/api/admin/jobs/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (!res.ok) {
      await load();
    } else {
      await load();
    }
  }

  async function deleteJob(id: string) {
    const ok = confirm("Delete this job? This cannot be undone.");
    if (!ok) return;

    setItems((prev) => prev.filter((j) => j.id !== id));
    const res = await fetch(`/api/admin/jobs/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) await load();
  }

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    setCreateMsg("");

    const responsibilities = cResp
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const requirements = cReq
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const payload = {
      title: cTitle.trim(),
      location: cLocation.trim(),
      mode: cMode,
      type: cType,
      summary: cSummary.trim(),
      responsibilities,
      requirements,
      published: cPublish,
      featured: cFeatured,
    };

    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setCreateMsg(data?.error || "Failed to create job.");
      return;
    }

    setCreateMsg("Job created successfully.");
    setCTitle("");
    setCLocation("");
    setCMode("Hybrid");
    setCType("Contract");
    setCSummary("");
    setCResp("");
    setCReq("");
    setCPublish(true);
    setCFeatured(false);

    await load();
  }

  return (
    <main className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Jobs</h1>
          <p className="mt-2 text-sm ap-muted">Create, publish/unpublish, feature (max 2), and delete jobs.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs…"
            className="w-full sm:w-72 rounded-lg px-3 py-2 text-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.92)",
            }}
          />
          <button
            onClick={load}
            className="ap-btn-hover rounded-lg px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#0b1220",
              border: "1px solid rgba(255,255,255,0.35)",
              minHeight: 44,
              whiteSpace: "nowrap",
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Create Job */}
      <div className="mt-6 ap-card p-5 md:p-6">
        <div className="text-lg font-semibold">Create a new job</div>
        <p className="mt-1 text-sm ap-muted">Responsibilities/Requirements: one bullet per line.</p>

        <form onSubmit={createJob} className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Title *</label>
            <input
              value={cTitle}
              onChange={(e) => setCTitle(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
              placeholder="e.g., Senior Java Developer"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Location *</label>
            <input
              value={cLocation}
              onChange={(e) => setCLocation(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
              placeholder="e.g., New York, NY"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Mode *</label>
            <select
              value={cMode}
              onChange={(e) => setCMode(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Hybrid</option>
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Onsite</option>
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Remote</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Type *</label>
            <select
              value={cType}
              onChange={(e) => setCType(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Contract</option>
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Full-time</option>
              <option style={{ backgroundColor: "#0b1220", color: "rgba(255,255,255,0.92)" }}>Part-time</option>
            </select>
          </div>

          <div className="md:col-span-2 grid gap-2">
            <label className="text-sm font-semibold">Summary *</label>
            <textarea
              value={cSummary}
              onChange={(e) => setCSummary(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm"
              rows={3}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
              placeholder="Short overview of the role…"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Responsibilities</label>
            <textarea
              value={cResp}
              onChange={(e) => setCResp(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm"
              rows={6}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
              placeholder={"One responsibility per line\nExample:\nBuild APIs\nWrite unit tests"}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Requirements</label>
            <textarea
              value={cReq}
              onChange={(e) => setCReq(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm"
              rows={6}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.92)",
              }}
              placeholder={"One requirement per line\nExample:\n5+ years Java\nSpring Boot"}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm ap-muted">
                <input type="checkbox" checked={cPublish} onChange={(e) => setCPublish(e.target.checked)} />
                Publish immediately
              </label>

              <label className="flex items-center gap-2 text-sm ap-muted">
                <input type="checkbox" checked={cFeatured} onChange={(e) => setCFeatured(e.target.checked)} />
                Mark as featured (max 2)
              </label>
            </div>

            <button
              type="submit"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
                minHeight: 44,
                whiteSpace: "nowrap",
              }}
            >
              Create job
            </button>
          </div>

          {createMsg ? (
            <div
              className="md:col-span-2 rounded-xl px-4 py-3 text-sm"
              style={{
                background: createMsg.includes("success") ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                border: createMsg.includes("success")
                  ? "1px solid rgba(34,197,94,0.22)"
                  : "1px solid rgba(239,68,68,0.22)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {createMsg}
            </div>
          ) : null}
        </form>
      </div>

      {/* Existing jobs list */}
      <div className="mt-6 text-xs ap-muted">
        Total: <span className="font-semibold">{filtered.length}</span>
        {loading ? " (loading…)" : ""}
      </div>

      <div className="mt-6 grid gap-4">
        {filtered.map((j) => (
          <div key={j.id} className="ap-card p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-lg font-semibold">{j.title}</div>
                <div className="mt-1 text-sm ap-muted">
                  {j.location} • {j.mode} • {j.type}
                </div>
                <div className="mt-2 text-xs ap-muted">Posted: {j.posted}</div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  onClick={() => patchJob(j.id, { published: !j.published, featured: j.published ? j.featured : false })}
                  className="ap-btn-hover rounded-lg px-3 py-2 text-sm font-semibold"
                  style={{
                    background: j.published ? "rgba(34,197,94,0.14)" : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                    minHeight: 44,
                    whiteSpace: "nowrap",
                  }}
                >
                  {j.published ? "Published" : "Unpublished"}
                </button>

                <button
                  onClick={() => patchJob(j.id, { featured: !j.featured })}
                  disabled={!j.published}
                  className="ap-btn-hover rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-50"
                  style={{
                    background: j.featured ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                    minHeight: 44,
                    whiteSpace: "nowrap",
                  }}
                >
                  {j.featured ? "Featured" : "Not featured"}
                </button>

                <button
                  onClick={() => deleteJob(j.id)}
                  className="ap-btn-hover rounded-lg px-3 py-2 text-sm font-semibold"
                  style={{
                    background: "rgba(239,68,68,0.14)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                    minHeight: 44,
                    whiteSpace: "nowrap",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {j.summary ? <p className="mt-4 text-sm ap-muted">{j.summary}</p> : null}
          </div>
        ))}
      </div>
    </main>
  );
}
