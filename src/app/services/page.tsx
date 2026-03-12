import Link from "next/link";
import type { Metadata } from "next";
import { services } from "./services.catalog";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services | AlphaPrimeTech",
  description: "IT consulting services with clear outcomes, deliverables, and disciplined delivery.",
  openGraph: {
    title: "Services | AlphaPrimeTech",
    description: "IT consulting services with clear outcomes, deliverables, and disciplined delivery.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Services
          </h1>
          <p className="mt-3 text-sm md:text-base ap-muted">
            Structured service offerings designed for clear outcomes, practical execution, and stakeholder-friendly communication.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 md:mt-10 grid gap-4 md:gap-6 md:grid-cols-2">
        {services.map((s) => (
          <Reveal key={s.slug}>
            <div className="ap-card p-5 md:p-6">
              <div className="text-lg md:text-xl font-semibold">{s.name}</div>
              <div className="mt-2 text-sm ap-muted">{s.tagline}</div>
              <p className="mt-4 text-sm ap-muted">{s.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {s.outcomes.slice(0, 3).map((o) => (
                  <span
                    key={o}
                    className="rounded-full px-3 py-1"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(229,231,235,0.78)",
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/services/${s.slug}`}
                  className="ap-btn-hover inline-flex items-center rounded-lg px-4 py-2.5 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    color: "#0b1220",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  View details →
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
