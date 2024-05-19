import { useEffect, useState, useRef } from "react";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";

const Navbar = () => {
  const [isHidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const threshold = 100;

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
    <nav
      className={`fixed px-3 py-3 bg-white shadow-md w-full duration-500 ease-in-out
      ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center justify-between mx-auto lg:max-w-5xl">
        <MobileMenu classname="lg:hidden" />
        <a href="/" className="max-w-20">
          <img className="" src="/logo/dezu-media.svg" alt="dezu-media" />
        </a>
        <DesktopMenu classname="items-center hidden lg:flex" />
        <a href="/search">
          <svg
            width="30"
            height="30"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
