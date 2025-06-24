import {
  SideBar,
  SideBarClose,
  SideBarContent,
  SideBarHeader,
  SideBarTitle,
  SideBarTrigger,
} from "@/components/ui/side-bar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import navbarRoutes from "../../data/navbar-routes.json";
const ThemeToggle = dynamic(() => import("./theme-toggle"), { ssr: false });
import {
  CookieIcon,
  Cross2Icon,
  Link2Icon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false });

const MobileMenu = (props: { classname: string }) => {
  const { classname } = props;
  const date = new Date();
  const pathName = usePathname();
  return (
    <SideBar>
      <SideBarTrigger className={(cn("focus:outline-none"), classname)}>
        <TextAlignLeftIcon width="30" height="30" />
      </SideBarTrigger>
      <SideBarContent className="flex justify-start">
        <SideBarHeader className="w-full flex justify-between">
          <div>
            <SideBarTitle className="flex justify-between items-center pb-2">
              <svg
                width="136"
                height="40"
                viewBox="0 0 136 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-16 w-full text-zinc-950 dark:text-zinc-50 bg-cover"
              >
                <path
                  d="M17.7545 47.896C8.0265 47.896 0.602503 40.344 0.602503 31.192C0.602503 21.336 7.3865 14.424 17.2425 14.424C20.4425 14.424 23.5145 15.576 25.8185 17.432L25.8825 0.727997H34.9705V31.192C34.9705 40.792 27.6745 47.896 17.7545 47.896ZM17.7545 39.32C22.4265 39.32 25.8825 35.672 25.8825 31.192C25.8825 26.712 22.4265 23 17.7545 23C13.0825 23 9.6905 26.712 9.6905 31.192C9.6905 35.672 13.0825 39.32 17.7545 39.32ZM55.0575 47.832C45.2015 47.832 37.7775 40.984 37.7775 30.872C37.7775 21.72 44.4335 14.168 54.2255 14.168C64.2735 14.168 70.0975 21.592 70.0975 30.232V32.92H46.5455C47.1855 37.144 50.4495 39.96 54.9935 39.96C58.4495 39.96 61.3295 38.296 62.8015 35.352L69.7775 38.872C67.0255 44.568 61.7775 47.832 55.0575 47.832ZM46.9295 27.864H61.0735C60.6895 24.6 58.0015 22.104 54.1615 22.104C50.1935 22.104 47.5695 24.664 46.9295 27.864ZM99.751 47H79.527C74.215 47 71.591 43.992 71.527 40.536C71.463 37.592 72.615 35.48 75.367 33.688L90.343 23.704C90.471 23.64 90.599 23.448 90.599 23.32C90.599 23 90.343 23 90.151 23H72.551V15.32H92.071C97.383 15.32 100.071 18.328 100.071 21.784C100.135 24.728 98.983 26.84 96.231 28.632L81.255 38.616C81.063 38.744 80.999 38.872 80.999 39.128C80.999 39.32 81.127 39.32 81.383 39.32H99.751V47ZM119.094 39.064C123.766 39.064 126.134 34.904 126.134 29.976V15.32H135.222V31.064C135.222 40.344 129.718 47.832 119.094 47.832C108.534 47.832 103.03 40.344 103.03 31.064V15.32H112.118V30.04C112.118 34.904 114.422 39.064 119.094 39.064Z"
                  fill="currentColor"
                />
              </svg>
              <SideBarClose className="focus:outline-none disabled:pointer-events-none">
                <Cross2Icon height={28} width={28} />
                <span className="sr-only">Close</span>
              </SideBarClose>
            </SideBarTitle>

            <Accordion
              type="single"
              collapsible
              className="w-full border-transparent"
            >
              {navbarRoutes.map((menu) => (
                <AccordionItem
                  value={`item-${menu.id}`}
                  className="px-2"
                  key={menu.id}
                >
                  <AccordionTrigger className="text-lg data-[state=open]:text-orange-500 [&[data-state=open]>svg]:text-orange-500">
                    {menu.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-1 text-start">
                    <h4 className="mb-2 font-semibold uppercase text-zinc-400">
                      sections
                    </h4>
                    <div className="flex flex-col gap-4">
                      {menu.pages.map((page) => (
                        <div
                          className="flex items-center gap-2 group"
                          key={page.name}
                        >
                          <Link2Icon
                            height={20}
                            width={20}
                            className={`group-hover:text-orange-500 ${
                              pathName == page.path
                                ? "text-orange-500"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          />
                          <a
                            href={page.path}
                            className={`text-base capitalize font-medium group-hover:text-orange-500 ${
                              pathName == page.path
                                ? "text-orange-500"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            {page.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a href="https://trakteer.id/dezu_media/tip">
                <Button
                  variant="outline"
                  className="w-full capitalize"
                  size="icon"
                >
                  <div className="flex justify-center items-center gap-1">
                    <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                    <span>trakteer</span>
                  </div>
                </Button>
              </a>
              <ThemeToggle className="w-full" />
            </div>
            <h5 className="text-[10px] text-center capitalize text-zinc-500 dark:text-zinc-400">
              &copy;{date.getFullYear()}{" "}
              <a className="underline" href="/">
                dezu media
              </a>{" "}
              All right reserved.
            </h5>
          </div>
        </SideBarHeader>
      </SideBarContent>
    </SideBar>
  );
};

export default MobileMenu;
