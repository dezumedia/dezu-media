"use client";

import { useEffect, useState, useRef } from "react";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import ThemeToggle from "./theme-toggle";
import { Button } from "../ui/button";
import { CaretUpIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  const [isHidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const threshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
        if (currentScrollY > lastScrollY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return (
    <>
      <div className="relative mb-[65px] xl:mb-20 z-50 select-none">
        <nav
          className={`fixed top-0 px-3 py-3 bg-white dark:bg-zinc-950 shadow-sm w-full duration-500 ease-in-out
        ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
        >
          <div className="flex items-center justify-between desktop-w">
            <MobileMenu classname="lg:hidden" />
            <a href="/">
              <svg
                width="136"
                height="40"
                viewBox="0 0 136 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-20 text-zinc-950 dark:text-zinc-50 bg-cover"
              >
                <path
                  d="M17.7545 47.896C8.0265 47.896 0.602503 40.344 0.602503 31.192C0.602503 21.336 7.3865 14.424 17.2425 14.424C20.4425 14.424 23.5145 15.576 25.8185 17.432L25.8825 0.727997H34.9705V31.192C34.9705 40.792 27.6745 47.896 17.7545 47.896ZM17.7545 39.32C22.4265 39.32 25.8825 35.672 25.8825 31.192C25.8825 26.712 22.4265 23 17.7545 23C13.0825 23 9.6905 26.712 9.6905 31.192C9.6905 35.672 13.0825 39.32 17.7545 39.32ZM55.0575 47.832C45.2015 47.832 37.7775 40.984 37.7775 30.872C37.7775 21.72 44.4335 14.168 54.2255 14.168C64.2735 14.168 70.0975 21.592 70.0975 30.232V32.92H46.5455C47.1855 37.144 50.4495 39.96 54.9935 39.96C58.4495 39.96 61.3295 38.296 62.8015 35.352L69.7775 38.872C67.0255 44.568 61.7775 47.832 55.0575 47.832ZM46.9295 27.864H61.0735C60.6895 24.6 58.0015 22.104 54.1615 22.104C50.1935 22.104 47.5695 24.664 46.9295 27.864ZM99.751 47H79.527C74.215 47 71.591 43.992 71.527 40.536C71.463 37.592 72.615 35.48 75.367 33.688L90.343 23.704C90.471 23.64 90.599 23.448 90.599 23.32C90.599 23 90.343 23 90.151 23H72.551V15.32H92.071C97.383 15.32 100.071 18.328 100.071 21.784C100.135 24.728 98.983 26.84 96.231 28.632L81.255 38.616C81.063 38.744 80.999 38.872 80.999 39.128C80.999 39.32 81.127 39.32 81.383 39.32H99.751V47ZM119.094 39.064C123.766 39.064 126.134 34.904 126.134 29.976V15.32H135.222V31.064C135.222 40.344 129.718 47.832 119.094 47.832C108.534 47.832 103.03 40.344 103.03 31.064V15.32H112.118V30.04C112.118 34.904 114.422 39.064 119.094 39.064Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <DesktopMenu classname="items-center hidden lg:flex" />
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className="text-zinc-950 dark:text-zinc-50 bg-transparent hover:bg-transparent shadow-none dark:bg-transparent dark:hover:bg-transparent dark:shadow-none"
              >
                <MagnifyingGlassIcon width="30" height="30" />
              </Button>
              <ThemeToggle className="hidden lg:flex" />
            </div>
          </div>
        </nav>
      </div>

      <Button
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 z-50"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <CaretUpIcon height={20} width={20} />
      </Button>
    </>
  );
};

export default Navbar;
