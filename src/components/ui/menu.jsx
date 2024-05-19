/* eslint-disable react/prop-types */
"use client";
import * as React from "react";
import * as MenuPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Menu = MenuPrimitive.Root;

const MenuTrigger = MenuPrimitive.Trigger;

const MenuClose = MenuPrimitive.Close;

const MenuPortal = MenuPrimitive.Portal;

const MenuOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <MenuPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
MenuOverlay.displayName = MenuPrimitive.Overlay.displayName;

const MenuVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-zinc-950",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

const MenuContent = React.forwardRef(
  ({ side = "left", className, children, ...props }, ref) => (
    <MenuPortal>
      <MenuOverlay />
      <MenuPrimitive.Content
        ref={ref}
        className={cn(MenuVariants({ side }), className)}
        {...props}
      >
        {children}
        <MenuPrimitive.Close className="absolute right-4 top-4 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800">
          <Cross2Icon className="w-7 h-7" />
          <span className="sr-only">Close</span>
        </MenuPrimitive.Close>
      </MenuPrimitive.Content>
    </MenuPortal>
  )
);
MenuContent.displayName = MenuPrimitive.Content.displayName;

const MenuHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
MenuHeader.displayName = "MenuHeader";

const MenuFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
MenuFooter.displayName = "MenuFooter";

const MenuTitle = React.forwardRef(({ className, ...props }, ref) => (
  <MenuPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-zinc-950 dark:text-zinc-50 text-start",
      className
    )}
    {...props}
  />
));
MenuTitle.displayName = MenuPrimitive.Title.displayName;

const MenuDescription = React.forwardRef(({ className, ...props }, ref) => (
  <MenuPrimitive.Description
    ref={ref}
    className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
MenuDescription.displayName = MenuPrimitive.Description.displayName;

export {
  Menu,
  MenuPortal,
  MenuOverlay,
  MenuTrigger,
  MenuClose,
  MenuContent,
  MenuHeader,
  MenuFooter,
  MenuTitle,
  MenuDescription,
};
