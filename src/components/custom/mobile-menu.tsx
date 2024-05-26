import {
  SideBar,
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
import ThemeToggle from "./theme-toggle";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";

const MobileMenu = (props: { classname: string }) => {
  const { classname } = props;
  return (
    <SideBar>
      <SideBarTrigger className={`focus:outline-none ${classname}`}>
        <TextAlignLeftIcon width="30" height="30" />
      </SideBarTrigger>
      <SideBarContent className="flex justify-start">
        <SideBarHeader className="w-full">
          <SideBarTitle className="pb-3 -mt-1 text-lg capitalize">
            dezu media
          </SideBarTitle>
          <Accordion type="single" collapsible className="w-full">
            {navbarRoutes.map((menu) => (
              <AccordionItem
                value={`item-${menu.id}`}
                className="px-2"
                key={menu.id}
              >
                <AccordionTrigger>{menu.name}</AccordionTrigger>
                <AccordionContent className="px-1 text-start">
                  <h4 className="mb-2 font-semibold uppercase text-zinc-400">
                    sections
                  </h4>
                  <div className="flex flex-col gap-3">
                    {menu.pages.map((page) => (
                      <a
                        href={page.path}
                        key={page.name}
                        className="text-base capitalize text-zinc-800 dark:text-zinc-300 font-medium"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <ThemeToggle className="absolute bottom-6 right-6" />
        </SideBarHeader>
      </SideBarContent>
    </SideBar>
  );
};

export default MobileMenu;
