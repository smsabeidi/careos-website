"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BrandMark from "@/components/BrandMark";

export default function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isLegalPage = pathname.startsWith("/legal/");

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="flex w-max p-0 fixed left-1/2 top-[1.6rem] z-10 -translate-x-1/2"
    >
      <div className="absolute pointer-events-none h-[5.2rem] w-[calc(100%_+_8px)] top-[-4px] left-[-4px] desktop:h-[5.6rem] desktop:w-[calc(100%_+_12px)] desktop:top-[-6px] desktop:left-[-6px] rounded-[1.6rem] border border-solid border-white/10 bg-[rgba(227,221,207,0.4)] backdrop-blur-[13px]"></div>
      <div
        aria-hidden="true"
        className="absolute pointer-events-none bg-white rounded-[12px] h-[4.4rem]"
        style={{ width: 0 }}
      ></div>
      <a
        aria-current={pathname === "/" ? "page" : undefined}
        className="relative group hover:no-underline outline-hidden h-[4.4rem]"
        aria-label="Selmou home"
        href="/"
      >
        <span className={cn("nav-item-hover absolute z-0 top-0 left-0 w-full h-full rounded-[12px] transition-[background-color] duration-300 ease group-active:bg-surface-pressed group-hover:bg-white group-focus-visible:border-2 group-focus-visible:border-blue-500 group-focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]", (pathname === "/" || isLegalPage) && "bg-white")}></span>
        <div className="nav-item w-full h-full z-1 px-[1.4rem] flex items-center relative text-nav leading-none transition-colors duration-300 ease group-hover:text-text-primary group-focus-visible:text-text-primary group-active:text-white">
          <BrandMark
            aria-hidden="true"
            className="size-[2.4rem] shrink-0"
          />
          <span
            className="hidden overflow-hidden border-box sm:inline-block"
            style={{
              width: collapsed ? 0 : 53,
              opacity: collapsed ? 0 : 1,
              transition:
                "width .4s cubic-bezier(.22,1,.36,1), opacity .3s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <svg
              viewBox="0 0 47 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <title>Selmou wordmark</title>
              <path d="M0 11.4437C1.15885 11.4437 1.57532 11.0997 1.57532 10.2124V2.60742C1.57532 1.72017 1.14075 1.37614 0 1.37614V0.525106H5.41402V1.37614C3.96545 1.37614 3.45846 1.72017 3.45846 2.66174V11.2083H6.04777C8.18441 11.2083 8.96301 10.4659 9.56055 8.4198H10.4659L9.63298 12.2947H0V11.4437Z"></path>
              <path d="M18.3421 10.828L18.4869 11.3169C17.8351 12.1861 17.3643 12.4939 16.7668 12.4939C15.9157 12.4939 15.4449 11.9145 15.3182 11.0997C14.5396 12.1136 13.8334 12.4939 13.0367 12.4939C11.8959 12.4939 11.1717 11.6791 11.1717 10.647C11.1717 9.59676 11.8416 8.96301 13.1815 8.4198L15.282 7.58687V6.8988C15.282 5.83049 14.7569 5.17863 13.7429 5.17863C13.0005 5.17863 12.3486 5.55888 11.6968 6.50045L11.063 6.04777C12.0951 4.38192 13.2178 3.78438 14.4128 3.78438C15.9881 3.78438 17.0021 4.87081 17.0021 6.64531V10.5202C17.0021 10.9548 17.147 11.2264 17.5816 11.2264C17.8532 11.2264 18.0524 11.0997 18.3421 10.828ZM13.8877 11.1721C14.3042 11.1721 14.775 10.991 15.282 10.5564V8.58277L14.0688 8.83626C13.1997 9.03544 12.8194 9.50623 12.8194 10.1581C12.8194 10.8462 13.3264 11.1721 13.8877 11.1721Z"></path>
              <path d="M22.0938 6.93502L23.7234 7.55066C24.9909 8.02144 25.7152 8.78194 25.7152 9.9408C25.7152 11.3894 24.5744 12.4939 22.8905 12.4939C21.967 12.4939 21.1522 12.1499 20.5728 11.6067L19.6493 12.4034H19.2691L19.0699 9.37948H19.8485C20.4641 10.828 21.4419 11.5342 22.6189 11.5342C23.4699 11.5342 24.0674 11.1178 24.0674 10.3754C24.0674 9.90458 23.8139 9.45191 22.9629 9.10787L21.4781 8.52844C20.0658 7.96712 19.4139 7.22473 19.4139 6.15641C19.4139 4.70785 20.6452 3.78438 22.1481 3.78438C22.981 3.78438 23.5967 4.0922 24.0674 4.61731L24.9909 3.83871H25.3531V6.55477H24.5744C24.0131 5.1062 23.2707 4.70785 22.4378 4.70785C21.5506 4.70785 21.0255 5.16052 21.0255 5.81238C21.0255 6.30127 21.3152 6.64531 22.0938 6.93502Z"></path>
              <path d="M29.8522 6.93502L31.4819 7.55066C32.7494 8.02144 33.4737 8.78194 33.4737 9.9408C33.4737 11.3894 32.3329 12.4939 30.649 12.4939C29.7255 12.4939 28.9107 12.1499 28.3312 11.6067L27.4078 12.4034H27.0275L26.8284 9.37948H27.607C28.2226 10.828 29.2004 11.5342 30.3773 11.5342C31.2284 11.5342 31.8259 11.1178 31.8259 10.3754C31.8259 9.90458 31.5724 9.45191 30.7214 9.10787L29.2366 8.52844C27.8242 7.96712 27.1724 7.22473 27.1724 6.15641C27.1724 4.70785 28.4037 3.78438 29.9066 3.78438C30.7395 3.78438 31.3551 4.0922 31.8259 4.61731L32.7494 3.83871H33.1115V6.55477H32.3329C31.7716 5.1062 31.0292 4.70785 30.1963 4.70785C29.309 4.70785 28.7839 5.16052 28.7839 5.81238C28.7839 6.30127 29.0736 6.64531 29.8522 6.93502Z"></path>
              <path d="M36.651 2.10042C36.0354 2.10042 35.5827 1.66585 35.5827 1.05021C35.5827 0.452677 36.0354 0 36.651 0C37.2667 0 37.7375 0.452677 37.7375 1.05021C37.7375 1.66585 37.2667 2.10042 36.651 2.10042ZM34.4601 11.5342C35.4741 11.5342 35.7457 11.335 35.7457 10.2667V5.81238L34.5506 5.48645V4.92513L36.9045 3.94735H37.4659V10.7194C37.4659 11.3532 37.7375 11.5342 38.6971 11.5342V12.2947H34.4601V11.5342Z"></path>
              <path d="M46.4688 9.56055L46.9576 9.9408C46.1428 11.6067 44.9659 12.4939 43.3724 12.4939C40.928 12.4939 39.5337 10.6108 39.5337 8.22062C39.5337 5.72184 41.2358 3.80249 43.4811 3.80249C45.4366 3.80249 46.7404 5.14242 46.7404 7.33337V7.42391H41.2358V7.58687C41.2358 9.48812 42.2317 10.9005 44.1148 10.9005C45.1288 10.9005 45.8893 10.4116 46.4688 9.56055ZM43.1914 4.67163C42.2317 4.65352 41.5074 5.39592 41.3082 6.59098H44.8572C44.7667 5.32349 44.1329 4.67163 43.1914 4.67163Z"></path>
            </svg>
            <span className="ml-[0.6rem] font-heading text-[1.55rem] leading-none tracking-[-0.02em]">
              Selmou
            </span>
          </span>
        </div>
      </a>
      <a
        aria-current={pathname === "/company" ? "page" : undefined}
        className="relative group hover:no-underline outline-hidden h-[4.4rem]"
        href="/company"
      >
        <span className={cn("nav-item-hover absolute z-0 top-0 left-0 w-full h-full rounded-[12px] transition-[background-color] duration-300 ease group-active:bg-surface-pressed group-hover:bg-white group-focus-visible:border-2 group-focus-visible:border-blue-500 group-focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]", (pathname === "/company" || isLegalPage) && "bg-white")}></span>
        <div className="nav-item w-full h-full z-1 px-[1.4rem] flex items-center relative text-nav leading-none transition-colors duration-300 ease group-hover:text-text-primary group-focus-visible:text-text-primary group-active:text-white">
          Company
        </div>
      </a>
      <a
        aria-current={pathname === "/book-a-demo" ? "page" : undefined}
        className="relative group hover:no-underline outline-hidden h-[4.4rem]"
        href="/book-a-demo"
      >
        <span className={cn("nav-item-hover absolute z-0 top-0 left-0 w-full h-full rounded-[12px] transition-[background-color] duration-300 ease group-active:bg-surface-pressed group-hover:bg-white group-focus-visible:border-2 group-focus-visible:border-blue-500 group-focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]", (pathname === "/book-a-demo" || isLegalPage) && "bg-white")}></span>
        <div className="nav-item w-full h-full z-1 px-[1.4rem] flex items-center relative text-nav leading-none transition-colors duration-300 ease group-hover:text-text-primary group-focus-visible:text-text-primary group-active:text-white">
          Demo
        </div>
      </a>
      <a
        className="relative group hover:no-underline outline-hidden h-[4.4rem]"
        href="/book-a-demo"
      >
        <span className="nav-item-hover absolute z-0 top-0 left-0 w-full h-full rounded-[12px] transition-[background-color] duration-300 ease group-active:bg-surface-pressed group-hover:bg-white group-focus-visible:border-2 group-focus-visible:border-blue-500 group-focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]"></span>
        <div className="nav-item w-full h-full z-1 px-[1.4rem] flex items-center relative text-nav leading-none text-text-primary transition-colors duration-300 ease group-hover:text-text-primary group-focus-visible:text-text-primary group-active:text-white">
          <span className="sm:hidden">Access</span>
          <span className="hidden sm:inline">Request access</span>
        </div>
      </a>
    </nav>
  );
}
