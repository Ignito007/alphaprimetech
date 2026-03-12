"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const force = sp.get("forceLogin") === "1";
    if (!force) return;

    (async () => {
      try {
        // Clear cookies without navigating away
        await fetch("/api/admin/clear", { method: "POST" });
      } catch {
        // ignore
      } finally {
        // Always go to login page
        router.replace("/admin/login");
        router.refresh();
      }
    })();
  }, [sp, router]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin</h1>
          <p className="mt-2 text-sm ap-muted">
            View submissions and manage job postings.
          </p>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(229,231,235,0.88)",
            }}
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/admin/jobs" className="ap-card p-6 hover:opacity-95 transition">
          <div className="text-lg font-semibold">Jobs</div>
          <p className="mt-2 text-sm ap-muted">Publish / unpublish / delete job postings.</p>
        </Link>

        <Link href="/admin/messages" className="ap-card p-6 hover:opacity-95 transition">
          <div className="text-lg font-semibold">Contact messages</div>
          <p className="mt-2 text-sm ap-muted">View contact form submissions.</p>
        </Link>

        <Link href="/admin/resumes" className="ap-card p-6 hover:opacity-95 transition">
          <div className="text-lg font-semibold">Resumes</div>
          <p className="mt-2 text-sm ap-muted">View resume submissions and file links.</p>
        </Link>
      </div>

      <div className="mt-10 ap-card p-6">
        <div className="text-base font-semibold">Testing tip</div>
        <p className="mt-2 text-sm ap-muted">
          To force the login page any time: <code>/admin?forceLogin=1</code>
        </p>
      </div>
    </main>
  );
}
