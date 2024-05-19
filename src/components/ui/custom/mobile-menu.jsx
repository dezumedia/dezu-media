/* eslint-disable react/prop-types */
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuTitle,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import navbarRoutes from "../../../data/navbar-routes.json";

const MobileMenu = (props) => {
  const { classname } = props;
  return (
    <Menu>
      <MenuTrigger className={`focus:outline-none ${classname}`}>
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
      </MenuTrigger>
      <MenuContent className="flex justify-start">
        <MenuHeader className="w-full">
          <MenuTitle className="pb-3 -mt-2 text-xl capitalize ">
            dezu media
          </MenuTitle>
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
                  <div className="flex flex-col gap-2 text-lg capitalize text-zinc-800 dark:text-zinc-400">
                    {menu.pages.map((page) => (
                      <a href={page.path} key={page.name}>
                        {page.name}
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MenuHeader>
      </MenuContent>
    </Menu>
  );
};

export default MobileMenu;
