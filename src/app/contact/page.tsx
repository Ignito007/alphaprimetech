"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Something went wrong. Please try again.");
      return;
    }

    form.reset();
    alert("Message sent successfully.");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 md:py-18">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact</h1>
          <p className="mt-3 text-sm ap-muted">
            Tell us what you’re trying to accomplish. We’ll respond with next steps and a practical approach.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">Send a message</div>
            <p className="mt-2 text-sm ap-muted">
              For local partner review, messages are saved under <code>src/data/submissions/contact.jsonl</code>.
            </p>

            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <input
                name="name"
                required
                placeholder="Full name *"
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.92)",
                  outline: "none",
                }}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email *"
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.92)",
                  outline: "none",
                }}
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.92)",
                  outline: "none",
                }}
              />
              <input
                name="company"
                placeholder="Company (optional)"
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.92)",
                  outline: "none",
                }}
              />
              <textarea
                name="message"
                required
                placeholder="How can we help? *"
                rows={5}
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.92)",
                  outline: "none",
                }}
              />

              <button
                type="submit"
                className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#0b1220",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                Send message
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">Quick links</div>
            <div className="mt-4 grid gap-3 text-sm ap-muted">
              <Link href="/services" className="underline underline-offset-4 hover:opacity-90">
                Services →
              </Link>
              <Link href="/staffing" className="underline underline-offset-4 hover:opacity-90">
                Staffing →
              </Link>
              <Link href="/careers" className="underline underline-offset-4 hover:opacity-90">
                Careers →
              </Link>
              <Link href="/clients" className="underline underline-offset-4 hover:opacity-90">
                Clients →
              </Link>
              <Link href="/about" className="underline underline-offset-4 hover:opacity-90">
                About →
              </Link>
            </div>

            <div className="mt-8 ap-card-strong p-4">
              <div className="text-sm font-semibold">Response time</div>
              <div className="mt-2 text-sm ap-muted">
                We typically respond within 1–2 business days.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
