"use client";

import React, { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { jobs as allJobs, type Job } from "@/data/jobs";

type ModeFilter = "All" | "Hybrid" | "Onsite" | "Remote";
type TypeFilter = "All" | "Contract" | "Full-time" | "Part-time";

const OPTION_STYLE: React.CSSProperties = {
  backgroundColor: "#0b1220",
  color: "rgba(255,255,255,0.92)",
};

const MAX_RESUME_BYTES = 1 * 1024 * 1024; // 1MB

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function CareersPage() {
  // Apply modal
  const [applyOpen, setApplyOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  // Resume modal
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [resumeMsg, setResumeMsg] = useState<string>("");

  // File validations
  const [applyFileKey, setApplyFileKey] = useState(1);
  const [applyFileError, setApplyFileError] = useState<string>("");

  const [resumeFileKey, setResumeFileKey] = useState(1);
  const [resumeFileError, setResumeFileError] = useState<string>("");

  // Search + filters
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<ModeFilter>("All");
  const [type, setType] = useState<TypeFilter>("All");

  function openApply(j: Job) {
    setJob(j);
    setApplyFileError("");
    setApplyFileKey((k) => k + 1);
    setApplyOpen(true);
  }

  function closeApply() {
    setApplyOpen(false);
    setJob(null);
    setApplyFileError("");
  }

  function openResume() {
    setResumeMsg("");
    setResumeStatus("idle");
    setResumeFileError("");
    setResumeFileKey((k) => k + 1);
    setResumeOpen(true);
  }

  function closeResume() {
    setResumeOpen(false);
    setResumeFileError("");
  }

  function clearFilters() {
    setQ("");
    setMode("All");
    setType("All");
  }

  const isFiltered = useMemo(() => {
    return q.trim().length > 0 || mode !== "All" || type !== "All";
  }, [q, mode, type]);

  const visibleJobs = useMemo(() => {
    const query = q.trim().toLowerCase();
    const published = allJobs.filter((j) => j.published);

    const filtered = published.filter((j) => {
      const modeOk = mode === "All" ? true : j.mode === mode;
      const typeOk = type === "All" ? true : j.type === type;

      const hay = `${j.title} ${j.summary} ${j.location} ${j.mode} ${j.type}`.toLowerCase();
      const qOk = query ? hay.includes(query) : true;

      return modeOk && typeOk && qOk;
    });

    // Featured pin (max 2 visually) + newest posted after
    const sorted = [...filtered].sort((a, b) => {
      const af = a.featured ? 1 : 0;
      const bf = b.featured ? 1 : 0;
      if (bf !== af) return bf - af;

      const ad = Date.parse(a.posted) || 0;
      const bd = Date.parse(b.posted) || 0;
      return bd - ad;
    });

    let featuredSeen = 0;
    return sorted.map((j) => {
      if (!j.featured) return j;
      featuredSeen += 1;
      if (featuredSeen <= 2) return j;
      return { ...j, featured: false };
    });
  }, [q, mode, type]);

  const applyModalTitle = useMemo(() => (job ? `Apply: ${job.title}` : "Apply"), [job]);

  function validateFileOrReset(
    file: File | null,
    setError: (msg: string) => void,
    bumpKey: () => void
  ) {
    if (!file) {
      setError("");
      return true;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setError(`Resume exceeds 1MB. Selected file is ${formatBytes(file.size)}. Please upload a file up to 1MB.`);
      bumpKey();
      return false;
    }
    setError("");
    return true;
  }

  async function submitResume(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResumeStatus("submitting");
    setResumeMsg("");

    try {
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);

      const resume = fd.get("resume");
      const resumeFile = resume instanceof File ? resume : null;

      const ok = validateFileOrReset(resumeFile, setResumeFileError, () => setResumeFileKey((k) => k + 1));
      if (!ok) {
        setResumeStatus("error");
        setResumeMsg("Please upload a resume file up to 1MB.");
        return;
      }

      const res = await fetch("/api/resume", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResumeStatus("error");
        setResumeMsg(data?.error || "Submission failed.");
        return;
      }

      setResumeStatus("success");
      setResumeMsg("Resume submitted successfully. Thank you!");
      formEl.reset();
      setResumeFileKey((k) => k + 1);
    } catch {
      setResumeStatus("error");
      setResumeMsg("Submission failed. Please try again.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Careers</h1>

          {/* keep space + "here." together so it doesn't wrap */}
          <p className="mt-3 text-sm md:text-base ap-muted leading-relaxed">
            Explore current openings. If you don’t see a match, you can still submit your resume for upcoming roles
            <span className="whitespace-nowrap">
              {" "}
              <button
                type="button"
                onClick={openResume}
                className="inline-flex align-baseline underline underline-offset-4 hover:opacity-90"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                here.
              </button>
            </span>
          </p>
        </div>
      </Reveal>

      {/* Search + filters */}
      <Reveal>
        <div className="mt-7 ap-card p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <label className="text-sm font-semibold">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, location, summary…"
                className="mt-2 w-full rounded-lg px-3 py-2 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.92)",
                }}
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as ModeFilter)}
                className="mt-2 w-full rounded-lg px-3 py-2 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <option style={OPTION_STYLE}>All</option>
                <option style={OPTION_STYLE}>Hybrid</option>
                <option style={OPTION_STYLE}>Onsite</option>
                <option style={OPTION_STYLE}>Remote</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TypeFilter)}
                className="mt-2 w-full rounded-lg px-3 py-2 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <option style={OPTION_STYLE}>All</option>
                <option style={OPTION_STYLE}>Contract</option>
                <option style={OPTION_STYLE}>Full-time</option>
                <option style={OPTION_STYLE}>Part-time</option>
              </select>
            </div>

            <div className="md:col-span-12 mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs ap-muted">
                Showing <span className="font-semibold">{visibleJobs.length}</span> role(s)
                {isFiltered ? " (filtered)" : ""}
              </div>

              {isFiltered ? (
                <button
                  className="ap-btn-hover rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(229,231,235,0.90)",
                    minHeight: 44,
                  }}
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Empty state */}
      {visibleJobs.length === 0 ? (
        <Reveal>
          <div className="mt-8 ap-card p-6 md:p-7">
            <div className="text-lg md:text-xl font-semibold">No roles match your filters</div>
            <p className="mt-2 text-sm ap-muted max-w-2xl">
              Try adjusting Mode/Type or searching fewer keywords. You can also submit your resume for upcoming roles using the
              link above.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#0b1220",
                  border: "1px solid rgba(255,255,255,0.35)",
                  minHeight: 44,
                }}
                onClick={clearFilters}
              >
                Reset filters
              </button>

              <button
                className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.90)",
                  minHeight: 44,
                }}
                onClick={openResume}
              >
                Submit resume
              </button>
            </div>
          </div>
        </Reveal>
      ) : null}

      {/* Jobs list */}
      {visibleJobs.length > 0 ? (
        <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-2">
          {visibleJobs.map((j) => {
            const featuredCardStyle: React.CSSProperties | undefined = j.featured
              ? {
                  border: "1px solid rgba(255,255,255,0.22)",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
                  background: "rgba(255,255,255,0.045)",
                }
              : undefined;

            return (
              <Reveal key={j.id}>
                <div className="ap-card p-5 md:p-6" style={featuredCardStyle}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg md:text-xl font-semibold">{j.title}</div>

                        {j.featured ? (
                          <span
                            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                            style={{
                              background: "rgba(255,255,255,0.10)",
                              border: "1px solid rgba(255,255,255,0.20)",
                              color: "rgba(255,255,255,0.92)",
                            }}
                          >
                            Featured
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-2 text-sm ap-muted">
                        {j.location} • {j.mode} • {j.type}
                      </div>
                    </div>

                    <button
                      onClick={() => openApply(j)}
                      className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "#0b1220",
                        border: "1px solid rgba(255,255,255,0.35)",
                        whiteSpace: "nowrap",
                        minHeight: 44,
                      }}
                    >
                      Apply →
                    </button>
                  </div>

                  <p className="mt-4 text-sm ap-muted">{j.summary}</p>

                  <div className="mt-5 grid gap-4">
                    <div className="ap-card-strong p-4">
                      <div className="text-sm font-semibold">Responsibilities</div>
                      <ul className="mt-2 grid gap-1 text-sm ap-muted">
                        {j.responsibilities.map((x) => (
                          <li key={x}>• {x}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="ap-card-strong p-4">
                      <div className="text-sm font-semibold">Requirements</div>
                      <ul className="mt-2 grid gap-1 text-sm ap-muted">
                        {j.requirements.map((x) => (
                          <li key={x}>• {x}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs ap-muted">Posted: {j.posted}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : null}

      {/* APPLY MODAL */}
      {applyOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-10" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.70)", backdropFilter: "blur(6px)" }}
            onClick={closeApply}
          />
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 md:p-7"
            style={{
              background: "rgba(10,16,28,0.98)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.60)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl md:text-2xl font-bold">{applyModalTitle}</div>
                {job ? (
                  <div className="mt-1 text-sm ap-muted">
                    {job.location} • {job.mode} • {job.type}
                  </div>
                ) : null}
              </div>
              <button
                onClick={closeApply}
                className="rounded-lg px-3 py-2 text-sm hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.90)",
                  minHeight: 44,
                }}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold">Full name *</label>
                <input
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Email *</label>
                <input
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="you@email.com"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Phone (optional)</label>
                <input
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="(###) ###-####"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Resume *</label>
                <input
                  key={applyFileKey}
                  type="file"
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(229,231,235,0.92)",
                  }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    validateFileOrReset(file, setApplyFileError, () => setApplyFileKey((k) => k + 1));
                  }}
                />
                <div className="text-xs ap-muted">Max file size: 1MB.</div>
                {applyFileError ? (
                  <div
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {applyFileError}
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-2 grid gap-2">
                <label className="text-sm font-semibold">Short note (optional)</label>
                <textarea
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  rows={4}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="A few lines about your fit for this role…"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs ap-muted">
                This is a local demo modal. Step 14.DB will wire submissions into Supabase (resumes/messages) and jobs publishing.
              </p>
              <button
                className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#0b1220",
                  border: "1px solid rgba(255,255,255,0.35)",
                  minHeight: 44,
                }}
                onClick={() => alert("Submission wiring will be completed during DB setup.")}
              >
                Submit application
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* RESUME MODAL */}
      {resumeOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-10" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.70)", backdropFilter: "blur(6px)" }}
            onClick={closeResume}
          />

          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 md:p-7"
            style={{
              background: "rgba(10,16,28,0.98)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.60)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl md:text-2xl font-bold">Submit your resume</div>
                <p className="mt-1 text-sm ap-muted">
                  We’ll review your resume for upcoming roles and reach out if there’s a match.
                </p>
              </div>

              <button
                onClick={closeResume}
                className="rounded-lg px-3 py-2 text-sm hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.90)",
                  minHeight: 44,
                }}
              >
                Close
              </button>
            </div>

            <div className="mt-3 text-xs ap-muted">
              Stored locally: <code>src/data/submissions/resumes.jsonl</code>
            </div>

            <form onSubmit={submitResume} className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold">Full name *</label>
                <input
                  name="fullName"
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="you@email.com"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Phone (optional)</label>
                <input
                  name="phone"
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="(###) ###-####"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold">Resume *</label>
                <input
                  key={resumeFileKey}
                  name="resume"
                  type="file"
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(229,231,235,0.92)",
                  }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    validateFileOrReset(file, setResumeFileError, () => setResumeFileKey((k) => k + 1));
                  }}
                />
                <div className="text-xs ap-muted">Max file size: 1MB.</div>
                <div className="text-xs ap-muted">Recommended: PDF. Accepted: PDF/DOC/DOCX.</div>

                {resumeFileError ? (
                  <div
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {resumeFileError}
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-2 grid gap-2">
                <label className="text-sm font-semibold">Short note (optional)</label>
                <textarea
                  name="note"
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                  placeholder="A few lines about what you’re looking for…"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs ap-muted">
                  Uploads are saved to <code>/public/uploads/resumes</code> during local development.
                </div>

                <button
                  type="submit"
                  disabled={resumeStatus === "submitting"}
                  className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    color: "#0b1220",
                    border: "1px solid rgba(255,255,255,0.35)",
                    minHeight: 44,
                  }}
                >
                  {resumeStatus === "submitting" ? "Submitting…" : "Submit resume"}
                </button>
              </div>

              {resumeStatus !== "idle" ? (
                <div
                  className="md:col-span-2 rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: resumeStatus === "success" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                    border:
                      resumeStatus === "success"
                        ? "1px solid rgba(34,197,94,0.22)"
                        : "1px solid rgba(239,68,68,0.22)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {resumeMsg}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
