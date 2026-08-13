import { cn } from "@/lib/utils";

const workflowLabels = [
  "Scheduling",
  "EVV",
  "Documentation",
  "Credentials",
  "Review",
  "Evidence",
] as const;

export default function DemoLogoMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[49rem] overflow-hidden",
        className,
      )}
      aria-label="Connected home care workflows"
    >
      <div className="demo-logo-track flex h-[5.2rem] w-max items-center gap-[3.2rem]">
        {[...workflowLabels, ...workflowLabels].map((label, index) => (
          <span
            key={`${label}-${index}`}
            aria-hidden={index >= workflowLabels.length ? true : undefined}
            className="flex h-[4.4rem] w-[14rem] shrink-0 items-center justify-center rounded-full border border-stroke-stone bg-white px-[2rem] font-mono text-[1rem] uppercase tracking-[0.1em] text-text-secondary"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-background-primary)_0%,transparent_20%,transparent_80%,var(--color-background-primary)_100%)]" />
    </div>
  );
}
