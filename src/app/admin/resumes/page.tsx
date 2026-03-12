"use client";

import { useEffect, useMemo, useState } from "react";

type ResumeItem = {
  id?: string;
  submittedAt?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  note?: string;
  file?: {
    originalName?: string;
    storedName?: string;
    publicUrl?: string;
    size?: number;
    type?: string;
  };
  source?: string;
};

function csvEscape(v: any) {
  const s = String(v ?? "");
  const escaped = s.replace(/"/g, '""');
  return `"${escaped}"`;
}

function downloadCsv(filename: string, rows: string[][]) {
  const content = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminResumesPage() {
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string | null>(null);
  const [items, setItems] = useState<ResumeItem[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/resumes", { cache: "no-store" });
      const data = await res.json();
      setSource(data?.source ?? null);
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch {
      setSource(null);
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
    return items.filter((x) => {
      const hay = `${x.fullName || ""} ${x.email || ""} ${x.phone || ""} ${x.note || ""} ${x.file?.originalName || ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [items, q]);

  function exportCsv() {
    const rows: string[][] = [];
    rows.push(["submittedAt", "fullName", "email", "phone", "note", "fileUrl", "fileName"]);

    for (const x of filtered) {
      rows.push([
        csvEscape(x.submittedAt),
        csvEscape(x.fullName),
        csvEscape(x.email),
        csvEscape(x.phone),
        csvEscape(x.note),
        csvEscape(x.file?.publicUrl),
        csvEscape(x.file?.originalName || x.file?.storedName),
      ]);
    }

    downloadCsv(`alphaprimetech-resumes-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  }

  return (
    <main className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Resumes</h1>
          <p className="mt-2 text-sm ap-muted">
            View resume submissions saved locally. Source file:{" "}
            <span className="font-semibold">{source || "(not found yet)"}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name/email/file…"
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

          <button
            onClick={exportCsv}
            className="ap-btn-hover rounded-lg px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(229,231,235,0.92)",
              minHeight: 44,
              whiteSpace: "nowrap",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 text-xs ap-muted">
        Total: <span className="font-semibold">{filtered.length}</span>
        {loading ? " (loading…)" : ""}
      </div>

      <div className="mt-6 grid gap-4">
        {!loading && filtered.length === 0 ? (
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">No resumes found</div>
            <p className="mt-2 text-sm ap-muted">Submit a resume from Careers and then click Refresh.</p>
          </div>
        ) : null}

        {filtered.map((x, idx) => (
          <div key={(x.id || "") + idx} className="ap-card p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-lg font-semibold">{x.fullName || "(No name)"}</div>
                <div className="mt-1 text-sm ap-muted">
                  {x.email || "(no email)"} {x.phone ? `• ${x.phone}` : ""}
                </div>
                <div className="mt-2 text-xs ap-muted">
                  Submitted: {x.submittedAt || "(unknown)"} {x.source ? `• Source: ${x.source}` : ""}
                </div>
              </div>

              {x.file?.publicUrl ? (
                <a
                  href={x.file.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ap-btn-hover rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(229,231,235,0.92)",
                    minHeight: 44,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  Open resume →
                </a>
              ) : (
                <div className="text-xs ap-muted">(No file link)</div>
              )}
            </div>

            {x.note ? (
              <div className="mt-4 ap-card-strong p-4">
                <div className="text-sm font-semibold">Candidate note</div>
                <p className="mt-2 text-sm ap-muted whitespace-pre-wrap">{x.note}</p>
              </div>
            ) : null}

            {x.file ? (
              <div className="mt-4 text-xs ap-muted">
                File: <span className="font-semibold">{x.file.originalName || x.file.storedName}</span>
                {typeof x.file.size === "number" ? ` • ${Math.round(x.file.size / 1024)} KB` : ""}
                {x.file.type ? ` • ${x.file.type}` : ""}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
