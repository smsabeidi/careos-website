import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FooterCta from "@/components/FooterCta";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageShell from "@/components/PageShell";
import { CAMPAIGNS, getCampaign } from "@/data/campaigns";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  SITE_URL,
} from "@/lib/seo";

type CampaignPageProps = {
  params: Promise<{ campaign: string }>;
};

export function generateStaticParams() {
  return CAMPAIGNS.map((campaign) => ({ campaign: campaign.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return { robots: { index: false, follow: false } };

  return createPageMetadata({
    title: campaign.seoTitle,
    description: campaign.seoDescription,
    path: `/${campaign.slug}`,
    image: campaign.image,
    imageAlt: `${campaign.person} — ${campaign.scenario.toLowerCase()}`,
  });
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();
  const relatedCampaigns = CAMPAIGNS.filter(
    (candidate) => candidate.slug !== campaign.slug,
  ).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: campaign.seoTitle, path: `/${campaign.slug}` },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(`/${campaign.slug}`)}#webpage`,
    url: absoluteUrl(`/${campaign.slug}`),
    name: campaign.seoTitle,
    description: campaign.seoDescription,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    inLanguage: "en-US",
  };

  return (
    <PageShell>
      <JsonLd data={[webPageJsonLd, breadcrumbJsonLd(breadcrumbs)]} />
      <section className="px-[2.4rem] pb-[12rem] pt-[17rem] text-center tablet:pb-[16rem] tablet:pt-[22rem]">
        <div className="mx-auto max-w-[126rem]">
          <nav aria-label="Breadcrumb" className="mb-[3.2rem]">
            <ol className="flex flex-wrap items-center justify-center gap-[0.8rem] text-body-sm text-text-secondary">
              {breadcrumbs.map((item, index) => (
                <li key={item.path} className="flex items-center gap-[0.8rem]">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="hover:text-text-primary">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
            {campaign.eyebrow}
          </p>
          <h1 className="mt-[3.2rem] text-heading-xl">
            {campaign.title}
            <br />
            <span className="italic text-text-brand">{campaign.italic}</span>
          </h1>
          <p className="mx-auto mt-[3.2rem] max-w-[68rem] text-body-lg leading-[1.45] text-text-secondary">
            {campaign.description}
          </p>
          <LeadForm className="mx-auto mt-[4rem]" />
        </div>
      </section>

      <section className="px-[1.6rem] pb-[12rem] tablet:px-[3.2rem] tablet:pb-[18rem]">
        <div className="mx-auto grid max-w-[180rem] overflow-hidden rounded-[3.2rem] bg-white tablet:rounded-[5.6rem] desktop:grid-cols-2">
          <div className="flex min-h-[48rem] flex-col justify-between p-[3.2rem] tablet:min-h-[64rem] tablet:p-[6.4rem] desktop:min-h-[78rem] desktop:p-[8rem]">
            <p className="font-mono text-[1.1rem] uppercase tracking-[0.1em] text-text-secondary">
              Operational clarity
            </p>
            <div>
              <p className="font-heading text-[11rem] font-thin leading-none tracking-[-0.05em] text-text-brand tablet:text-[16rem] desktop:text-[20rem]">
                {campaign.metric}
              </p>
              <p className="mt-[2rem] max-w-[36rem] text-heading-sm">
                {campaign.metricLabel}
              </p>
            </div>
          </div>
          <div className="relative min-h-[58rem] desktop:min-h-0">
            <Image
              src={campaign.image}
              alt={campaign.person}
              fill
              sizes="(min-width: 1280px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-[1.6rem] bottom-[1.6rem] rounded-[2.4rem] bg-black/30 p-[2.4rem] text-white backdrop-blur-xl tablet:inset-x-[2.4rem] tablet:bottom-[2.4rem] tablet:p-[3.2rem]">
              <figure>
                <blockquote className="font-heading text-[2.6rem] font-thin leading-[1.1] tablet:text-[3.6rem]">
                  &ldquo;{campaign.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-[2.4rem] text-body-sm">
                  {campaign.person}
                  <br />
                  <span className="text-white/60">{campaign.scenario}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[1.6rem] pb-[16rem] tablet:px-[3.2rem] tablet:pb-[22rem]">
        <div className="mx-auto max-w-[180rem]">
          <div className="mb-[6.4rem] grid gap-[2.4rem] desktop:grid-cols-2 desktop:items-end">
            <h2 className="text-heading-lg">
              Less chasing.
              <br />
              <span className="italic text-text-brand">More care.</span>
            </h2>
            <p className="max-w-[54rem] text-body-lg text-text-secondary desktop:justify-self-end">
              Selmou connects the people, records, and rules behind every visit,
              then brings the exceptions to the right person.
            </p>
          </div>
          <div className="grid gap-[1.2rem] tablet:grid-cols-3 tablet:gap-[2.4rem]">
            {campaign.benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="flex min-h-[28rem] flex-col justify-between rounded-[2.4rem] bg-white p-[2.4rem] tablet:min-h-[38rem] tablet:rounded-[3.2rem] tablet:p-[3.2rem]"
              >
                <span className="font-mono text-[1rem] text-text-secondary">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-heading-sm">{benefit.title}</h3>
                  <p className="mt-[1.6rem] text-body-sm text-text-secondary">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="related-workflows-heading"
        className="px-[1.6rem] pb-[16rem] tablet:px-[3.2rem] tablet:pb-[22rem]"
      >
        <div className="mx-auto max-w-[180rem] border-t border-stroke-stone pt-[6.4rem]">
          <h2 id="related-workflows-heading" className="text-heading-md">
            Explore related workflows
          </h2>
          <div className="mt-[4rem] grid gap-[1.2rem] tablet:grid-cols-3 tablet:gap-[2.4rem]">
            {relatedCampaigns.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.slug}`}
                className="group rounded-[2.4rem] bg-white p-[2.4rem] tablet:min-h-[24rem] tablet:rounded-[3.2rem] tablet:p-[3.2rem]"
              >
                <h3 className="text-heading-sm">{related.seoTitle}</h3>
                <p className="mt-[1.6rem] text-body-sm text-text-secondary">
                  {related.seoDescription}
                </p>
                <span className="mt-[3.2rem] inline-block text-body-sm transition-transform group-hover:translate-x-[0.4rem]">
                  Explore workflow →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCta />
    </PageShell>
  );
}
