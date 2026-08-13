import type { Metadata } from "next";
import Faq from "@/components/Faq";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import FeaturesIntro from "@/components/FeaturesIntro";
import FooterBackdrop from "@/components/FooterBackdrop";
import FooterCta from "@/components/FooterCta";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InfographicCounter from "@/components/InfographicCounter";
import Locations from "@/components/Locations";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import ProductOverview from "@/components/ProductOverview";
import { FAQ_ITEMS } from "@/data/faq";
import { absoluteUrl, createPageMetadata, SITE_URL } from "@/lib/seo";

const pageMetadata = createPageMetadata({
  title: "Home Care Operations Software",
  description:
    "Selmou connects scheduling, EVV, documentation, credentials, compliance work, and review so home care agencies can run each visit in one traceable workflow.",
  path: "/",
});

export const metadata: Metadata = {
  ...pageMetadata,
  title: { absolute: "Home Care Operations Software | Selmou" },
};

export default function Home() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Selmou",
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    description:
      "Home care operations software being built to connect scheduling, electronic visit verification, field documentation, credentials, compliance work, approvals, and reporting.",
    creator: { "@id": `${SITE_URL}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Home care agencies",
    },
    featureList: [
      "Connected visit workflow",
      "Electronic visit verification context",
      "Field documentation",
      "Credential and compliance work",
      "Human review and approval trails",
      "Operational exception management",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[softwareJsonLd, faqJsonLd]} />
      <SmoothScroll />
      <Nav />
      <main id="main-content" className="bg-background-primary relative z-[1]">
        <Hero />
        <ProductOverview />
        <section className="pt-[10rem] tablet:pt-[15rem] desktop:pt-[27rem] bg-background-primary mb-[10rem] tablet:mb-0">
          <FeaturesIntro />
          <FeaturesCarousel />
        </section>
        <InfographicCounter />
        <Locations />
        <HowItWorks />
        <Faq />
        <FooterCta />
        <SiteFooter />
      </main>
      <FooterBackdrop />
    </>
  );
}
