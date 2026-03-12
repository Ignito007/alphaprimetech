"use client";

import { useEffect, useMemo, useState } from "react";

type MsgItem = {
  id?: string;
  submittedAt?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
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

export default function AdminMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string | null>(null);
  const [items, setItems] = useState<MsgItem[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
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
      const hay = `${x.name || ""} ${x.email || ""} ${x.phone || ""} ${x.subject || ""} ${x.company || ""} ${x.message || ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [items, q]);

  function exportCsv() {
    const rows: string[][] = [];
    rows.push(["submittedAt", "name", "email", "phone", "company", "subject", "message"]);

    for (const x of filtered) {
      rows.push([
        csvEscape(x.submittedAt),
        csvEscape(x.name),
        csvEscape(x.email),
        csvEscape(x.phone),
        csvEscape(x.company),
        csvEscape(x.subject),
        csvEscape(x.message),
      ]);
    }

    downloadCsv(`alphaprimetech-messages-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  }

  return (
    <main className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Contact Messages</h1>
          <p className="mt-2 text-sm ap-muted">
            View contact form submissions saved locally. Source file:{" "}
            <span className="font-semibold">{source || "(not found yet)"}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name/email/subject…"
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
            <div className="text-lg font-semibold">No messages found</div>
            <p className="mt-2 text-sm ap-muted">Submit a contact message and then click Refresh.</p>
          </div>
        ) : null}

        {filtered.map((x, idx) => (
          <div key={(x.id || "") + idx} className="ap-card p-5 md:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-lg font-semibold">{x.subject || "(No subject)"}</div>
                <div className="mt-1 text-sm ap-muted">
                  {x.name || "(No name)"} • {x.email || "(no email)"} {x.phone ? `• ${x.phone}` : ""}{" "}
                  {x.company ? `• ${x.company}` : ""}
                </div>
                <div className="mt-2 text-xs ap-muted">Submitted: {x.submittedAt || "(unknown)"}</div>
              </div>
            </div>

            {x.message ? (
              <div className="mt-4 ap-card-strong p-4">
                <div className="text-sm font-semibold">Message</div>
                <p className="mt-2 text-sm ap-muted whitespace-pre-wrap">{x.message}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
