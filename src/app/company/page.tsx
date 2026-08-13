import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CompanyCommunity from "@/components/CompanyCommunity";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Selmou",
  description:
    "Selmou is building the operating system behind every home care visit so agencies can grow with clarity, control, and a complete record.",
  path: "/company",
  image: "/images/company/careers.png",
  imageAlt: "California poppies in a sunlit field",
});

const teams = [
  "Product and design",
  "Engineering and applied AI",
  "Security and platform",
  "Care operations",
  "Agency partnerships",
] as const;

const productPrinciples = [
  {
    title: "Field reliability",
    description: "The workflow has to hold up in homes, on phones, and through unreliable connectivity.",
  },
  {
    title: "Human authority",
    description: "People remain responsible for clinical, compliance, and workforce decisions.",
  },
  {
    title: "Traceable records",
    description: "Sources, versions, corrections, signatures, and approvals stay connected.",
  },
] as const;

export default function CompanyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Company", path: "/company" },
  ];
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/company")}#about`,
    url: absoluteUrl("/company"),
    name: "About Selmou",
    description:
      "Selmou is building home care operations software around field reliability, human authority, and traceable records.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <PageShell>
      <JsonLd data={[aboutJsonLd, breadcrumbJsonLd(breadcrumbs)]} />
      <section
        id="company-title"
        className="flex h-svh w-screen flex-col items-center justify-center"
      >
        <nav aria-label="Breadcrumb" className="mb-[3.2rem]">
          <ol className="flex items-center justify-center gap-[0.8rem] text-body-sm text-text-secondary">
            <li><Link href="/" className="hover:text-text-primary">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Company</li>
          </ol>
        </nav>
        <h1 className="mb-[2.4rem] flex flex-col items-center justify-center text-center text-heading-xl tracking-[initial] [font-variant-ligatures:common-ligatures] tablet:mb-[3.2rem] desktop:mb-[4rem] desktop:flex-row">
          Reimagining how
          <br />
          care moves.
        </h1>
        <p className="text-heading-md">From the office to every home.</p>
      </section>

      <section className="mx-auto flex h-auto max-w-[40rem] flex-col items-center justify-center px-[1.6rem] pb-[4rem] text-center tablet:max-w-[55%] tablet:pb-[6.4rem] desktop:max-w-[41%] desktop:pb-[8rem] desktop:pt-[6.4rem]">
        <p className="pb-[4rem] text-heading-md">
          Selmou helps home care agencies run with clarity by carrying the operational load.
        </p>
        <p className="pb-[4rem] text-heading-md">Because the real work is care.</p>
        <p className="text-heading-md">
          We&rsquo;re building the system behind every visit because software
          should make care more human.
        </p>
      </section>

      <CompanyCommunity />

      <section className="mx-auto flex w-full flex-col items-center justify-center px-[1.6rem] pb-[11rem] pt-[16rem] text-center tablet:max-w-[55%] tablet:pb-[12rem] tablet:pt-[16rem] desktop:max-w-[41%] desktop:pb-[13rem] desktop:pt-[4rem]">
        <p className="text-heading-md">
          We are builders and operators united by a simple belief: home care
          deserves software equal to its responsibility.
          <br />
          <br />
          We value craft, operational truth, and direct communication.
          <br />
          <br />
          We are solving the hard, quiet problems behind every visit. If you
          want your work to help more care reach more homes, come build with us.
        </p>
      </section>

      <section
        id="careers"
        className="flex h-auto w-full flex-col items-center justify-center bg-background-primary p-[1.6rem] text-center tablet:p-[2.4rem] desktop:p-[3.2rem]"
      >
        <div className="relative h-full w-full max-w-[205.6rem] overflow-hidden rounded-[3.2rem] tablet:rounded-[5.6rem] desktop:rounded-[6.4rem]">
          <Image
            src="/images/company/careers.png"
            alt="A sunlit field of California poppies"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative z-[1] flex h-full w-full flex-col items-center justify-center px-[1.6rem] py-[10rem] tablet:py-[8%]">
            <h2 className="z-[1] mb-[4.8rem] max-w-full text-balance text-heading-lg text-text-white tablet:mb-[8rem] tablet:max-w-[55%] tablet:text-wrap desktop:mb-[4.8rem] desktop:max-w-[40%]">
              The future of care deserves exceptional builders.
            </h2>
            <p className="mb-[3.2rem] max-w-[52rem] text-body-md text-white/80">
              We are assembling the team that will make home care operations
              safer, calmer, and easier to scale. Open roles will appear here
              when they are ready.
            </p>
            <ul className="isolate w-full tablet:w-[54.6rem] desktop:w-[53.8rem]">
              {teams.map((title) => (
                <li key={title} className="h-[6.6rem]">
                  <div className="relative z-0 flex h-full w-full items-center justify-between gap-[3.2rem] rounded-[1.2rem] border-2 border-transparent bg-white p-[1.6rem] text-left desktop:max-h-[8.2rem] desktop:p-[2.4rem]">
                    <span className="text-body-md">{title}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 rounded-[1.8rem] bg-background-primary px-[1.5rem] py-[0.8rem] font-mono text-body-sm text-text-primary"
                    >
                      Founding team
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="standards-gradient flex flex-col items-center justify-center px-[1.6rem] py-[8rem] tablet:px-[3.2rem] desktop:py-[16rem]">
        <h2 className="mb-[6rem] max-w-[90%] text-balance text-center text-heading-lg tablet:mb-[9.6rem]">
          Built around the standards
          <br />
          enduring care deserves
        </h2>
        <div className="grid w-full max-w-[150rem] gap-[1.2rem] tablet:grid-cols-3 tablet:gap-[2.4rem]">
          {productPrinciples.map((principle) => (
            <article key={principle.title} className="rounded-[2.4rem] bg-white p-[2.4rem] tablet:min-h-[28rem] tablet:rounded-[3.2rem] tablet:p-[3.2rem]">
              <h3 className="text-heading-sm">{principle.title}</h3>
              <p className="mt-[2rem] text-body-md text-text-secondary">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
