import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-[2.4rem] font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
      {children}
    </p>
  );
}
