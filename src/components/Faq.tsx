"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/data/faq";

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 42 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[4.2rem] h-[3.2rem] transition-transform duration-200 ease-out rotate-180 group-data-[expanded]:rotate-0"
      role="img"
      aria-label="Chevron Icon"
    >
      <path
        d="M13.9424 19.759C16.5148 18.269 18.6686 16.1521 20.2028 13.6058L20.3714 13.3255C20.5042 13.1051 20.7433 12.9706 21.0007 12.9706C21.258 12.9706 21.4964 13.1052 21.6293 13.3255L21.7979 13.6058C23.332 16.1521 25.486 18.269 28.0583 19.759L27.3225 21.0294C24.7831 19.5585 22.6221 17.5224 21.0007 15.0855C19.3792 17.5224 17.2184 19.5585 14.6789 21.0294L13.9424 19.759Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="flex flex-col justify-center items-center w-screen px-[1.6rem] pt-[16rem] pb-[10rem] desktop:pb-[16rem] bg-background-primary tablet:px-0"
    >
      <h2 className="text-heading-lg !leading-none mb-[3.2rem]">FAQ</h2>
      <div
        className="isolate w-full max-w-[68rem] tablet:max-w-none tablet:w-1/2 desktop:w-[30%] desktop:min-w-[54rem]"
        style={{ minHeight: 80 }}
      >
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const triggerId = `${baseId}-faq-trigger-${index}`;
          const panelId = `${baseId}-faq-panel-${index}`;

          return (
            <div
              key={item.question}
              data-expanded={isOpen ? "true" : undefined}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group w-full relative cursor-pointer flex gap-[3.2rem] justify-between items-start bg-surface-primary rounded-[16px] z-0 p-[1.6rem] tablet:p-[2.4rem] border-2 border-transparent data-[focus-visible-within=true]:z-10 data-[focus-visible-within=true]:border-blue-500 data-[focus-visible-within=true]:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]"
            >
              <div>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="z-[10] relative min-h-[3rem] w-full flex justify-between items-center gap-[1.6rem] desktop:gap-[3.2rem] outline-hidden bg-none border-[none] text-left text-body-md"
                >
                  {item.question}
                </button>
                <div
                  id={panelId}
                  role="group"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={cn("grid motion-reduce:transition-none")}
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:
                      "grid-template-rows .3s cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="pt-[0.4rem] desktop:pt-[0.8rem]">
                      <span className="text-body-sm text-text-secondary">
                        {item.answer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="rounded-[1.8rem] transition-colors duration-200 ease-out group-hover:bg-surface-secondary group-data-[expanded=true]:bg-surface-secondary group-data-[focus-visible-within=true]:bg-background-tertiary shrink-0"
              >
                <ChevronIcon />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
