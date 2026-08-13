"use client";

import { useEffect, useId, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DemoForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const isValid = EMAIL_PATTERN.test(email);
  const requestUrl = process.env.NEXT_PUBLIC_DEMO_REQUEST_URL;

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("email");
    if (value && EMAIL_PATTERN.test(value)) setEmail(value);
  }, []);

  return (
    <form
      className="group/form flex w-full max-w-[32rem] flex-col gap-[0.8rem]"
      action={requestUrl || undefined}
      method="post"
      onSubmit={requestUrl ? undefined : (event) => event.preventDefault()}
    >
      <div className="relative flex h-[5.6rem] flex-row items-center justify-center gap-[1.6rem] overflow-hidden rounded-[1.6rem] border-2 border-transparent bg-surface-primary py-[0.6rem] pr-[0.6rem] has-[:focus-visible]:border-blue-500 has-[:focus-visible]:shadow-[0_0_0_3px_rgba(66,181,220,0.30)] sm:justify-start">
        <input
          id={inputId}
          type="email"
          title="Please enter a valid email address"
          placeholder="Your email"
          autoComplete="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-full w-full flex-1 border-none bg-transparent pl-[1.6rem] font-body text-[16px] leading-[130%] text-text-primary outline-hidden placeholder:text-text-secondary group-hover/form:placeholder:text-text-primary tablet:text-[1.6rem] desktop:text-[1.7rem]"
        />
        <label htmlFor={inputId} className="sr-only">
          Email
        </label>
        <div className="flex shrink-0 items-center justify-center">
          <button
            className="hidden h-[4.2rem] items-center rounded-[1.2rem] border-2 border-transparent bg-surface-tertiary px-[1.4rem] text-body-sm text-white transition-colors enabled:hover:bg-surface-quaternary enabled:hover:text-text-primary disabled:bg-[#e5e5e5] disabled:text-text-secondary sm:flex"
            type="submit"
            disabled={!isValid || !requestUrl}
          >
            Book a demo
          </button>
        </div>
      </div>
      <button
        className="flex h-[4.2rem] items-center justify-center rounded-[1.2rem] border-2 border-transparent bg-surface-tertiary px-[1.4rem] text-body-sm text-white transition-colors enabled:hover:bg-surface-quaternary enabled:hover:text-text-primary disabled:bg-[#e5e5e5] disabled:text-text-secondary sm:hidden"
        type="submit"
        disabled={!isValid || !requestUrl}
      >
        Book a demo
      </button>
      {!requestUrl ? (
        <p className="text-center text-body-sm text-text-secondary" role="status">
          Online demo request delivery is being configured. Please check back soon.
        </p>
      ) : null}
    </form>
  );
}
