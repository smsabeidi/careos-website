"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandMark from "@/components/BrandMark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Portrait = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fromAngle: number;
  angle: number;
  offsetX: number;
  offsetY: number;
};

const portraitData: Portrait[] = [
  {
    fromAngle: -10,
    width: 81,
    height: 102,
    angle: 50,
    offsetX: 0,
    offsetY: 0,
    alt: "A framed reminder of the small details that make a space feel cared for.",
    src: "/images/company/community-1.jpg",
  },
  {
    fromAngle: 40,
    width: 127,
    height: 98,
    angle: 140,
    offsetX: -20,
    offsetY: -40,
    alt: "Office supplies neatly organized on a desk.",
    src: "/images/company/community-2.jpg",
  },
  {
    fromAngle: 100,
    width: 97,
    height: 99,
    angle: 150,
    offsetX: 15,
    offsetY: 20,
    alt: "A friendly handwritten note attached to a monitor.",
    src: "/images/company/community-3.jpg",
  },
  {
    fromAngle: 130,
    width: 123,
    height: 119,
    angle: 230,
    offsetX: 40,
    offsetY: 0,
    alt: "A care professional standing beside a tree.",
    src: "/images/company/community-4.jpg",
  },
  {
    fromAngle: 200,
    width: 122,
    height: 86,
    angle: 240,
    offsetX: 30,
    offsetY: 40,
    alt: "Professional credentials displayed on a wall.",
    src: "/images/company/community-5.jpg",
  },
  {
    fromAngle: 200,
    width: 133,
    height: 85,
    angle: 300,
    offsetX: -45,
    offsetY: 40,
    alt: "An open notebook and organized medical supplies.",
    src: "/images/company/community-6.jpg",
  },
  {
    fromAngle: 260,
    width: 110,
    height: 122,
    angle: 310,
    offsetX: -50,
    offsetY: 0,
    alt: "A care professional speaking with a client.",
    src: "/images/company/community-7.jpg",
  },
  {
    fromAngle: -60,
    width: 126,
    height: 100,
    angle: 40,
    offsetX: -30,
    offsetY: 0,
    alt: "A person in scrubs making a green balloon animal.",
    src: "/images/company/community-8.jpg",
  },
];

const toRadians = (angle: number) => (angle * Math.PI) / 180;

export default function CompanyCommunity() {
  const portraitRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const rebuildingRef = useRef(false);
  const portraitsRef = useRef(portraitData.map((portrait) => ({ ...portrait })));
  const motionRef = useRef({ radiusX: 0, radiusY: 0, animateScale: true });
  useGSAP(() => {
    const motion = motionRef.current;

    const destroyTimeline = () => {
      if (!timelineRef.current) return;
      rebuildingRef.current = true;
      timelineRef.current.scrollTrigger?.kill();
      timelineRef.current.revert();
      timelineRef.current = null;
      rebuildingRef.current = false;
    };

    const updatePortraits = () => {
      if (rebuildingRef.current) return;
      const progress = timelineRef.current?.progress() ?? 0;

      portraitRefs.current.forEach((element, index) => {
        if (!element) return;
        const portrait = portraitsRef.current[index];
        const image = element.querySelector("img");
        const scale = Math.min(1, 2 * progress);
        const x =
          portrait.offsetX -
          portrait.width / 2 +
          Math.cos(toRadians(portrait.angle - 180)) * motion.radiusX;
        const y =
          portrait.offsetY -
          portrait.height / 2 +
          Math.sin(toRadians(portrait.angle - 180)) * motion.radiusY;

        element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        element.style.scale = "1";
        element.style.opacity = "1";

        if (image && motion.animateScale) {
          image.style.transform = `scale(${Math.max(1, 2 - progress)})`;
        }
      });
    };

    const createTimeline = (mobile: boolean) => {
      motion.animateScale = !mobile;
      destroyTimeline();
      motion.radiusX = 0.3 * window.innerWidth;
      motion.radiusY = 0.3 * window.innerHeight;

      const timeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: "#community",
          start: "top bottom",
          end: () =>
            window.innerWidth >= 1280
              ? `+=${3 * window.innerHeight}`
              : `+=${1.2 * window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: updatePortraits,
        },
      });

      timelineRef.current = timeline;
      portraitsRef.current.forEach((portrait) => {
        timeline.fromTo(
          portrait,
          { angle: portrait.fromAngle },
          { angle: portraitData[portraitsRef.current.indexOf(portrait)].angle },
          0,
        );
      });
      timeline.fromTo(
        motion,
        {
          radiusX: () => 0.3 * window.innerWidth,
          radiusY: () => 0.3 * window.innerHeight,
        },
        {
          radiusX: () => 0.4 * window.innerWidth,
          radiusY: () => 0.4 * window.innerHeight,
        },
        0,
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const media = gsap.matchMedia();

    media.add("(max-width: 1279px)", () => {
      createTimeline(true);
      pinRef.current?.kill();
      pinRef.current = null;
      return destroyTimeline;
    });

    media.add("(min-width: 1280px)", () => {
      createTimeline(false);
      pinRef.current = ScrollTrigger.create({
        trigger: "#community",
        start: "top top",
        end: () => `+=${2.5 * window.innerHeight}`,
        pin: true,
        invalidateOnRefresh: true,
      });

      return () => {
        pinRef.current?.kill();
        pinRef.current = null;
        destroyTimeline();
      };
    });

    const handleResize = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(updatePortraits);
        updatePortraits();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      media.revert();
      pinRef.current?.kill();
      pinRef.current = null;
      destroyTimeline();
      portraitRefs.current.forEach((element) => {
        const image = element?.querySelector("img");
        if (image) image.style.transform = "";
        if (element) {
          element.style.transform = "";
          element.style.scale = "";
        }
      });
    };
  }, []);

  return (
    <section
      id="community"
      className="relative flex h-svh w-full flex-col items-center justify-center desktop:mb-[12rem]"
    >
      <span className="mb-[2.5rem] inline-flex h-[12rem] w-[24rem] items-center justify-center tablet:mt-[-2rem] tablet:h-[16rem] tablet:w-[32rem] desktop:mb-0">
        <BrandMark
          aria-hidden="true"
          className="size-[6.4rem]"
        />
      </span>
      <h2 className="w-[90%] text-center text-heading-lg tracking-[initial] text-text-primary [font-variant-ligatures:common-ligatures] tablet:w-[84%]">
        Selmou is built around
        <br />
        the people behind every visit
        <br />
        across the entire agency
      </h2>

      <section className="pointer-events-none absolute top-[4rem] h-svh w-full tablet:top-[4rem] desktop:top-0">
        {portraitsRef.current.map((portrait, index) => (
          <div
            key={`${portrait.width}-${portrait.height}-${index}`}
            ref={(element) => {
              portraitRefs.current[index] = element;
            }}
            className="absolute left-1/2 top-1/2 scale-0 opacity-0"
            style={{ width: portrait.width, height: portrait.height }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] tablet:scale-150 tablet:rounded-[1.6rem] desktop:scale-[1.9]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
