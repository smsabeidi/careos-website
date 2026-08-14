import BrandMark from "@/components/BrandMark";

export default function FeaturesIntro() {
  return (
    <section className="mb-[8rem] flex w-full flex-col items-center justify-center tablet:mb-[6rem]">
      <span
        className="flex size-[32rem] items-center justify-center"
        aria-hidden="true"
      >
        <BrandMark className="size-[18rem]" />
      </span>
      <h2 className="text-heading-lg text-center text-text-primary">
        AI prepares the work.
        <br />
        People stay in charge.
      </h2>
    </section>
  );
}
