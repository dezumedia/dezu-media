import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import navbarRoutes from "../data/navbar-routes.json";
import Image from "next/image";

const DesktopMenu = (props: { classname: string }) => {
  const { classname } = props;
  return (
    <NavigationMenu className={classname}>
      {navbarRoutes.map((menu) => (
        <NavigationMenuList key={menu.id}>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="capitalize">
              {menu.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 grid gap-2 grid-cols-2 lg:w-[590px] overflow-hidden">
              <Image
                src={menu.image}
                alt={menu.name}
                width={100}
                height={100}
                className="w-full h-auto bg-cover rounded-md"
              />
              <div>
                {menu.pages.map((page) => (
                  <NavigationMenuLink
                    key={page.name}
                    href={page.path}
                    className="inline-block w-full p-2 px-3 capitalize transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  >
                    <h4 className="text-lg font-semibold">{page.name}</h4>
                    <p className="text-sm font-light">{page.description}</p>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      ))}
    </NavigationMenu>
  );
};

export default DesktopMenu;
