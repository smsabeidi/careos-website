import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Selmou page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[80svh] flex-col items-center justify-center px-[2.4rem] pb-[10rem] pt-[16rem] text-center">
        <p className="font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
          Error 404
        </p>
        <h1 className="mt-[2.4rem] text-heading-xl">This page is not here.</h1>
        <p className="mt-[3.2rem] max-w-[54rem] text-body-lg text-text-secondary">
          The address may have changed, or the page may never have existed.
        </p>
        <div className="mt-[4rem] flex flex-wrap justify-center gap-[1.2rem]">
          <Link
            href="/"
            className="rounded-[1.2rem] bg-surface-tertiary px-[2rem] py-[1.4rem] text-body-sm text-white"
          >
            Return home
          </Link>
          <Link
            href="/blog"
            className="rounded-[1.2rem] bg-white px-[2rem] py-[1.4rem] text-body-sm text-text-primary"
          >
            Read field notes
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
