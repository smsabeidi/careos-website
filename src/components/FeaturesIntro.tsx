"use client";

import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FeaturesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const dotLottie = dotLottieRef.current;
          if (!dotLottie) return;

          const playFromStart = () => {
            dotLottie.setFrame(0);
            dotLottie.play();
          };

          if (dotLottie.isLoaded) {
            playFromStart();
          } else {
            dotLottie.addEventListener("load", playFromStart);
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col justify-center items-center mb-[8rem] tablet:mb-[6rem]"
    >
      <span className="w-[32rem] inline-block">
        <DotLottieReact
          src="/lottie/flower.lottie"
          className="w-[32rem] h-auto"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={(dotLottie) => {
            dotLottieRef.current = dotLottie;
          }}
        />
      </span>
      <h2 className="text-heading-lg text-text-primary text-center">
        AI prepares the work.
        <br />
        People stay in charge.
      </h2>
    </section>
  );
}
