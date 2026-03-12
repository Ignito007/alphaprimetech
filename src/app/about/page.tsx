import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About | AlphaPrimeTech",
  description: "About AlphaPrimeTech — IT consulting and staffing with disciplined delivery and clear outcomes.",
  openGraph: {
    title: "About | AlphaPrimeTech",
    description: "IT consulting and staffing with disciplined delivery and clear outcomes.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 md:py-18">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About</h1>
          <p className="mt-3 text-sm ap-muted">
            AlphaPrimeTech is a New York–based IT consulting and staffing firm focused on clarity, delivery discipline, and measurable outcomes.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">What we do</div>
            <p className="mt-3 text-sm ap-muted">
              We support cloud, ERP, digital transformation, and enterprise mobility initiatives—helping teams move faster with better governance,
              stronger documentation, and stakeholder-friendly communication.
            </p>
            <ul className="mt-4 grid gap-2 text-sm ap-muted">
              <li>• Consulting-led delivery: strategy → plan → execution support</li>
              <li>• Staffing: specialized talent across engineering, QA, cloud, ERP, data, and program delivery</li>
              <li>• Governance: milestones, reporting cadence, risk controls, and documentation standards</li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">How we work</div>
            <p className="mt-3 text-sm ap-muted">
              Our approach prioritizes scope clarity, accountability, and transparent execution—so stakeholders understand what’s happening and why.
            </p>
            <div className="mt-4 grid gap-3">
              {[
                { t: "Discovery", d: "Clarify goals, constraints, and requirements." },
                { t: "Plan", d: "Define milestones, governance, and delivery approach." },
                { t: "Execute", d: "Support implementation with clear communication and controls." },
                { t: "Handoff", d: "Deliver documentation, runbooks, and transition support." },
              ].map((x) => (
                <div key={x.t} className="ap-card-strong p-4">
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-sm ap-muted">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-12 ap-card p-6">
          <div className="text-base font-semibold">Ready to talk?</div>
          <p className="mt-2 text-sm ap-muted max-w-2xl">
            Tell us what you’re trying to accomplish. We’ll respond with next steps and a practical engagement approach.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Contact us
            </Link>
            <Link
              href="/services"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              View services
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="sr-only">{site.tagline}</div>
    </main>
  );
}
