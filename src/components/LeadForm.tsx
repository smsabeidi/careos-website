"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { createDemoRequestHref } from "@/lib/demo";

type LeadFormProps = {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
};

export default function LeadForm({
  className,
  compact = false,
  inverted = false,
}: LeadFormProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    window.location.assign(
      createDemoRequestHref({
        email,
        source: window.location.pathname,
        search: window.location.search,
      }),
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center rounded-[1.6rem] border p-[0.6rem] transition-[width,box-shadow] duration-300 focus-within:shadow-[0_0_0_3px_rgba(66,181,220,0.24)]",
        compact ? "w-full max-w-[38rem]" : "w-full max-w-[48rem]",
        inverted
          ? "border-white/20 bg-white/10 backdrop-blur-xl"
          : "border-stroke-stone bg-white",
        className,
      )}
    >
      <label className="sr-only" htmlFor="lead-email">
        Work email
      </label>
      <input
        id="lead-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email"
        className={cn(
          "min-w-0 flex-1 bg-transparent px-[1.2rem] text-[1.6rem] outline-none",
          inverted
            ? "text-white placeholder:text-white/70"
            : "text-text-primary placeholder:text-text-secondary",
        )}
      />
      <button
        type="submit"
        className={cn(
          "h-[4.4rem] shrink-0 rounded-[1.2rem] px-[1.6rem] text-body-sm transition-transform hover:scale-[1.02] active:scale-[0.98]",
          inverted
            ? "bg-white text-text-primary"
            : "bg-surface-tertiary text-white",
        )}
      >
        Book a demo
      </button>
    </form>
  );
}
