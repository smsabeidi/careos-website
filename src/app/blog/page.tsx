import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import FooterCta from "@/components/FooterCta";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS } from "@/data/blog";
import { absoluteUrl, createPageMetadata, SITE_URL } from "@/lib/seo";

const pageMetadata = createPageMetadata({
  title: "Home Care Operations Guides",
  description:
    "Practical home care operations guides covering EVV, documentation, compliance evidence, workforce credentials, record integrity, migration, and responsible AI.",
  path: "/blog",
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
};

export default function BlogPage() {
  const [featured, ...posts] = BLOG_POSTS;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/blog")}#collection`,
    url: absoluteUrl("/blog"),
    name: "Selmou home care operations guides",
    description:
      "Practical guidance for building a calmer, more defensible home care operation.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  };

  return (
    <PageShell>
      <JsonLd data={collectionJsonLd} />
      <header className="px-[2.4rem] pb-[8rem] pt-[18rem] text-center tablet:pb-[12rem] tablet:pt-[22rem]">
        <p className="font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
          Home care operations guides
        </p>
        <h1 className="mt-[2.4rem] text-heading-xl">Field notes</h1>
        <p className="mt-[2.4rem] text-body-lg text-text-secondary">
          Evidence-aware guidance for a calmer, more defensible home care operation.
        </p>
      </header>

      <section className="px-[1.6rem] pb-[14rem] tablet:px-[3.2rem] tablet:pb-[20rem]">
        <div className="mx-auto max-w-[180rem]">
          <BlogCard post={featured} featured />
          <div className="mt-[2.4rem] grid gap-[2.4rem] tablet:grid-cols-2 desktop:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <FooterCta />
    </PageShell>
  );
}
