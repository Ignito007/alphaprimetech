import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { LogoutBanner } from "@/components/LogoutBanner";

export default function HomePage() {
  return (
    <main>
      <LogoutBanner />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          
          {/* LEFT COLUMN */}
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs md:text-sm ap-muted">
                {site.locationLine}
              </p>

              <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Technology delivery that stays clear, accountable, and outcome-driven.
              </h1>

              <p className="mt-5 text-sm md:text-base ap-muted leading-relaxed">
                AlphaPrimeTech is a New York–based IT consulting and staffing firm
                delivering structured, outcome-driven technology solutions across cloud,
                ERP, digital transformation, and enterprise mobility.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
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

                <Link
                  href="/services"
                  className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(229,231,235,0.88)",
                  }}
                >
                  Explore services
                </Link>

                <Link
                  href="/staffing"
                  className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(229,231,235,0.88)",
                  }}
                >
                  Staffing & consulting
                </Link>
              </div>

              {/* LOWER LEFT CARD */}
              <div className="mt-10 ap-card p-5 md:p-6">
                <div className="text-lg font-semibold">
                  What we deliver
                </div>

                <p className="mt-3 text-sm ap-muted leading-relaxed">
                  We help organizations execute technology initiatives with fewer
                  surprises—through clear requirements, practical architecture,
                  disciplined delivery, and staffing support when timelines are tight.
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="ap-card-strong p-4">
                    <div className="text-sm font-semibold">Consulting</div>
                    <p className="mt-2 text-sm ap-muted">
                      Cloud strategy & modernization, ERP advisory, enterprise mobility,
                      and transformation roadmaps aligned to business outcomes.
                    </p>
                  </div>

                  <div className="ap-card-strong p-4">
                    <div className="text-sm font-semibold">Staffing</div>
                    <p className="mt-2 text-sm ap-muted">
                      Staff augmentation and delivery teams across cloud, ERP, data,
                      engineering, QA, and program delivery roles.
                    </p>
                  </div>

                  <div className="ap-card-strong p-4">
                    <div className="text-sm font-semibold">Delivery governance</div>
                    <p className="mt-2 text-sm ap-muted">
                      Milestones, reporting cadence, documentation standards, and
                      stakeholder-friendly communication to keep execution transparent.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Fast response",
                    "Clear scope",
                    "On-time execution focus",
                    "Security-minded",
                    "Documentation & handoff",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(229,231,235,0.88)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT COLUMN */}
          <Reveal>
            <div className="grid gap-6">
              <div className="ap-card p-4 md:p-5">
                <div className="relative overflow-hidden rounded-2xl">
                  <video
                    className="w-full h-auto rounded-2xl"
                    src="/brand/alphaprimetech-hero.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                    controls
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs ap-muted">
                  <span>Use controls to enable sound</span>
                </div>
              </div>

              <div className="ap-card p-6">
                <div className="text-lg font-semibold">Trusted by</div>

                <p className="mt-3 text-sm ap-muted leading-relaxed">
                  Teams that need delivery to stay structured, measurable, and
                  stakeholder-friendly. (We can add real client logos once you provide them.)
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Financial Services",
                    "Healthcare",
                    "Public Sector",
                    "Enterprise IT",
                    "Manufacturing",
                    "Education",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(229,231,235,0.88)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
