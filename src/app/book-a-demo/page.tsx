import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DemoForm from "@/components/DemoForm";
import DemoLogoMarquee from "@/components/DemoLogoMarquee";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Home Care Software Demo",
  description:
    "See how Selmou brings visits, records, deadlines, and exceptions into one clear operating picture for your home care agency.",
  path: "/book-a-demo",
  image: "/images/demo/kwon.png",
  imageAlt: "Care professional standing beside a redwood tree",
});

const benefits = [
  "Built around your agency",
  "Human guided onboarding",
  "One workflow, end to end",
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4.36328 10.9313C5.16855 11.221 7.16555 12.2724 8.71136 14.1599C9.46281 12.2144 11.8997 7.82674 15.6357 5.83984"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function BookADemoPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Book a demo", path: "/book-a-demo" },
  ];
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/book-a-demo")}#contact`,
    url: absoluteUrl("/book-a-demo"),
    name: "Book a Selmou demo",
    description:
      "Request a walkthrough of Selmou home care operations software.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <PageShell footer={false}>
      <JsonLd data={[contactPageJsonLd, breadcrumbJsonLd(breadcrumbs)]} />
      <div className="h-auto min-h-svh px-[2rem] pt-[14.4rem] tablet:h-svh tablet:px-[2.4rem] tablet:pt-[8.8rem] desktop:px-[3rem]">
        <div className="mx-auto h-full max-w-[2056px]">
          <section className="w-full tablet:h-full">
            <div className="flex flex-col items-end justify-center gap-[4rem] tablet:h-full tablet:flex-row tablet:items-center">
              <div className="w-full items-center tablet:px-[3rem] desktop:px-[4.4rem]">
                <div className="flex flex-1 flex-col items-center gap-[3.2rem]">
                  <nav aria-label="Breadcrumb">
                    <ol className="flex items-center justify-center gap-[0.8rem] text-body-sm text-text-secondary">
                      <li><Link href="/" className="hover:text-text-primary">Home</Link></li>
                      <li aria-hidden="true">/</li>
                      <li aria-current="page">Book a demo</li>
                    </ol>
                  </nav>
                  <h1 className="text-heading-lg text-pretty text-center">
                    See your agency
                    <br />
                    before the scramble
                    <br />
                    begins
                  </h1>
                  <p className="text-body-lg text-pretty text-center">
                    See how Selmou turns visits, records, and deadlines into one
                    clear operating picture.
                  </p>
                  <DemoForm />
                </div>

                <div className="mt-[2.4rem] flex flex-wrap items-start justify-center gap-x-[2.4rem] gap-y-[1.2rem] text-text-secondary desktop:mt-[4rem]">
                  {benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="flex items-center gap-[0.4rem] text-body-sm"
                    >
                      <CheckIcon />
                      {benefit}
                    </span>
                  ))}
                </div>

                <DemoLogoMarquee className="mt-[8rem] hidden lg:block" />
              </div>

              <div className="relative aspect-square w-full self-center overflow-hidden rounded-[2.4rem] lg:rounded-[6.4rem]">
                <Image
                  src="/images/demo/kwon.png"
                  alt="Care professional standing beside a redwood tree"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0">
                  <div className="absolute right-[1.6rem] top-[1.6rem] flex items-center gap-[1.9rem] text-body-md text-white tablet:right-[3rem] tablet:top-[3rem]">
                    Selmou walkthrough
                    <span className="rounded-[0.4rem] bg-background-secondary p-[0.6rem] text-label-sm text-text-secondary">
                      Synthetic demo
                    </span>
                  </div>

                  <div className="absolute bottom-[1.6rem] right-[1.6rem] flex flex-col items-end gap-[0.7rem] tablet:bottom-[3rem] tablet:right-[3rem] tablet:gap-[0.5vw]">
                    <p className="demo-transparent-pill rounded-[0.8rem] px-[1.5rem] py-[1.5rem] text-[1.2rem] text-white tablet:px-[2.4rem] tablet:py-[1.4rem] tablet:text-[1vw] desktop:text-[0.9vw]">
                      Today&rsquo;s risks, surfaced
                    </p>
                    <p className="demo-transparent-pill -translate-x-[20%] rounded-[0.8rem] px-[1.5rem] py-[1.5rem] text-[1.2rem] text-white tablet:px-[2.4rem] tablet:py-[1.4rem] tablet:text-[1vw] desktop:text-[0.9vw]">
                      Every visit, traceable
                    </p>
                    <p className="demo-transparent-pill rounded-[0.8rem] px-[1.5rem] py-[1.5rem] text-[1.2rem] text-white tablet:px-[2.4rem] tablet:py-[1.4rem] tablet:text-[1vw] desktop:text-[0.9vw]">
                      AI drafts. People approve.
                    </p>
                  </div>
                </div>
              </div>

              <DemoLogoMarquee className="block pb-[4rem] lg:hidden" />
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
