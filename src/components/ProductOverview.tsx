const overviewItems = [
  {
    term: "Built for",
    description:
      "Home care agencies and the people who schedule, deliver, review, and stand behind each visit.",
  },
  {
    term: "Connects",
    description:
      "Scheduling, EVV, field documentation, credentials, compliance work, approvals, and reporting.",
  },
  {
    term: "Designed to produce",
    description:
      "A clear next action during the day and a complete, traceable record after the visit.",
  },
] as const;

export default function ProductOverview() {
  return (
    <section
      id="what-is-selmou"
      aria-labelledby="overview-heading"
      className="bg-background-primary px-[1.6rem] pb-[2rem] pt-[10rem] tablet:px-[3.2rem] tablet:pt-[15rem] desktop:pt-[20rem]"
    >
      <div className="mx-auto max-w-[150rem]">
        <div className="grid gap-[3.2rem] desktop:grid-cols-[0.9fr_1.1fr] desktop:items-end">
          <div>
            <p className="font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
              Home care operations software
            </p>
            <h2 id="overview-heading" className="mt-[2.4rem] text-heading-lg">
              What is Selmou?
            </h2>
          </div>
          <p className="max-w-[74rem] text-body-lg leading-[1.45] text-text-secondary desktop:justify-self-end">
            Selmou is an operating system being built for home care agencies. It
            carries the context of a visit from the schedule through field work,
            review, correction, signature, and operational follow-up so teams do
            not have to reconstruct the story across disconnected tools.
          </p>
        </div>

        <dl className="mt-[6.4rem] grid gap-[1.2rem] tablet:grid-cols-3 tablet:gap-[2.4rem]">
          {overviewItems.map((item) => (
            <div
              key={item.term}
              className="rounded-[2.4rem] bg-white p-[2.4rem] tablet:min-h-[26rem] tablet:rounded-[3.2rem] tablet:p-[3.2rem]"
            >
              <dt className="text-heading-sm">{item.term}</dt>
              <dd className="mt-[2rem] text-body-md text-text-secondary">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
