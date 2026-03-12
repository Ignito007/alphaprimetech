import Link from "next/link";
import type { ReactNode } from "react";

function AdminNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside
          className="ap-card p-4 md:p-5 h-fit"
          style={{ position: "sticky", top: 16 }}
        >
          <div className="text-lg font-bold">Admin</div>
          <div className="mt-1 text-xs ap-muted">Navigation</div>

          <div className="mt-4 grid gap-2">
            <AdminNavLink href="/admin/jobs" label="Jobs" />
            <AdminNavLink href="/admin/resumes" label="Resumes" />
            <AdminNavLink href="/admin/messages" label="Messages" />
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
            <Link
              href="/admin"
              className="block rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Back to Dashboard →
            </Link>

            <Link
              href="/"
              className="mt-2 block rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Back to Site →
            </Link>
          </div>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}
