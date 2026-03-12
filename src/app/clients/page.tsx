import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { clients } from "./clients.data";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Clients | AlphaPrimeTech",
  description: "Selected clients and organizations supported by AlphaPrimeTech.",
  openGraph: {
    title: "Clients | AlphaPrimeTech",
    description: "Selected clients and organizations supported by AlphaPrimeTech.",
    type: "website",
  },
};

export default function ClientsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 md:py-18">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Clients</h1>
          <p className="mt-3 text-sm ap-muted">
            A selection of organizations we’ve supported through consulting and staffing engagements.
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {clients.map((c) => (
          <Reveal key={c.id}>
            <div className="ap-card p-6">
              <div
                className="relative h-36 w-full overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <Image
                  src={c.logo}
                  alt={`${c.name} logo`}
                  fill
                  className="object-contain p-1 grayscale hover:grayscale-0 transition duration-300"
                />
              </div>

              <div className="mt-4 text-sm font-semibold">{c.name}</div>

              {c.website && (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm underline underline-offset-4 hover:opacity-90"
                >
                  Visit website →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 ap-card p-6">
          <div className="text-base font-semibold">Want to be listed here?</div>
          <p className="mt-2 text-sm ap-muted max-w-2xl">
            We can support delivery, staffing, and governance for cloud, ERP, modernization, and mobility initiatives.
          </p>
          <div className="mt-5">
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
          </div>
        </div>
      </Reveal>
    </main>
  );
}