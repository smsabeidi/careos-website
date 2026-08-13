import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS, getBlogPost, getRelatedBlogPosts } from "@/data/blog";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  SITE_URL,
} from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { robots: { index: false, follow: false } };

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: `Editorial image for ${post.title}`,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.datePublished,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Field notes", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  const wordCount = post.sections.reduce(
    (total, section) =>
      total +
      [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]
        .join(" ")
        .split(/\s+/).length,
    [post.title, post.description, ...post.keyTakeaways]
      .join(" ")
      .split(/\s+/).length,
  );
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    articleSection: post.category,
    wordCount,
    inLanguage: "en-US",
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#editorial-team`,
      name: post.author,
      url: absoluteUrl("/company"),
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    citation: post.sources?.map((source) => source.url),
  };

  return (
    <PageShell>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd(breadcrumbs)]} />
      <article>
        <header className="px-[2.4rem] pb-[7.2rem] pt-[17rem] tablet:pb-[10rem] tablet:pt-[22rem]">
          <div className="mx-auto max-w-[120rem] text-center">
            <nav aria-label="Breadcrumb" className="mb-[3.2rem]">
              <ol className="flex flex-wrap items-center justify-center gap-[0.8rem] text-body-sm text-text-secondary">
                {breadcrumbs.map((item, index) => (
                  <li key={item.path} className="flex items-center gap-[0.8rem]">
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    {index === breadcrumbs.length - 1 ? (
                      <span aria-current="page" className="max-w-[32rem] truncate">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.path} className="hover:text-text-primary">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="font-mono text-[1.1rem] uppercase tracking-[0.1em] text-text-secondary">
              {post.category} · <time dateTime={post.datePublished}>{post.date}</time>
            </p>
            <h1 className="mt-[3.2rem] font-heading text-[4.8rem] font-thin leading-[0.98] tracking-[-0.02em] tablet:text-[7.2rem] desktop:text-[9rem]">
              {post.title}
            </h1>
            <p className="mx-auto mt-[3.2rem] max-w-[72rem] text-body-lg leading-[1.45] text-text-secondary">
              {post.description}
            </p>
            <p className="mt-[2.4rem] text-body-sm">
              By <Link href="/company" className="underline underline-offset-4">{post.author}</Link>
            </p>
          </div>
        </header>

        <div className="px-[1.6rem] tablet:px-[3.2rem]">
          <div
            className="relative mx-auto h-[58svh] max-h-[82rem] min-h-[42rem] max-w-[180rem] overflow-hidden rounded-[3.2rem] tablet:rounded-[5.6rem]"
            style={{ backgroundColor: post.accent }}
          >
            <Image
              src={post.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto grid max-w-[126rem] gap-[6.4rem] px-[2.4rem] py-[10rem] tablet:px-[4rem] tablet:py-[14rem] desktop:grid-cols-[24rem_1fr] desktop:gap-[10rem] desktop:py-[18rem]">
          <aside className="desktop:sticky desktop:top-[10rem] desktop:self-start">
            <p className="font-mono text-[1rem] uppercase tracking-[0.1em] text-text-secondary">
              In this article
            </p>
            <ol className="mt-[2rem] space-y-[1.2rem] text-body-sm text-text-secondary">
              {post.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`} className="hover:text-text-primary">
                    {String(index + 1).padStart(2, "0")} · {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="max-w-[78rem]">
            <section
              aria-labelledby="key-takeaways-heading"
              className="rounded-[3.2rem] bg-white p-[3.2rem] tablet:p-[4.8rem]"
            >
              <p className="font-mono text-[1rem] uppercase tracking-[0.1em] text-text-secondary">
                Short answer
              </p>
              <h2 id="key-takeaways-heading" className="mt-[1.6rem] text-heading-sm">
                Key takeaways
              </h2>
              <p className="mt-[2rem] text-[1.8rem] leading-[1.65] text-text-secondary tablet:text-[2rem]">
                {post.description}
              </p>
              <ul className="mt-[2.4rem] space-y-[1.2rem] pl-[2rem] text-[1.8rem] leading-[1.55] text-text-primary">
                {post.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="list-disc pl-[0.8rem]">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>
            <p className="font-heading text-[3rem] font-thin leading-[1.25] tablet:text-[4rem]">
              The work around care should never take more from the team than the
              care itself.
            </p>
            {post.sections.map((section, index) => (
              <section
                key={section.heading}
                id={`section-${index + 1}`}
                className="scroll-mt-[10rem] border-t border-stroke-stone pt-[4.8rem] mt-[6.4rem]"
              >
                <h2 className="font-heading text-[3.2rem] font-thin leading-[1.08] tablet:text-[4.8rem]">
                  {section.heading}
                </h2>
                <div className="mt-[3.2rem] space-y-[2.4rem] text-[1.8rem] leading-[1.65] text-text-secondary tablet:text-[2rem]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-[1.2rem] pl-[2rem] text-text-primary">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc pl-[0.8rem]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            {post.sources?.length ? (
              <section className="mt-[7.2rem] border-t border-stroke-stone pt-[4.8rem]" aria-labelledby="sources-heading">
                <h2 id="sources-heading" className="text-heading-sm">Primary sources</h2>
                <ul className="mt-[2.4rem] space-y-[1.2rem] text-body-sm text-text-secondary">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} className="underline underline-offset-4 hover:text-text-primary">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <p className="mt-[6.4rem] text-body-sm text-text-secondary">
              This article provides general operational guidance, not legal,
              clinical, or regulatory advice. Confirm requirements for your
              agency, payer, and jurisdiction with qualified professionals.
            </p>

            <div className="mt-[8rem] rounded-[3.2rem] bg-surface-blue p-[3.2rem] tablet:p-[5.6rem]">
              <p className="font-heading text-[3.2rem] font-thin leading-[1.08] tablet:text-[4.4rem]">
                See how Selmou turns the work around every visit into one clear operating system.
              </p>
              <LeadForm className="mt-[3.2rem]" compact />
            </div>
          </div>
        </div>
      </article>

      <section className="px-[1.6rem] pb-[16rem] tablet:px-[3.2rem] tablet:pb-[22rem]">
        <div className="mx-auto max-w-[180rem]">
          <h2 className="mb-[4rem] text-heading-md">Keep reading</h2>
          <div className="grid gap-[2.4rem] tablet:grid-cols-3">
            {related.map((candidate) => (
              <BlogCard key={candidate.slug} post={candidate} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
