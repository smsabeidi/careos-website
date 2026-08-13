import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid overflow-hidden rounded-[2.4rem] bg-white transition-transform duration-500 hover:-translate-y-[0.4rem] tablet:rounded-[3.2rem] ${
        featured ? "tablet:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "min-h-[34rem] tablet:min-h-[52rem]" : "aspect-[4/3]"
        }`}
        style={{ backgroundColor: post.accent }}
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </div>
      <div
        className={`flex flex-col ${
          featured
            ? "justify-between p-[3.2rem] tablet:p-[5.6rem]"
            : "min-h-[32rem] p-[2.4rem] tablet:p-[3.2rem]"
        }`}
      >
        <div>
          <p className="font-mono text-[1rem] uppercase tracking-[0.1em] text-text-secondary">
            {post.category} · {post.date}
          </p>
          <h2
            className={`mt-[2rem] font-heading font-thin leading-[1.05] ${
              featured
                ? "text-[3.6rem] tablet:text-[5.2rem]"
                : "text-[2.8rem] tablet:text-[3.4rem]"
            }`}
          >
            {post.title}
          </h2>
          <p className="mt-[2rem] text-body-sm text-text-secondary">
            {post.description}
          </p>
        </div>
        <span className="mt-[3.2rem] inline-flex items-center gap-[1rem] text-body-sm">
          Read article
          <span className="transition-transform group-hover:translate-x-[0.4rem]">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
