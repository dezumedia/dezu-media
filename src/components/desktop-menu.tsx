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
            <NavigationMenuContent className="p-4 gap-2 flex flex-wrap lg:w-[615px] overflow-hidden">
              {menu.pages.map((page) => (
                <NavigationMenuLink
                  key={page.name}
                  href={page.path}
                  className="inline-block w-full p-2 capitalize transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <h4 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                    {page.name}
                  </h4>
                  <p className="text-sm font-light text-zinc-700 dark:text-zinc-400">
                    {page.description}
                  </p>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      ))}
    </NavigationMenu>
  );
};

export default DesktopMenu;
