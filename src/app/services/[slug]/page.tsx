import Link from "next/link";
import type { Metadata } from "next";
import { services } from "../services.catalog";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) {
    return {
      title: "Service | AlphaPrimeTech",
      description: "Service details.",
    };
  }

  return {
    title: svc.seo.title,
    description: svc.seo.description,
    openGraph: {
      title: svc.seo.title,
      description: svc.seo.description,
      type: "website",
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const svc = services.find((s) => s.slug === params.slug);

  if (!svc) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="ap-card p-6">
          <div className="text-lg font-semibold">Service not found</div>
          <p className="mt-2 text-sm ap-muted">That service page does not exist.</p>
          <div className="mt-5">
            <Link
              href="/services"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#0b1220",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Back to services
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      {/* Mobile-first hero */}
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-xs md:text-sm ap-muted">Services</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {svc.name}
          </h1>
          <p className="mt-3 text-sm md:text-base ap-muted">
            {svc.summary}
          </p>

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
              Request a consultation
            </Link>
            <Link
              href="/services"
              className="ap-btn-hover rounded-lg px-4 py-2.5 text-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Back to services
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Responsive layout: stack on mobile, 2-column on desktop */}
      <div className="mt-10 md:mt-12 grid gap-6 md:gap-8 md:grid-cols-12">
        {/* Main content */}
        <div className="md:col-span-8 grid gap-6">
          <Reveal>
            <section className="ap-card p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Outcomes</h2>
              <ul className="mt-3 grid gap-2 text-sm md:text-base ap-muted">
                {svc.outcomes.map((o) => (
                  <li key={o}>• {o}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="ap-card p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Deliverables</h2>
              <ul className="mt-3 grid gap-2 text-sm md:text-base ap-muted">
                {svc.deliverables.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="ap-card p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Typical timeline</h2>
              <div className="mt-4 grid gap-3">
                {svc.typicalTimeline.map((t) => (
                  <div key={t.label} className="ap-card-strong p-4">
                    <div className="text-sm md:text-base font-semibold">{t.label}</div>
                    <div className="mt-1 text-sm md:text-base ap-muted">{t.detail}</div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {/* Side panel (engagement model) - stacks under on mobile */}
        <div className="md:col-span-4">
          <Reveal>
            <aside className="ap-card p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Typical engagement model</h2>
              <p className="mt-2 text-sm ap-muted">
                Choose the model that best fits your scope clarity and delivery constraints.
              </p>

              <div className="mt-4 grid gap-4">
                {svc.engagementModels.map((m) => (
                  <div key={m.title} className="ap-card-strong p-4">
                    <div className="text-sm md:text-base font-semibold">{m.title}</div>

                    <div className="mt-3 text-xs md:text-sm font-semibold" style={{ color: "rgba(229,231,235,0.85)" }}>
                      Best for
                    </div>
                    <ul className="mt-2 grid gap-1 text-sm ap-muted">
                      {m.bestFor.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>

                    <div className="mt-3 text-xs md:text-sm font-semibold" style={{ color: "rgba(229,231,235,0.85)" }}>
                      Notes
                    </div>
                    <ul className="mt-2 grid gap-1 text-sm ap-muted">
                      {m.notes.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="ap-btn-hover inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    color: "#0b1220",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  Talk to us
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
