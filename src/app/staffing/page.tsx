import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Staffing | AlphaPrimeTech",
  description: "Staff augmentation and consulting delivery support for cloud, ERP, data, QA, and program delivery roles.",
  openGraph: {
    title: "Staffing | AlphaPrimeTech",
    description: "Staff augmentation and consulting delivery support for cloud, ERP, data, QA, and program delivery roles.",
    type: "website",
  },
};

export default function StaffingPage() {
  const roles = [
    "Cloud Architects & Engineers",
    "ERP Consultants & PMs",
    "Data Engineers & Analysts",
    "Full-Stack Engineers",
    "QA Automation",
    "Scrum Masters / Delivery Leads",
    "Business Analysts",
    "Security Engineers",
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 md:py-18">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Staffing</h1>
          <p className="mt-3 text-sm ap-muted">
            Staff augmentation and delivery teams to support your timelines—without sacrificing governance, communication, and documentation.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">Staff augmentation</div>
            <p className="mt-3 text-sm ap-muted">
              Add specialized talent quickly across consulting and engineering roles. We prioritize fit, clarity of scope, and delivery readiness.
            </p>
            <ul className="mt-4 grid gap-2 text-sm ap-muted">
              <li>• Short-term and long-term engagements</li>
              <li>• Clear role expectations and deliverables</li>
              <li>• Transparent onboarding and reporting cadence</li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="ap-card p-6">
            <div className="text-lg font-semibold">Outcome-based delivery teams</div>
            <p className="mt-3 text-sm ap-muted">
              Bring a delivery pod with defined milestones and accountable execution—ideal when you need to accelerate progress.
            </p>
            <ul className="mt-4 grid gap-2 text-sm ap-muted">
              <li>• Milestones and governance included</li>
              <li>• Documentation and handoff standards</li>
              <li>• Stakeholder-friendly communication</li>
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-4 ap-card p-6">
          <div className="text-lg font-semibold">Roles we commonly support</div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {roles.map((r) => (
              <span
                key={r}
                className="rounded-full px-3 py-1"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(229,231,235,0.78)",
                }}
              >
                {r}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Request staffing support
            </Link>

            <Link
              href="/careers"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              View open roles
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
