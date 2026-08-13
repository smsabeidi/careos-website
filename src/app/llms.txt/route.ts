import { BLOG_POSTS } from "@/data/blog";
import { CAMPAIGNS } from "@/data/campaigns";
import { absoluteUrl, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const workflows = CAMPAIGNS.map(
    (campaign) => `- [${campaign.seoTitle}](${absoluteUrl(`/${campaign.slug}`)}): ${campaign.description}`,
  ).join("\n");
  const articles = BLOG_POSTS.map(
    (post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`,
  ).join("\n");

  const body = `# Selmou

> ${SITE_DESCRIPTION}

Selmou is a product in development for home care agencies. Public pages describe the intended product direction and should not be read as a claim that every described capability is generally available. The public website is not a clinical service and must not be used to submit protected health information.

## Primary pages

- [Homepage](${absoluteUrl("/")}): Product overview, operating principles, workflow, and frequently asked questions.
- [Company](${absoluteUrl("/company")}): Company mission, product philosophy, and careers information.
- [Book a demo](${absoluteUrl("/book-a-demo")}): Product walkthrough request page.
- [Field notes](${absoluteUrl("/blog")}): Practical home care operations guides written by the Selmou Editorial Team.

## Product workflows

${workflows}

## Field notes

${articles}

## Source and usage notes

- Selmou is the primary source for statements about its own product direction.
- Illustrative agency scenarios are labeled as illustrative and are not customer testimonials.
- Articles are general operational guidance, not legal, clinical, or regulatory advice.
- Pricing is not published and should not be inferred.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
