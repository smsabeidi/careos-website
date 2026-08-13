import type { Metadata } from "next";

export const SITE_URL = "https://www.selmou.com";
export const SITE_NAME = "Selmou";
export const SITE_DESCRIPTION =
  "Selmou is home care operations software being built to connect scheduling, EVV, documentation, credentials, compliance work, and review in one traceable workflow.";
export const SITE_UPDATED_AT = "2026-08-13";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/hero-cover.jpg",
  imageAlt = "Selmou home care operations software",
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage,
          width: image === "/images/hero-cover.jpg" ? 1920 : 1713,
          height: 1080,
          alt: imageAlt,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: socialImage, alt: imageAlt }],
    },
  };
}

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/selmou-logo-graphite.png"),
    width: 737,
    height: 737,
  },
  description: SITE_DESCRIPTION,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
