import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [isHidden, setHidden] = useState(false);
  let lastScrollY = 0;
  const threshold = 100;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        if (currentScrollY > lastScrollY) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed flex items-center justify-between px-3 py-3 bg-white shadow-md w-full duration-500 ease-in-out
      ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <Sheet>
        <SheetTrigger className="focus:outline-none">
          <svg
            width="30"
            height="30"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </SheetTrigger>
        <SheetContent className="flex justify-start">
          <SheetHeader className="w-full">
            <SheetTitle className="pb-3 -mt-2 text-xl capitalize">
              dezu media
            </SheetTitle>
            <SheetDescription className="w-full">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="px-2">
                  <AccordionTrigger>test</AccordionTrigger>
                  <AccordionContent className="text-start">
                    <ul>
                      <li>ayam</li>
                      <li>gigi</li>
                      <li>roti</li>
                      <li>roti</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="px-2">
                  <AccordionTrigger>test</AccordionTrigger>
                  <AccordionContent className="text-start">
                    <ul>
                      <li>ayam</li>
                      <li>gigi</li>
                      <li>roti</li>
                      <li>roti</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="px-2">
                  <AccordionTrigger>test</AccordionTrigger>
                  <AccordionContent className="text-start">
                    <ul>
                      <li>ayam</li>
                      <li>gigi</li>
                      <li>roti</li>
                      <li>roti</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <a href="" className="max-w-20">
        <img className="" src="/logo/dezu-media.svg" alt="dezu-media" />
      </a>

      <a href="">
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
    </nav>
  );
};

export default Navbar;
