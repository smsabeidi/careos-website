import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { CAMPAIGNS } from "@/data/campaigns";
import { absoluteUrl, SITE_UPDATED_AT } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/images/hero-cover.jpg")],
    },
    {
      url: absoluteUrl("/company"),
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/book-a-demo"),
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: BLOG_POSTS[0]?.datePublished ?? SITE_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const campaignPages: MetadataRoute.Sitemap = CAMPAIGNS.map((campaign) => ({
    url: absoluteUrl(`/${campaign.slug}`),
    lastModified: SITE_UPDATED_AT,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(campaign.image)],
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.datePublished,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(post.image)],
  }));

  return [...corePages, ...campaignPages, ...blogPages];
}
