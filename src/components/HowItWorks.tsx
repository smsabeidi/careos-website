import Image from "next/image";

const features = [
  {
    image: "/images/static-features/enrolls.svg",
    title: "Starts with the visit",
    description:
      "Selmou is being built to bring the schedule, client details, tasks, and required forms into one clear workflow.",
  },
  {
    image: "/images/static-features/efts.svg",
    title: "Designed for care in the field",
    description:
      "The Selmou field app is being built for unreliable service, with local confirmation and careful sync when connection returns.",
  },
  {
    image: "/images/static-features/payments.svg",
    title: "Turns work into evidence",
    description:
      "Every version, signature, correction, and approval stays traceable and ready when you need it.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="static-features"
      className="relative z-20 flex flex-col items-center justify-center bg-background-primary pb-[4rem] pt-[8rem] tablet:pb-[9.6rem] tablet:pt-[16rem] desktop:pt-[20rem]"
    >
      <h2 className="mb-[4.8rem] text-heading-lg tablet:mb-[5.6rem]">
        How Selmou works
      </h2>
      <div className="relative flex w-full max-w-[2056px] snap-x snap-mandatory flex-row gap-[1.2rem] self-start overflow-x-auto px-[1.6rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:snap-none tablet:overflow-visible tablet:px-[2.4rem] desktop:self-center desktop:gap-[2.4rem] desktop:px-[3.2rem]">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="relative w-[calc((100%_-_62px))] max-w-[36.2rem] shrink-0 snap-center tablet:w-[32%] tablet:max-w-none tablet:grow"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 32vw, 85vw"
              className="mb-[1.6rem] aspect-square w-full rounded-[1.6rem] desktop:mb-[2.4rem] desktop:rounded-[3.2rem]"
            />
            <div className="pr-[1.6rem]">
              <h3 className="mb-[0.4rem] w-full text-body-lg text-text-primary">
                {feature.title}
              </h3>
              <p className="text-body-md text-text-secondary">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
