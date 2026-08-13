"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Panel = {
  key: "answers" | "loop" | "paperwork";
  title: string;
  body: string;
  textAlign: "left" | "right";
  front: boolean;
  video: string;
  poster: string;
};

// The last panel in the DOM is visually in front.
const PANELS: Panel[] = [
  {
    key: "answers",
    title: "Answers with evidence",
    body: "Ask about a deadline, policy, or client. Selmou cites the source or tells you what it cannot verify.",
    textAlign: "left",
    front: false,
    video: "/videos/lassie-pg-3.mp4",
    poster: "/images/lassie-pg-3.jpg",
  },
  {
    key: "loop",
    title: "Keeps people in control",
    body: "Selmou prepares the work, shows what changed, and asks the right person to approve what matters.",
    textAlign: "right",
    front: false,
    video: "/videos/lassie-pg-2.mp4",
    poster: "/images/lassie-pg-2.jpg",
  },
  {
    key: "paperwork",
    title: "Preserves the complete record",
    body: "Versions, forms, signatures, corrections, and approvals stay connected without the evening reconstruction.",
    textAlign: "left",
    front: true,
    video: "/videos/lassie-pg-1.mp4",
    poster: "/images/lassie-pg-1.jpg",
  },
];

const ARTICLE_CLASS_LEFT =
  "description absolute top-[-2.5rem] translate-y-[-100%] max-w-[90%] desktop:max-w-[25.7rem] tablet:max-w-[50rem] tablet:top-[-2rem] desktop:top-[calc(50%+4.5rem)] desktop:translate-x-[calc(-100%-2.8rem)]";

const ARTICLE_CLASS_RIGHT =
  "description absolute top-[-2.4rem] translate-y-[-100%] max-w-[90%] tablet:max-w-[50rem] w-auto tablet:top-[-2rem] desktop:top-[calc(50%+4.5rem)] desktop:translate-x-[calc(100%+3rem)] desktopLarge:translate-x-[calc(100%+3.1rem)] desktop:right-0 desktop:max-w-[25.7rem]";

export default function FeaturesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const videos = Array.from(section.querySelectorAll("video"));
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((video) => {
          if (entry.isIntersecting && !reducedMotion) {
            if (!video.getAttribute("src") && video.dataset.source) {
              video.src = video.dataset.source;
            }
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "20% 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // DOM order: [answers, loop, paperwork]
      const panels = panelRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      if (panels.length !== PANELS.length) return;
      const [answersEl, loopEl, paperworkEl] = panels;

      const parts = (e: HTMLElement) => {
        const card = e.querySelector<HTMLElement>(".video")!;
        const video = card.querySelector<HTMLVideoElement>("video")!;
        const desc = e.querySelector<HTMLElement>(".description-animation")!;
        return { card, video, desc };
      };

      // 1. Initial states
      panels.forEach((panel, i) => {
        const { card, video, desc } = parts(panel);
        gsap.set(card, { scale: 0.95, y: "10%" });
        gsap.set(video, { scale: 1.2 });
        gsap.set(desc, {
          opacity: 0,
          y: "50%",
          scale: window.innerWidth < 1280 && i > 0 ? 0.8 : 1,
        });
      });

      // 2. Pin
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () =>
          window.innerWidth >= 1280
            ? `+=${2.2 * window.innerHeight}`
            : window.innerWidth >= 1024
              ? `+=${3 * window.innerHeight}`
              : `+=${2.5 * window.innerHeight}`,
        pin: true,
        invalidateOnRefresh: true,
      });

      // 4. Sub-timeline builders
      const enter = (e: HTMLElement) => {
        const { card, video, desc } = parts(e);
        const narrow = window.innerWidth < 1280;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            const p = tl.progress();
            if (p > 0.5 && p < 0.8) {
              e.style.pointerEvents = "auto";
            }
            if (p < 0.5) {
              e.style.pointerEvents = "none";
            }
          },
        });
        tl.to(e, { scale: 1, y: 0 }, 0);
        tl.to(desc, { opacity: 1, duration: narrow ? 0.5 : 1 }, narrow ? 0 : 0.1);
        tl.to(
          desc,
          { duration: narrow ? 2 : 1, scale: 1, y: "0%" },
          narrow ? 0 : 0.1
        );
        tl.to(card, { scale: 1, y: 0, opacity: 1, duration: 2 }, 0);
        tl.to(card, { backgroundColor: "#F9F8F5", duration: 0.1 }, 0);
        tl.to(video, { opacity: 1 }, 0);
        tl.fromTo(video, { scale: 1.05 }, { scale: 1, duration: 2 }, 0);
        return tl;
      };

      const behind = (e: HTMLElement, panelNum: number, step: number) => {
        const { card, video, desc } = parts(e);
        const l = panelNum - step;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            e.style.pointerEvents = "none";
          },
        });
        tl.to(e, { scale: 1, y: 0 }, 0);
        tl.to(desc, { opacity: 0, y: `${(90 - step) * l}%` }, 0);
        tl.to(card, { backgroundColor: "#F9F8F5", duration: 0.1 }, 0);
        tl.to(
          card,
          { scale: 1 - 0.15 * l, duration: 2, y: `${(12 - step) * l}%`, opacity: 1 },
          0
        );
        tl.to(video, { opacity: l <= 0 ? 1 : 0.5 - l / 5 }, 0);
        return tl;
      };

      const exit = (e: HTMLElement) => {
        const { card, desc } = parts(e);
        const wide = window.innerWidth >= 1280;
        const tabletUp = window.innerWidth >= 1024;
        const h = window.innerHeight;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            if (tl.progress() > 0.3) {
              e.style.pointerEvents = "none";
            } else {
              e.style.pointerEvents = "auto";
            }
          },
        });
        tl.to(e, { scale: 1, y: 0 }, 0);
        tl.to(
          desc,
          {
            opacity: 0,
            y: wide ? "-60%" : `-${h}px`,
            duration: wide ? 0.5 : tabletUp ? 2 : 3,
          },
          0
        );
        tl.to(card, { backgroundColor: "transparent", duration: 0.1 }, 0);
        tl.to(
          card,
          { scale: 1, duration: wide ? 3 : tabletUp ? 2 : 3, y: `${-h}px` },
          0
        );
        return tl;
      };

      const seqPaperwork = gsap
        .timeline()
        .add(enter(paperworkEl), 0)
        .add(exit(paperworkEl));

      const seqLoop = gsap
        .timeline()
        .add(behind(loopEl, 1, 0), 0)
        .add(enter(loopEl))
        .add(exit(loopEl));

      const seqAnswers = gsap
        .timeline()
        .add(behind(answersEl, 2, 0), 0)
        .add(behind(answersEl, 2, 1))
        .add(enter(answersEl));

      // 3. Master timeline
      const master = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start:
            window.innerWidth < 1024 ? "top center-=100" : "top center+=100",
          end: `+=${3 * window.innerHeight}`,
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });
      master.add(seqPaperwork, 0);
      master.add(seqLoop, 0);
      master.add(seqAnswers, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-screen desktop:mx-auto desktop:max-w-[2050px] h-[100vw] tablet:mb-[20rem] desktop:mb-[10rem] tablet:max-h-[70rem] tablet:h-[75svh] desktop:h-[36vw] desktopLarge:h-[40vw] desktop:max-h-[50rem] desktopLarge:max-h-[75rem] relative"
    >
      {PANELS.map((panel, i) => (
        <div
          key={panel.key}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className="w-full max-w-[50rem] tablet:max-w-none mx-auto tablet:h-full flex flex-col items-center justify-center absolute top-[25vw] inset-x-0 tablet:right-auto tablet:left-0 px-[1.6rem] tablet:py-0 tablet:top-[3rem] desktop:top-0"
        >
          <div className="h-full w-full tablet:w-auto relative aspect-[362/346] tablet:h-[90%] tablet:aspect-[975/614] desktop:top-[2rem] tablet:top-[4rem] desktop:aspect-[1100/693]">
            <article
              className={
                panel.textAlign === "left"
                  ? ARTICLE_CLASS_LEFT
                  : ARTICLE_CLASS_RIGHT
              }
            >
              <div
                className={`description-animation relative ${
                  panel.front ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-heading-sm text-text-primary mb-[1.2rem] desktop:max-w-[100%] text-balance">
                  {panel.title}
                </h3>
                <p className="text-body-sm text-text-secondary">{panel.body}</p>
              </div>
            </article>
            <div className="video w-full h-full bg-[#F9F8F5] rounded-[2.4rem] overflow-hidden relative tablet:rounded-[5.6rem] desktop:rounded-[6.4rem] pointer-events-none">
              <Image
                src={panel.poster}
                alt=""
                fill
                sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 90vw, 100vw"
                aria-hidden="true"
                className="object-cover"
              />
              <video
                data-source={panel.video}
                poster={panel.poster}
                loop
                playsInline
                muted
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                className="relative z-[1] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
