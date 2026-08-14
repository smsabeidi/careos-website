"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createDemoRequestHref } from "@/lib/demo";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !email.trim()) return;
    window.location.assign(
      createDemoRequestHref({
        email,
        source: "homepage hero",
        search: window.location.search,
      }),
    );
  }

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const context = gsap.context(() => {
      const video = hero.querySelector("video");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const playVideo = () => {
        if (reducedMotion || !video) return;
        if (!video.getAttribute("src") && video.dataset.source) {
          video.src = video.dataset.source;
        }
        video?.play().catch(() => undefined);
      };
      const pauseVideo = () => video?.pause();

      const heroVisibility = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        invalidateOnRefresh: true,
        onEnter: playVideo,
        onEnterBack: playVideo,
        onLeave: pauseVideo,
      });

      const collapseTrigger = ScrollTrigger.create({
        start: 100,
        invalidateOnRefresh: true,
        onEnter: () => setIsCollapsed(true),
        onEnterBack: () => setIsCollapsed(true),
        onLeaveBack: () => setIsCollapsed(false),
        onLeave: () => setIsCollapsed(false),
      });

      const scrollPosition = collapseTrigger.scroll();
      setIsCollapsed(
        scrollPosition >= collapseTrigger.start &&
          scrollPosition < collapseTrigger.end
      );
      const heroScrollPosition = heroVisibility.scroll();
      if (
        heroScrollPosition >= heroVisibility.start &&
        heroScrollPosition < heroVisibility.end
      ) {
        playVideo();
      } else {
        pauseVideo();
      }
    }, hero);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const container = tickerRef.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-task-item]")
    );
    if (items.length === 0) return;

    gsap.set(items, { yPercent: 100, autoAlpha: 0 });

    let current = 0;
    gsap.fromTo(
      items[0],
      { yPercent: 100 },
      { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }
    );

    const interval = setInterval(() => {
      const next = (current + 1) % items.length;
      gsap.fromTo(
        items[next],
        { yPercent: 100 },
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }
      );
      gsap.fromTo(
        items[current],
        { yPercent: 0 },
        { yPercent: -100, duration: 1, ease: "expo.out" }
      );
      current = next;
    }, 2500);

    return () => {
      clearInterval(interval);
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Hero section"
      className="relative flex justify-center items-center w-screen h-svh"
    >
      <div
        className={`flex justify-center items-center w-full h-full bg-surface-primary transition-[clip-path] duration-1000 ease-out-quint absolute object-cover desktop:w-full desktop:h-full ${
          isCollapsed ? "clip-inset-collapsed" : "clip-inset-full"
        }`}
      >
        <Image
          alt=""
          fill
          preload
          sizes="100vw"
          aria-hidden="true"
          className="[contain:layout_paint] [will-change:clip-path] overflow-hidden object-cover -z-10"
          src="/images/hero-cover.jpg"
        />
        <video
          data-source="/videos/hero.mp4"
          poster="/images/hero-cover.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className="[contain:layout_paint] [will-change:clip-path] inline-block overflow-hidden transform-gpu w-full h-full object-cover relative z-[1]"
        />
      </div>
      <div className="relative flex flex-col justify-center items-center">
        <h1 className="text-heading-xl text-center text-text-white mb-[4rem]">
          Your team gives care.
          <br />
          <span className="italic">Selmou keeps the work clear.</span>
        </h1>
        <p className="text-body-md text-center text-text-white mb-[0.8rem]">
          The operating system for home care
        </p>
        <div
          ref={tickerRef}
          className="relative h-[3rem] w-full overflow-hidden"
          aria-hidden="true"
        >
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Visit schedule icon</title>
                  <g opacity="0.7">
                    <path
                      d="M3.75 9.75H20.25M7.75 4.75V2.75M16.25 4.75V2.75M6.75 20.25H17.25C18.9069 20.25 20.25 18.9069 20.25 17.25V7.75C20.25 6.09315 18.9069 4.75 17.25 4.75H6.75C5.09315 4.75 3.75 6.09315 3.75 7.75V17.25C3.75 18.9069 5.09315 20.25 6.75 20.25Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              Preserves record history
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Message sent icon</title>
                  <path
                    d="M7.5006 9.79167L1.63879 4.58117C1.06608 4.0721 1.42617 3.125 2.19243 3.125H17.7327C18.3723 3.125 18.7734 3.81561 18.4566 4.37115L10.8347 17.7365C10.4593 18.3949 9.47119 18.2509 9.29925 17.5128L7.5006 9.79167ZM7.5006 9.79167L18.8222 3.33333"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Cites source-backed answers
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Terminal icon</title>
                  <path
                    d="M4.25 4.75L6 6.5L4.25 8.25M7.75 8.25H9.75M3.75 17.25H14.25C15.9069 17.25 17.25 15.9069 17.25 14.25V3.75C17.25 2.09315 15.9069 0.75 14.25 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V14.25C0.75 15.9069 2.09315 17.25 3.75 17.25Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Prepares drafts for review
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Visit verification icon</title>
                  <g opacity="0.7">
                    <path
                      d="M3.75 9.75H20.25M7.75 4.75V2.75M16.25 4.75V2.75M6.75 20.25H17.25C18.9069 20.25 20.25 18.9069 20.25 17.25V7.75C20.25 6.09315 18.9069 4.75 17.25 4.75H6.75C5.09315 4.75 3.75 6.09315 3.75 7.75V17.25C3.75 18.9069 5.09315 20.25 6.75 20.25Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              Keeps signatures connected
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Schedule update icon</title>
                  <path
                    d="M4.79688 2.79688H3.79688C2.14002 2.79688 0.796875 4.14002 0.796875 5.79688V7.29688M4.79688 2.79688H13.2969M4.79688 2.79688V0.796875M13.2969 2.79688H14.2969C15.9537 2.79688 17.2969 4.14002 17.2969 5.79688C17.2969 6.29688 17.2969 6.79688 17.2969 7.29688H0.796875M13.2969 2.79688V0.796875M7.29688 18.2969H3.79687C2.14002 18.2969 0.796875 16.9537 0.796875 15.2969V7.29688M17.3866 18.2344C16.6264 18.8956 15.6247 19.2969 14.5469 19.2969C12.5665 19.2969 10.9026 17.9424 10.4308 16.1094M11.4663 12.0857C12.249 11.2908 13.351 10.7969 14.5469 10.7969C16.5272 10.7969 18.1912 12.1513 18.663 13.9844"
                    stroke="white"
                    strokeWidth="1.59375"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Surfaces care deadlines
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Exception alert icon</title>
                  <path
                    d="M12.5612 0.75H17.0612V5.25M11.5612 6.25L16.563 1.24825M6.37488 2.66647L6.72821 3.86777C6.93281 4.56343 6.73294 5.31514 6.20985 5.81732C5.596 6.40661 5.42495 7.33547 5.88703 8.05C6.88905 9.59947 8.21175 10.9222 9.76122 11.9242C10.4757 12.3863 11.4046 12.2152 11.9939 11.6014C12.4961 11.0783 13.2478 10.8784 13.9434 11.083L14.9077 11.3666C16.1845 11.7421 17.0612 12.9162 17.0612 14.247C17.0612 15.9038 15.7085 17.2793 14.0749 17.0024C12.1816 16.6816 10.3553 16.0444 8.66822 15.0656C6.21523 13.6424 4.16878 11.596 2.7456 9.14299C1.76846 7.45878 1.10767 5.60578 0.786544 3.69262C0.515201 2.07602 1.87898 0.75 3.51819 0.75H3.81357C4.99792 0.75 6.0407 1.53025 6.37488 2.66647Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Protects human authority
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Completed icon</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.1965 0.14738C6.52934 0.393931 6.5993 0.863624 6.35274 1.19647L3.01941 5.69647C2.78046 6.01905 2.32987 6.09628 1.99714 5.87168L0.330471 4.74668C-0.0128492 4.51494 -0.103302 4.04876 0.128439 3.70544C0.36018 3.36212 0.82636 3.27167 1.16968 3.50341L2.24136 4.22679L5.14741 0.303627C5.39396 -0.0292173 5.86365 -0.0991716 6.1965 0.14738ZM8.00008 3.25005C8.00008 2.83583 8.33586 2.50005 8.75008 2.50005H17.2501C17.6643 2.50005 18.0001 2.83583 18.0001 3.25005C18.0001 3.66426 17.6643 4.00005 17.2501 4.00005H8.75008C8.33586 4.00005 8.00008 3.66426 8.00008 3.25005ZM6.1965 9.14738C6.52934 9.39393 6.5993 9.86362 6.35274 10.1965L3.01941 14.6965C2.78046 15.0191 2.32987 15.0963 1.99714 14.8717L0.330471 13.7467C-0.0128492 13.5149 -0.103302 13.0488 0.128439 12.7054C0.36018 12.3621 0.82636 12.2717 1.16968 12.5034L2.24136 13.2268L5.14741 9.30363C5.39396 8.97078 5.86365 8.90083 6.1965 9.14738ZM8.00008 11.75C8.00008 11.3358 8.33586 11 8.75008 11H17.2501C17.6643 11 18.0001 11.3358 18.0001 11.75C18.0001 12.1643 17.6643 12.5 17.2501 12.5H8.75008C8.33586 12.5 8.00008 12.1643 8.00008 11.75Z"
                    fill="white"
                  />
                </svg>
              </span>
              Records every approval
            </p>
          </div>
          <div
            data-task-item="true"
            className="h-[3rem] absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
          >
            <p className="text-body-md text-text-white opacity-[0.7] flex items-center justify-center gap-2">
              <span className="mr-[0.3rem] display-inline">
                <svg
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Daily brief icon</title>
                  <path
                    d="M5.25 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V15.25C0.75 16.9069 2.09315 18.25 3.75 18.25H5.25M5.25 0.75H13.25C14.9069 0.75 16.25 2.09315 16.25 3.75V15.25C16.25 16.9069 14.9069 18.25 13.25 18.25H5.25M5.25 0.75V18.25M9.25 5.25H12.25M9.25 9.25H12.25"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Protects the audit trail
            </p>
          </div>
        </div>
        <p className="sr-only">
          Selmou is designed to preserve record history, cite source-backed
          answers, prepare drafts for review, keep signatures connected, surface
          deadlines, protect human authority, and record approvals.
        </p>
      </div>
      <div
        className={`absolute bottom-[1.6rem] transition-transform duration-500 ease-out ${
          isCollapsed ? "-translate-y-[50px]" : "translate-y-0"
        }`}
      >
        <form
          action="/book-a-demo"
          method="get"
          onSubmit={handleDemoSubmit}
          className="flex justify-between items-center px-[0.6rem] py-[0.6rem] bg-blur border-solid border-[1px] border-[rgba(255,255,255,0.1)] w-[27.5rem] transition-[width] duration-300 ease-out tablet:focus-within:w-[36rem]"
        >
          <label htmlFor="hero-email" className="sr-only">Work email</label>
          <input
            id="hero-email"
            type="email"
            data-1p-ignore="true"
            autoComplete="email"
            required
            placeholder="Your email"
            className="flex-1 min-w-0 w-full px-[8px] text-[1.6rem] placeholder:text-[1.6rem] box-border bg-transparent border-none outline-hidden text-text-white placeholder:text-[rgba(255,255,255,0.8)] tablet:px-[16px] autofill-transparent"
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
    </section>
  );
}
