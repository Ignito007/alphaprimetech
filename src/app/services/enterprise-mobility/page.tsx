import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Enterprise Mobility | AlphaPrimeTech",
  description:
    "Enterprise mobility services focused on secure enablement, governance, and workforce productivity outcomes.",
  openGraph: {
    title: "Enterprise Mobility | AlphaPrimeTech",
    description:
      "Secure mobile enablement—strategy, modernization, governance, and device/app management alignment.",
    type: "website",
  },
};

export default function EnterpriseMobilityPage() {
  const service = {
    name: "Enterprise Mobility",
    summary:
      "Secure mobile enablement—strategy, modernization, governance, and device/app management alignment.",
    outcomes: [
      "Improved workforce productivity with secure, reliable mobile access",
      "Reduced operational risk through MDM alignment and security controls",
      "Higher adoption through UX improvements and support readiness",
    ],
    deliverables: [
      "Mobility strategy + governance model",
      "App assessment and modernization recommendations",
      "Security baseline (auth, encryption, device controls)",
      "Implementation plan (MDM, policies, rollout)",
      "Support playbooks + documentation handoff",
    ],
    timeline: [
      { phase: "Assessment & strategy", duration: "1–3 weeks" },
      { phase: "Design & planning", duration: "2–4 weeks" },
      { phase: "Implementation / rollout", duration: "3–10+ weeks" },
      { phase: "Stabilization & support handoff", duration: "1–2 weeks" },
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
                Best for defined assessments, governance setup, and mobility strategy deliverables with clear acceptance criteria.
              </p>
            </div>

            <div className="ap-card-strong p-4">
              <div className="text-sm font-semibold">Time & Materials</div>
              <p className="mt-2 text-sm ap-muted">
                Best for rollout programs, modernization, and phased adoption where requirements evolve.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
