"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LogoutBannerContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const flag = sp.get("logout") === "1";
    if (!flag) return;

    setShow(true);

    const t = setTimeout(() => {
      setShow(false);
      router.replace("/", { scroll: false });
    }, 2200);

    return () => clearTimeout(t);
  }, [sp, router]);

  if (!show) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4">
      <div
        className="rounded-xl px-4 py-3 text-sm"
        style={{
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          color: "rgba(255,255,255,0.92)",
        }}
      >
        ✅ Logout successful.
      </div>
    </div>
  );
}

export function LogoutBanner() {
  return (
    <Suspense fallback={null}>
      <LogoutBannerContent />
    </Suspense>
  );
}