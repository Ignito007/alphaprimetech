"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/staffing", label: "Staffing" },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(5,10,20,0.55)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="relative h-28 w-28 rounded-2xl p-1 overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src="/brand/alphaprimetech-logo.jpg"
              alt="AlphaPrimeTech logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="font-semibold text-2xl tracking-tight">
              AlphaPrimeTech
            </div>
            <div className="text-sm ap-muted" style={{ color: "rgba(229,231,235,0.70)" }}>
              IT Consulting • Staffing • NY
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.00)",
                border: "1px solid rgba(255,255,255,0.00)",
                color: "rgba(229,231,235,0.80)",
              }}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="ap-btn-hover ml-2 rounded-lg px-4 py-2.5 text-sm"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#0b1220",
              border: "1px solid rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Request a consultation
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/contact"
            className="ap-btn-hover rounded-lg px-3 py-2 text-sm"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#0b1220",
              border: "1px solid rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}
            onClick={() => setOpen(false)}
          >
            Consult
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg px-3 py-2 text-sm hover:opacity-90"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(229,231,235,0.85)",
            }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div
          className="md:hidden px-4 pb-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(5,10,20,0.70)",
          }}
        >
          <div className="mt-3 grid gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(229,231,235,0.85)",
                }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
