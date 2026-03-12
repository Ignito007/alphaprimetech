"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const sp = useSearchParams();

  const next = useMemo(() => sp.get("next") || "/admin", [sp]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Login failed");
      }

      router.push(next);
      router.refresh();
    } catch (ex: unknown) {
      const message = ex instanceof Error ? ex.message : "Login failed";
      setErr(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-16">
      <div className="ap-card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm ap-muted">
          Enter your admin email and password from <code>.env.local</code>.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Email</label>
            <input
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.92)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@alphaprimetech.com"
              autoComplete="username"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.92)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {err ? (
            <div
              className="rounded-lg px-3 py-2 text-sm"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {err}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#0b1220",
              border: "1px solid rgba(255,255,255,0.35)",
              opacity: busy ? 0.8 : 1,
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-xs ap-muted">
            Tip: If you change <code>.env.local</code>, restart the dev server.
          </p>
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-lg px-4 py-16">
          <div className="ap-card p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin login</h1>
            <p className="mt-2 text-sm ap-muted">Loading login form...</p>
          </div>
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}