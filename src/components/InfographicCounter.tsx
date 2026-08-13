"use client";

import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fillStyle: CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  color: "transparent",
};

type Angle = { d: number; m: number };
type CardConfig = {
  from: Angle;
  to: Angle;
  off: { d: [number, number]; m: [number, number] };
};

const configs: CardConfig[] = [
  { from: { d: -174, m: -154 }, to: { d: -74, m: -84 }, off: { d: [0, 0], m: [0, 0] } },
  { from: { d: -120, m: -120 }, to: { d: -74, m: -74 }, off: { d: [-80, 10], m: [-80, 10] } },
  { from: { d: -125, m: -25 }, to: { d: 35, m: 35 }, off: { d: [-25, -60], m: [-25, -20] } },
  { from: { d: 5, m: 110 }, to: { d: 105, m: 130 }, off: { d: [-50, 40], m: [-50, -20] } },
  { from: { d: 95, m: 180 }, to: { d: 195, m: 205 }, off: { d: [0, 0], m: [25, -60] } },
  { from: { d: 30, m: 100 }, to: { d: 105, m: 120 }, off: { d: [50, -100], m: [0, -40] } },
];

export default function InfographicCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const copy1Ref = useRef<HTMLHeadingElement | null>(null);
  const copy2Ref = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [n, setN] = useState(100);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pctEl = pctRef.current;
      const copy1 = copy1Ref.current;
      const copy2 = copy2Ref.current;
      const cardsLayer = cardsRef.current;
      if (!section || !pctEl || !copy1 || !copy2 || !cardsLayer) return;

      const isTablet = () => window.innerWidth >= 1024;
      const isDesktop = () => window.innerWidth >= 1280;
      const rad = (a: number) => (a * Math.PI) / 180;
      const pickAngle = (v: Angle) => (isTablet() ? v.d : v.m);

      let done = false;

      // 1. PIN
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () =>
          isDesktop()
            ? `+=${2.2 * window.innerHeight}`
            : `+=${1.2 * window.innerHeight}`,
        pin: true,
        invalidateOnRefresh: true,
      });

      // 2. COUNTER (time-driven, runs once)
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: `+=${3 * window.innerHeight}`,
        scrub: true,
        onEnter: () => {
          if (!done) {
            const obj = { value: 0 };
            gsap.timeline().fromTo(
              obj,
              { value: 0 },
              {
                value: 100,
                duration: 3,
                ease: "expo.inOut",
                delay: 0.5,
                onComplete: () => {
                  done = true;
                },
                onUpdate: () => setN(Math.round(obj.value)),
              }
            );
          }
        },
      });

      // 3. TEXT timeline (scrubbed)
      gsap.set(pctEl, { autoAlpha: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: () =>
              isTablet()
                ? `+=${3 * window.innerHeight}`
                : `+=${1.5 * window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          pctEl,
          { autoAlpha: 0, y: "+=30px" },
          { autoAlpha: 1, y: "0px", duration: 3, ease: "expo.out" },
          1
        )
        .fromTo(
          copy1,
          { autoAlpha: 0, y: "+=30px" },
          { autoAlpha: 1, y: "0px", duration: 3, ease: "expo.out" },
          1.1
        )
        .to({}, { duration: 4 })
        .to(pctEl, { autoAlpha: 0, y: "-60%", duration: 1 })
        .to(copy1, { autoAlpha: 0, y: "-40%", duration: 1 }, "<")
        .fromTo(copy2, { autoAlpha: 0, y: "20%" }, { autoAlpha: 1, y: "-40%", duration: 1.5 })
        .to({}, { duration: 1 });

      // 4. CARD ORBIT (scrubbed)
      const cardEls = Array.from(cardsLayer.children) as HTMLElement[];
      const states = configs.map((c) => ({ angle: pickAngle(c.from) }));

      let tl: gsap.core.Timeline | null = null;

      const layout = () => {
        if (!tl) return;
        const p = tl.progress();
        const tab = isTablet();
        const radiusX = 0.43 * window.innerWidth;
        const radiusY = 0.39 * window.innerHeight;
        cardEls.forEach((el, i) => {
          const cfg = configs[i];
          const st = states[i];
          if (!cfg || !st) return;
          const img = el.querySelector("img");
          const isGraphic =
            el.dataset.graphic === "true" || !!el.querySelector("[data-graphic]");
          if (!isGraphic && img && tab) {
            img.style.transform = `scale(${Math.max(1, 2 - 1.5 * p)})`;
          }
          const [offX, offY] = tab ? cfg.off.d : cfg.off.m;
          const x =
            Math.cos(rad(st.angle - 60)) * radiusX - el.offsetWidth / 2 + offX;
          const y =
            Math.sin(rad(st.angle - 60)) * radiusY - el.offsetHeight / 2 + offY;
          el.style.opacity = "1";
          el.style.transform = `translate(${x}px, ${y}px) scale(${Math.min(1, 2 * p)})`;
        });
      };

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: () =>
            isTablet()
              ? `+=${3.5 * window.innerHeight}`
              : `+=${2 * window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: layout,
          // onStart is honored at runtime but missing from ScrollTrigger's types
          onStart: layout,
        } as ScrollTrigger.Vars,
      });

      configs.forEach((c, i) => {
        tl!.fromTo(
          states[i],
          { angle: () => pickAngle(c.from) },
          { angle: () => pickAngle(c.to), ease: "none" },
          0
        );
      });

      // Initial state (replaces the site's inline runtime styles): photo imgs
      // start zoomed to scale(2); cards start at translate(...) scale(0).
      if (isTablet()) {
        cardEls.forEach((el) => {
          const isGraphic =
            el.dataset.graphic === "true" || !!el.querySelector("[data-graphic]");
          const img = el.querySelector("img");
          if (!isGraphic && img) gsap.set(img, { scale: 2 });
        });
      }
      layout();

      cardsLayer.style.opacity = "1";
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="infographic"
      ref={sectionRef}
      className="w-full min-h-[100svh] min-w-[394px] flex justify-center items-center relative"
    >
      <div className="relative h-[15rem] w-full">
        <div className="flex flex-col justify-center items-center text-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
          <span ref={pctRef} className="text-heading-xl">
            {n}%
          </span>
          <div className="grid w-full place-items-center">
            <h2
              ref={copy1Ref}
              className="text-heading-lg col-start-1 row-start-1 text-center w-full"
            >
              of AI touched work
              <br />
              keeps a review trail
            </h2>
            <h2
              ref={copy2Ref}
              className="text-heading-lg col-start-1 row-start-1 text-center opacity-0 w-full"
            >
              Every draft shows
              <br />
              who approved it
            </h2>
          </div>
        </div>
      </div>
      <div
        ref={cardsRef}
        className="absolute w-full h-svh top-0 left-0 pointer-events-none opacity-0"
      >
        <div className="top-1/2 left-1/2 absolute">
          <span className="inline-block w-[11.3rem] h-[12.5rem] overflow-hidden rounded-[1.2rem] tablet:w-[17rem] relative tablet:h-[20.8rem] desktop:rounded-[1.6rem] desktop:w-[23.6rem] desktop:h-[26.1rem]">
            <img
              loading="lazy"
              decoding="async"
              alt="Tall yellow wildflowers with thin green stems stand against a softly blurred, sunlit background, conveying a serene and natural atmosphere."
              style={fillStyle}
              src="/images/infographic/top-left.jpg"
            />
          </span>
        </div>
        <div className="top-1/2 left-1/2 absolute" data-graphic="true">
          <div className="w-[17.6rem] h-[7.86rem] max-w-none rounded-[1.2rem] desktop:rounded-[1.6rem] tablet:w-[22.5rem] tablet:h-[12.6rem] top-0 left-0 desktop:w-[34rem] tablet:h-[15.2rem] absolute top-[-7rem] left-[7rem] object-contain">
            <img
              loading="lazy"
              decoding="async"
              src="/images/infographic/top-left-card.svg"
              alt="Completed payment status card"
              className="max-w-none object-contain"
              style={fillStyle}
            />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2">
          <picture
            data-graphic="true"
            className="w-[12.1rem] h-[12.3rem] overflow-hidden block rounded-[1.2rem] desktop:rounded-[1.6rem] tablet:w-[19.1rem] tablet:h-[19.1rem] relative desktop:w-[27.3rem] desktop:h-[27.7rem]"
          >
            <img
              loading="lazy"
              decoding="async"
              alt="A person in a navy outfit is seen from behind through a glass window. The setting appears calm, with soft light and minimalistic decor in blue tones."
              className="w-full h-full object-cover"
              style={fillStyle}
              src="/images/infographic/top-right.jpg"
            />
          </picture>
        </div>
        <div
          data-graphic="true"
          className="absolute w-[17.6rem] h-[10rem] max-w-none top-1/2 left-1/2 rounded-[1.2rem] desktop:rounded-[1.6rem] tablet:w-[26.1rem] tablet:h-[14rem] object-contain desktop:w-[34rem] desktop:h-[17rem] object-contain"
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/infographic/bottom-left-card.svg"
            alt="Weekly activity analysis card"
            className="max-w-none"
            style={fillStyle}
          />
        </div>
        <div className="top-1/2 left-1/2 absolute">
          <picture className="w-[12.1rem] h-[11.6rem] relative overflow-hidden block rounded-[1.2rem] desktop:rounded-[1.6rem] tablet:w-[18.2rem] tablet:h-[18.2rem] aspect-square desktop:w-[23.8rem] desktop:h-[22.8rem] object-contain">
            <img
              loading="lazy"
              decoding="async"
              alt="Hands typing on a sleek, white keyboard in a modern office setting. A smartwatch adorns one wrist, conveying a sense of productivity and focus."
              className="w-full h-full object-cover"
              style={fillStyle}
              src="/images/infographic/bottom-right.jpg"
            />
          </picture>
        </div>
        <div data-graphic="true" className="top-1/2 left-1/2 absolute">
          <div className="w-[17.6rem] h-[8.74rem] max-w-none relative object-contain tablet:w-[22.5rem] tablet:h-[12.6rem] desktop:w-[34rem] desktop:h-[19.6rem]">
            <img
              loading="lazy"
              decoding="async"
              src="/images/infographic/bottom-right-card.svg"
              alt="Processing claim status card"
              className="max-w-none object-contain"
              style={fillStyle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
