"use client";

import { type FormEvent } from "react";
import Image from "next/image";
import BrandMark from "@/components/BrandMark";
import { createDemoRequestHref } from "@/lib/demo";

export default function FooterCta() {
  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !email.trim()) return;
    window.location.assign(
      createDemoRequestHref({
        email,
        source: "homepage footer",
        search: window.location.search,
      }),
    );
  }

  return (
    <section className="flex justify-center items-center w-screen pt-[1.6rem] pb-[1.6rem] px-[1.6rem] tablet:py-[2.4rem] tablet:px-[2.4rem] desktop:py-[3.2em] desktop:px-[3.2rem]">
      <div className="relative overflow-hidden rounded-[1.6rem] w-full max-w-[2056px] h-full tablet:h-auto desktop:aspect-[1664/876] max-h-[465px] aspect-[362/463] tablet:aspect-auto tablet:max-h-[700px] desktop:max-h-[876px]">
        <Image
          alt="Vibrant flowers against an open blue sky."
          fill
          sizes="100vw"
          className="object-cover rounded-[3.2rem] tablet:rounded-[5.6rem] desktop:rounded-[6.4rem]"
          src="/images/careers.png"
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-center">
          <BrandMark
            aria-hidden="true"
            className="mb-[2.4rem] size-[6.4rem] tablet:mb-[3.2rem] tablet:size-[10rem] desktop:size-[12rem]"
          />
          <h2 className="text-heading-lg text-white mb-[1.6rem] tablet:mb-[2.4rem]">
            A calmer agency
            <br />
            starts here
          </h2>
          <form
            className="flex justify-between items-center px-[0.6rem] py-[0.6rem] backdrop-blur-[10px] bg-white/10 rounded-[1.6rem] border-solid border-[1px] border-[rgba(255,255,255,0.1)] w-[27.5rem] transition-[width] duration-300 ease-out tablet:focus-within:w-[36rem] mt-[1.6rem]"
            action="/book-a-demo"
            method="get"
            onSubmit={handleDemoSubmit}
          >
            <label htmlFor="footer-email" className="sr-only">Work email</label>
            <input
              id="footer-email"
              type="email"
              data-1p-ignore="true"
              autoComplete="email"
              required
              placeholder="Your email"
              className="flex-1 min-w-0 w-full px-[8px] text-[1.6rem] placeholder:text-[1.6rem] box-border bg-transparent border-none outline-hidden text-text-white placeholder:text-[rgba(255,255,255,0.8)] tablet:px-[16px]"
              name="email"
            />
            <button
              className="cursor-pointer group/button relative inline-flex text-body-sm isolate outline-hidden h-full shrink-0 py-[0]"
              type="submit"
            >
              <span className="flex items-center px-[1.4rem] z-10 h-[4rem] tablet:h-[4.2rem] transition-colors rounded-[1.2rem] bg-surface-primary text-text-primary group-active:bg-black-500 group-active:text-text-tertiary group-hover/button:bg-surface-tertiary group-hover/button:text-text-tertiary border-2 border-transparent group-focus-visible/button:border-blue-500 group-focus-visible/button:shadow-[0_0_0_3px_rgba(66,181,220,0.30)] group-disabled/button:bg-system-disabled-white group-disabled/button:text-text-secondary">
                Book a demo
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
