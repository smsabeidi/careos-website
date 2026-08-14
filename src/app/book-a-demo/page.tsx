import type { Metadata } from "next";
import { Suspense } from "react";
import DemoExperience, { DemoExperienceRoute } from "@/components/DemoExperience";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Home Care Software Demo",
  description:
    "See how Selmou brings visits, records, deadlines, and exceptions into one clear operating picture for your home care agency.",
  path: "/book-a-demo",
  image: "/images/demo/kwon.png",
  imageAlt: "Care professional standing beside a redwood tree",
});

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
    <>
      <JsonLd data={[contactPageJsonLd, breadcrumbJsonLd(breadcrumbs)]} />
      <Suspense fallback={<DemoExperience />}>
        <DemoExperienceRoute />
      </Suspense>
    </>
  );
}
