import React from "react";

export function Section({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
