import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import FooterBackdrop from "@/components/FooterBackdrop";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  footer?: boolean;
  mainClassName?: string;
};

export default function PageShell({
  children,
  footer = true,
  mainClassName,
}: PageShellProps) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main
        id="main-content"
        className={cn(
          "relative z-[1] bg-background-primary",
          mainClassName
        )}
      >
        {children}
      </main>
      {footer ? (
        <>
          <SiteFooter />
          <FooterBackdrop />
        </>
      ) : null}
    </>
  );
}
