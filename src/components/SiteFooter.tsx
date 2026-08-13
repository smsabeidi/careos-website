import BrandMark from "@/components/BrandMark";

const footerLinkClass =
  "relative underline decoration-transparent underline-offset-2 transition-[text-decoration-color] hover:decoration-inherit outline-hidden after:absolute after:w-[calc(100%+8px)] after:h-[calc(100%+4px)] after:-top-[2px] after:-left-[4px] after:rounded-[0.4rem] focus-visible:after:border-2 focus-visible:after:border-blue-500 focus-visible:after:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

export default function SiteFooter() {
  return (
    <footer className="w-full z-[1] relative bg-background-secondary rounded-b-[3.2rem] tablet:rounded-b-[5.6rem] desktop:rounded-b-[6.4rem] tablet:min-h-[517px] tablet:h-[517px] tablet:flex-row tablet:justify-between relative z-[1] mb-[30vw] tablet:mb-[29vw]">
      <div className="w-full max-w-[2120px] mx-auto z-[1] relative flex flex-col px-[1.6rem] tablet:px-[3.2rem] min-h-[56svh] pb-[2.4rem] pt-[3.2rem] desktop:pt-[8rem] tablet:min-h-[517px] tablet:h-[517px] tablet:flex-row tablet:justify-between desktop:px-[3.2rem] relative z-[1] mb-[30vw] tablet:mb-[29vw]">
        <div className="mb-[3.2rem]">
          <p className="text-heading-lg mb-[1.6rem] tablet:mb-[2.4rem] desktop:mb-[3.2rem]">
            The operating system for
            <br />
            <span className="italic">home care</span>
          </p>
          <a
            className="cursor-pointer group/button relative inline-flex text-body-sm isolate outline-hidden"
            href="/book-a-demo"
          >
            <span className="flex items-center px-[1.4rem] z-10 h-[4rem] tablet:h-[4.2rem] transition-colors rounded-[1.2rem] bg-surface-tertiary text-text-tertiary group-active:bg-black-500 border-2 border-transparent group-focus-visible/button:border-blue-500 group-focus-visible/button:shadow-[0_0_0_3px_rgba(66,181,220,0.30)] group-disabled/button:bg-system-disabled-black group-disabled/button:text-text-secondary">
              Book a demo
            </span>
            <span
              aria-hidden="true"
              className="flex items-center justify-center shrink-0 w-[3.6rem] [@media(hover:hover)]:-ml-[3.6rem] group-hover/button:ml-0 group-focus-visible/button:ml-0 transition-[margin] rounded-[1.2rem] h-[4rem] z-0 tablet:h-[4.2rem] bg-surface-tertiary text-text-tertiary group-focus-visible/button:border-2 group-focus-visible/button:border-blue-500 group-focus-visible/button:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Chevron Icon"
                className="block size-[2rem]"
              >
                <path
                  d="M7.69345 4.09943C8.9391 6.25004 10.7089 8.05064 12.8376 9.33325L13.0719 9.47421C13.2562 9.58525 13.3687 9.78513 13.3687 10.0003C13.3686 10.2154 13.2561 10.4147 13.0719 10.5258L12.8376 10.6667C10.7089 11.9493 8.93909 13.75 7.69345 15.9006L6.63135 15.2854C7.86108 13.1624 9.56324 11.3559 11.6006 10.0003C9.56325 8.64472 7.86108 6.83823 6.63135 4.71517L7.69345 4.09943Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </a>
        </div>
        <div className="flex flex-col flex-1 tablet:flex-none gap-[6.4rem] tablet:gap-x-[10rem] tablet:pr-[7.4rem] h-full tablet:justify-between">
          <div className="flex w-full flex-wrap justify-between gap-x-[0] gap-y-[0.5rem] tablet:gap-[7.4rem] desktop:gap-[15rem]">
            <dl className="min-w-[49%] tablet:min-w-[0]">
              <dt className="text-body-sm text-text-secondary mb-[1rem]">Company</dt>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a className={footerLinkClass} href="/book-a-demo">
                  Book a demo
                </a>
              </dd>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a
                  className={footerLinkClass}
                  href="/company#careers"
                >
                  Careers
                </a>
              </dd>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a className={footerLinkClass} href="/blog">
                  Insights
                </a>
              </dd>
            </dl>
            <dl className="min-w-[49%] tablet:min-w-[0]">
              <dt className="text-body-sm text-text-secondary mb-[1rem]">Product</dt>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a
                  className={footerLinkClass}
                  href="/documentation-backlog"
                >
                  Documentation workflow
                </a>
              </dd>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a
                  className={footerLinkClass}
                  href="/every-visit-ready"
                >
                  EVV &amp; visit records
                </a>
              </dd>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a
                  className={footerLinkClass}
                  href="/survey-ready"
                >
                  Survey readiness
                </a>
              </dd>
            </dl>
            <dl>
              <dt className="text-body-sm text-text-secondary mb-[1rem]">Legal</dt>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a className={footerLinkClass} href="/legal/privacy">
                  Privacy Policy
                </a>
              </dd>
              <dd className="text-body-sm text-text-primary mb-[0.7rem]">
                <a className={footerLinkClass} href="/legal/terms-of-service">
                  Terms of Service
                </a>
              </dd>
            </dl>
          </div>
          <div className="flex gap-[1.6rem] mt-auto tablet:mt-0 tablet:block">
            <BrandMark
              aria-hidden="true"
              className="size-[3.4rem] shrink-0 tablet:mb-[1.2rem] tablet:size-[4.3rem]"
            />
            <div className="flex flex-col items-start gap-[0.8rem]">
              <p className="text-label-lg">
                © 2026 Selmou. All rights reserved.
                <br />
                Built for care, everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
