import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,18,32,0.85) 0%, rgba(8,14,26,0.92) 100%)",
      }}
    >
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="grid gap-12 md:grid-cols-3 md:items-start">
            {/* BRAND */}
            <div className="max-w-sm">
              <div className="flex items-center gap-4">
                <div
                  className="relative h-24 w-24 overflow-hidden rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Image
                    src="/brand/alphaprimetech-logo.jpg"
                    alt="AlphaPrimeTech logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="leading-tight">
                  <div className="font-semibold text-2xl tracking-tight">
                    {site.name}
                  </div>
                  <div className="text-sm ap-muted">{site.domain}</div>
                </div>
              </div>

              <p className="mt-6 text-sm ap-muted">{site.tagline}</p>
            </div>

            {/* EXPLORE */}
            <div
              className="text-sm md:pt-4 md:pr-8 md:border-r"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="font-semibold text-base mb-5">Explore</div>

              <div
                className="grid gap-3"
                style={{ color: "rgba(229,231,235,0.78)" }}
              >
                <Link href="/services" className="hover:opacity-90">
                  Services
                </Link>
                <Link href="/staffing" className="hover:opacity-90">
                  Staffing
                </Link>
                <Link href="/careers" className="hover:opacity-90">
                  Careers
                </Link>
                <Link href="/contact" className="hover:opacity-90">
                  Contact
                </Link>
              </div>
            </div>

            {/* CONTACT */}
            <div className="text-sm md:pt-4 md:pl-8">
              <div className="font-semibold text-base mb-5">Contact</div>

              <div className="ap-muted">
                <div>Email: {site.contactEmail}</div>

                <div className="mt-4">
                  <Link href="/contact" className="hover:opacity-90">
                    Send a message →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div
            className="mt-14 pt-6 text-xs ap-muted2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              © {year} {site.name}. All rights reserved.
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:opacity-90">
                Privacy
              </Link>
              <Link href="/terms" className="hover:opacity-90">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
