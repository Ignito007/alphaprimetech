import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cloud Consulting | AlphaPrimeTech",
  description:
    "Cloud consulting services focused on architecture, migration planning, governance, and measurable outcomes.",
  openGraph: {
    title: "Cloud Consulting | AlphaPrimeTech",
    description:
      "Practical cloud strategy and execution support—from architecture decisions to migrations and governance.",
    type: "website",
  },
};

export default function CloudConsultingPage() {
  const service = {
    name: "Cloud Consulting",
    summary:
      "Practical cloud strategy and execution support—from architecture decisions to migrations and governance.",
    outcomes: [
      "Reduced infrastructure risk through clear architecture and security alignment",
      "Faster delivery through standardized patterns and landing-zone readiness",
      "Improved reliability with monitoring, backup, and operational guardrails",
    ],
    deliverables: [
      "Cloud assessment (current state → target state)",
      "Reference architecture + security baseline",
      "Migration plan and sequencing (apps, data, dependencies)",
      "Cost and performance recommendations",
      "Operational runbook + documentation handoff",
    ],
    timeline: [
      { phase: "Discovery & assessment", duration: "1–2 weeks" },
      { phase: "Architecture & planning", duration: "1–3 weeks" },
      { phase: "Implementation / migration", duration: "2–8+ weeks" },
      { phase: "Stabilization & handoff", duration: "1–2 weeks" },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 md:py-18">
      <Reveal>
        <p className="text-sm ap-muted">
          <Link href="/services" className="hover:opacity-90 underline underline-offset-4">
            Services
          </Link>{" "}
          / {service.name}
        </p>

        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {service.name}
            </h1>
            <p className="mt-3 text-sm ap-muted">{service.summary}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/contact"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Request a consultation
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <section className="ap-card p-6">
            <h2 className="text-lg font-semibold">Outcomes</h2>
            <p className="mt-2 text-sm ap-muted">
              What success looks like when this engagement is delivered well.
            </p>
            <ul className="mt-4 grid gap-2 text-sm ap-muted">
              {service.outcomes.map((o) => (
                <li key={o}>• {o}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="ap-card p-6">
            <h2 className="text-lg font-semibold">Deliverables</h2>
            <p className="mt-2 text-sm ap-muted">
              The tangible artifacts you can expect during and after delivery.
            </p>
            <ul className="mt-4 grid gap-2 text-sm ap-muted">
              {service.deliverables.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-4 ap-card p-6">
          <h2 className="text-lg font-semibold">Typical timeline</h2>
          <p className="mt-2 text-sm ap-muted">
            Timelines vary by scope and environment. This is a practical baseline for planning.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {service.timeline.map((t) => (
              <div key={t.phase} className="ap-card-strong p-4">
                <div className="text-sm font-semibold">{t.phase}</div>
                <div className="mt-1 text-sm ap-muted">{t.duration}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ✅ Engagement model panel */}
      <Reveal>
        <section className="mt-4 ap-card p-6">
          <h2 className="text-lg font-semibold">Typical engagement model</h2>
          <p className="mt-2 text-sm ap-muted">
            We’ll recommend the right model based on clarity of scope, timeline sensitivity, and delivery risk.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="ap-card-strong p-4">
              <div className="text-sm font-semibold">Fixed scope</div>
              <p className="mt-2 text-sm ap-muted">
                Best for well-defined deliverables and a stable set of requirements.
                Clear milestones, agreed acceptance criteria, and predictable cost planning.
              </p>
            </div>

            <div className="ap-card-strong p-4">
              <div className="text-sm font-semibold">Time & Materials</div>
              <p className="mt-2 text-sm ap-muted">
                Best for evolving needs, discovery-heavy initiatives, and complex environments.
                Flexible execution with transparent reporting and incremental delivery.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
