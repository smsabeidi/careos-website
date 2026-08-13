import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo";

const legalDocuments = [
  {
    slug: "business-associate-agreement",
    label: "Business Associate Agreement",
    title: "Business Associate Agreement",
  },
  { slug: "privacy", label: "Privacy Policy", title: "Privacy Policy" },
  {
    slug: "referral-program",
    label: "Referral Program",
    title: "Referral Program Agreement",
  },
  {
    slug: "services-agreement",
    label: "Services Agreement",
    title: "Services Agreement",
  },
  {
    slug: "terms-of-service",
    label: "Terms of Service",
    title: "Terms of Service",
  },
] as const;

type LegalPageProps = {
  params: Promise<{ document: string }>;
};

function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}

function readLegalDocument(slug: string) {
  return readFileSync(
    join(process.cwd(), "src", "content", "legal", `${slug}.html`),
    "utf8"
  );
}

export function generateStaticParams() {
  return legalDocuments.map(({ slug }) => ({ document: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { document: slug } = await params;
  const document = getLegalDocument(slug);
  return document
    ? createPageMetadata({
        title: document.title,
        description: `${document.title} for the Selmou website and product. This draft page remains subject to final legal review.`,
        path: `/legal/${document.slug}`,
        noIndex: true,
      })
    : { robots: { index: false, follow: false } };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { document: slug } = await params;
  const activeDocument = getLegalDocument(slug);
  if (!activeDocument) notFound();

  const documentHtml = readLegalDocument(activeDocument.slug);

  return (
    <PageShell mainClassName="px-[2rem] tablet:px-[2.4rem] desktop:px-[3rem] grid md:grid-cols-[250px_1fr] tablet:grid-cols-[300px_1fr] gap-[4.8rem] pt-[24rem] pb-[6.8rem]">
      <aside className="sticky top-[24rem] hidden self-start text-body-md md:block">
        <nav aria-label="Legal documents">
          <ul>
            {legalDocuments.map((document) => {
              const active = document.slug === activeDocument.slug;
              return (
                <li key={document.slug}>
                  <Link
                    href={`/legal/${document.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-[16px] px-[24px] py-[16px] text-text-secondary transition-colors duration-150 hover:bg-surface-primary hover:text-text-primary",
                      active && "bg-surface-primary text-text-primary"
                    )}
                  >
                    {document.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="grid gap-[2.4rem] md:grid-cols-9">
        <article
          className="legal-prose col-start-1 col-end-9 mx-auto max-w-[68rem] desktop:col-end-8"
          dangerouslySetInnerHTML={{ __html: documentHtml }}
        />
      </div>
    </PageShell>
  );
}
