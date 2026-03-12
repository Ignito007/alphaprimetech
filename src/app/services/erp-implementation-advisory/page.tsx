import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "ERP Implementation & Advisory | AlphaPrimeTech",
  description:
    "ERP implementation and advisory services with governance, delivery planning, and stabilization support.",
  openGraph: {
    title: "ERP Implementation & Advisory | AlphaPrimeTech",
    description:
      "ERP planning and delivery guidance—selection support, implementation oversight, and stabilization.",
    type: "website",
  },
};

export default function ERPImplementationAdvisoryPage() {
  const service = {
    name: "ERP Implementation & Advisory",
    summary:
      "ERP planning and delivery guidance—selection support, implementation oversight, and stabilization.",
    outcomes: [
      "Improved delivery governance (scope, milestones, stakeholder visibility)",
      "Reduced risk through phased implementation planning and controls",
      "Cleaner handoff with documentation, training, and post-go-live support",
    ],
    deliverables: [
      "ERP readiness assessment and roadmap",
      "Vendor/platform selection support (if needed)",
      "Implementation governance + milestone plan",
      "Data migration approach and validation checks",
      "Go-live checklist + stabilization plan",
    ],
    timeline: [
      { phase: "Assessment & readiness", duration: "2–4 weeks" },
      { phase: "Planning & design", duration: "3–6 weeks" },
      { phase: "Build / config / integration", duration: "6–16+ weeks" },
      { phase: "Go-live & stabilization", duration: "2–6 weeks" },
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
                Best for defined milestones (assessment, roadmap, governance setup) with clear acceptance criteria.
              </p>
            </div>

            <div className="ap-card-strong p-4">
              <div className="text-sm font-semibold">Time & Materials</div>
              <p className="mt-2 text-sm ap-muted">
                Best for implementation oversight and stabilization where scope evolves across phases and stakeholders.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
