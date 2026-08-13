"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Testimonial = {
  quote: string;
  name: string;
  office: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Before the day starts, I need one place to see every open shift, late visit, and incomplete note. My team should know exactly what needs attention.",
    name: "Agency owner view",
    office: "Illustrative scenario",
    desktopSrc: "/images/testimonials/kwon-desktop.jpg",
    mobileSrc: "/images/testimonials/kwon-mobile.png",
    alt: "Care professional opening a door in a bright, welcoming setting.",
  },
  {
    quote:
      "When a note needs review, I need the full visit record with it. I should be able to resolve the issue while the details are still fresh.",
    name: "Director of nursing view",
    office: "Illustrative scenario",
    desktopSrc: "/images/testimonials/haag-desktop.jpg",
    mobileSrc: "/images/testimonials/haag-mobile.png",
    alt: "A confident care leader standing in a calm, modern setting.",
  },
  {
    quote:
      "I need my schedule, tasks, and forms in one place when I arrive. The work should remain dependable even when the signal drops.",
    name: "Caregiver view",
    office: "Illustrative scenario",
    desktopSrc: "/images/testimonials/webb-desktop.jpg",
    mobileSrc: "/images/testimonials/webb-mobile.png",
    alt: "Smiling care professional in a bright workplace.",
  },
];

export default function Locations() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const mobileStoryRef = useRef<HTMLVideoElement>(null);
  const dotsPlayedRef = useRef(false);

  const [dotsSvg, setDotsSvg] = useState("");
  const [storyOpen, setStoryOpen] = useState(false);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);

  useEffect(() => {
    if (!storyOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStoryOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [storyOpen]);

  useEffect(() => {
    if (mobileStoryOpen) mobileStoryRef.current?.play().catch(() => {});
  }, [mobileStoryOpen]);

  const openStory = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileStoryOpen(true);
      return;
    }
    setStoryOpen(true);
  };

  // Fetch the highlight dot map SVG and inject it inline so its paths can be animated.
  useEffect(() => {
    let cancelled = false;
    fetch("/images/us-dot-map-highlight.svg")
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setDotsSvg(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const h2 = headingRef.current;
      const mapEl = mapRef.current;
      if (!wrapper || !h2 || !mapEl) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = cardRefs.current.filter(
          (c): c is HTMLDivElement => c !== null
        );

        // 1. PIN the whole section.
        ScrollTrigger.create({
          id: "locations",
          trigger: wrapper,
          start: "top top",
          end: () => `+=${5 * window.innerHeight}px`,
          pin: true,
          invalidateOnRefresh: true,
        });

        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            { autoAlpha: 0, scale: 0.5 },
            {
              autoAlpha: 1,
              scale: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "bottom bottom",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }

        // 2. Master scrubbed timeline.
        const master = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top center",
            end: () => `+=${6 * window.innerHeight}px`,
            scrub: true,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labels",
              duration: { min: 0.2, max: 3 },
              delay: 0.2,
              ease: "power1.inOut",
            },
          },
        });

        // Heading + map slide up into place.
        master.set(h2, { y: () => 0.2 * window.innerHeight, immediateRender: true });
        master.set(mapEl, { y: () => window.innerHeight, immediateRender: true });
        master.to(h2, { y: 0, ease: "none", duration: 2 }, 0);
        master.to(mapEl, { y: 0, ease: "none", duration: 2 }, 0);

        // When the map arrives, pop the highlight dots in once.
        master.call(
          () => {
            const dots = dotsRef.current;
            if (!dots) return;
            gsap.set(dots, { opacity: 1 });
            if (dotsPlayedRef.current) return;
            const paths = dots.querySelectorAll("path");
            if (!paths.length) return;
            dotsPlayedRef.current = true;
            gsap.fromTo(
              paths,
              { scale: 0 },
              { scale: 1, duration: 0.3, stagger: 0.002, ease: "back.out(2)" }
            );
          },
          [],
          2
        );

        // Testimonial cards: in → thumbnail zoom → out, sequentially.
        cards.forEach((card, i) => {
          const pos = 2 + 3.5 * i;
          master.addLabel(`card${i}`, pos);
          master.fromTo(
            card,
            { x: "-50%", scale: 0.5, y: () => window.innerHeight },
            {
              scale: 1,
              x: "-50%",
              ease: "none",
              duration: 2,
              y: () => {
                const r = card.getBoundingClientRect();
                return -r.height / 2;
              },
            },
            pos
          );
          const img = card.querySelector<HTMLElement>(".testimonial-thumbnail");
          if (img) {
            master.fromTo(
              img,
              { scale: 2 },
              { scale: 1, duration: 1.5, ease: "none" },
              "<25%"
            );
          }
          master.to(
            card,
            {
              ease: "none",
              x: "-50%",
              duration: 2,
              y: () => {
                const r = card.getBoundingClientRect();
                return -r.height - window.innerHeight;
              },
            },
            ">"
          );
        });
      });
    },
    { scope: wrapperRef, dependencies: [dotsSvg], revertOnUpdate: true }
  );

  return (
    <div ref={wrapperRef}>
      <section
        id="locations"
        className="flex justify-center items-center tablet:justify-normal w-screen tablet:h-svh flex-col bg-background-primary text-center pt-[12rem] tablet:pt-[8rem] relative z-[1] mb-[15rem] tablet:mb-[10rem] tablet:grid tablet:grid-rows-[auto_minmax(0,1fr)] tablet:justify-items-center"
      >
        <h2
          ref={headingRef}
          aria-label="One clear system for every person responsible for care"
          className="text-heading-lg w-[80%] mb-[4.6rem] tablet:mb-0"
        >
          One clear system
          <br />
          for every person responsible for care
        </h2>

        <span className="relative w-full flex justify-center items-center mb-[4.6rem] tablet:mb-0">
          <div
            ref={mapRef}
            className="map-interaction desktop:w-[80%] desktopLarge:w-[70%] w-full desktop:max-w-[1350px] tablet:max-w-[1023px] aspect-[1311/821] tablet:relative desktop:mt-[-4rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              width={1311}
              height={821}
              src="/images/us-dot-map.svg"
              alt=""
              aria-hidden
              className="absolute w-[calc(100%-3.2rem)] h-[calc(100%-3.2rem)] top-[1.6rem] left-[1.6rem]"
            />
            <div
              ref={dotsRef}
              aria-hidden
              className="absolute w-[calc(100%-3.2rem)] h-[calc(100%-3.2rem)] top-[1.6rem] left-[1.6rem] opacity-0 [&_svg]:w-full [&_svg]:h-full [&_path]:fill-[#2A221D] [&_path]:[transform-box:fill-box] [&_path]:origin-center"
              dangerouslySetInnerHTML={{ __html: dotsSvg }}
            />
          </div>
        </span>

        <section
          id="testimonials"
          className="relative tablet:absolute tablet:top-1/2 tablet:left-1/2 z-[2] w-full"
        >
          <div className="relative flex w-full flex-row gap-[1.2rem] overflow-x-auto px-[1.6rem] pb-[1.6rem] snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:block tablet:overflow-visible tablet:px-0 tablet:pb-0 tablet:snap-none mb-[2.5rem] tablet:gap-[1.6rem]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`card-${i + 1} shrink-0 snap-center tablet:absolute tablet:translate-y-[100vh] rounded-[1.6rem] flex flex-col tablet:flex-row gap-[1.2rem] tablet:gap-[2.4rem] w-[calc((100%_-_62px))] max-w-[36.2rem] tablet:max-w-[76.6rem] tablet:aspect-[766/505] bg-surface-primary rounded-[1.2rem] p-[1.2rem] tablet:p-[2.4rem]`}
              >
                <figure className="testimonial-frame rounded-[0.8rem] tablet:rounded-[1.6rem] tablet:w-[50%] overflow-hidden aspect-[271/217] tablet:aspect-auto relative">
                  <picture>
                    <source media="(max-width: 1023px)" srcSet={t.mobileSrc} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      decoding="async"
                      width={1032}
                      height={1361}
                      className="testimonial-thumbnail rounded-[0.8rem] tablet:rounded-[1.6rem] object-cover w-full h-full absolute inset-0"
                      src={t.desktopSrc}
                      alt={t.alt}
                    />
                  </picture>
                </figure>
                <div className="flex flex-col items-start text-left flex-1 gap-[1.2rem] tablet:justify-between tablet:gap-[1.6rem] tablet:py-[0.4rem] tablet:pr-[1.6rem]">
                  <blockquote className="text-heading-sm text-text-primary">
                    {t.quote}
                  </blockquote>
                  <div className="flex w-full items-end justify-between gap-[1.2rem]">
                    <p className="text-body-sm text-text-primary">{t.name}</p>
                    <p className="shrink-0 rounded-[0.6rem] bg-background-secondary px-[0.8rem] py-[0.5rem] text-label-sm text-text-secondary">
                      {t.office}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bottom-[1rem] relative z-20 tablet:fixed tablet:inset-0 tablet:h-svh tablet:w-full tablet:pointer-events-none">
          <button
            ref={ctaRef}
            type="button"
            onClick={openStory}
            className="group absolute bottom-[1rem] left-1/2 z-10 flex h-[4.2rem] -translate-x-1/2 items-center justify-center outline-hidden pointer-events-auto tablet:bottom-[2.4rem]"
          >
            <span className="kwon-cta-thumbnail relative block h-full w-[6.5rem] translate-x-[1px] overflow-hidden rounded-[1.2rem] transition-[width] group-hover:w-[8.5rem] group-focus-visible:border-2 group-focus-visible:border-blue-500">
              <video
                ref={mobileStoryRef}
                className="h-full w-full object-cover"
                src={mobileStoryOpen ? "/videos/interview-mobile.mp4" : "/videos/interview-cta.mp4"}
                muted={!mobileStoryOpen}
                preload="metadata"
                autoPlay
                loop={!mobileStoryOpen}
                playsInline
              />
            </span>
            <span className="kwon-cta-button flex h-full items-center justify-center text-nowrap rounded-[1.2rem] bg-surface-tertiary px-[1.6rem] text-[1.4rem] text-text-white transition-colors">
              Watch the Selmou story
            </span>
          </button>
        </div>

      </section>
      {storyOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Selmou story"
            className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center bg-black/70 p-[1.6rem]"
          >
            <div className="relative w-full rounded-[1.6rem] tablet:p-[3.2rem] desktop:w-[80%]">
              <video
                src="/videos/interview.mp4"
                className="max-h-[90dvh] w-full rounded-[1.6rem] bg-black object-contain"
                controls
                autoPlay
                playsInline
              >
                <track
                  kind="captions"
                  src="/subtitles.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
              <button
                type="button"
                aria-label="Close story"
                onClick={() => setStoryOpen(false)}
                className="absolute right-[1.2rem] top-[1.2rem] grid size-[5.2rem] place-items-center rounded-[1.6rem] bg-white text-black tablet:right-[-2rem] tablet:top-[-2rem]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
