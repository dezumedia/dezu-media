"use client";

import * as React from "react";
import * as SideBarPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const SideBar = SideBarPrimitive.Root;

const SideBarTrigger = SideBarPrimitive.Trigger;

const SideBarClose = SideBarPrimitive.Close;

const SideBarPortal = SideBarPrimitive.Portal;

const SideBarOverlay = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SideBarOverlay.displayName = SideBarPrimitive.Overlay.displayName;

const SideBarVariants = cva(
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

interface SideBarContentProps
  extends React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Content>,
    VariantProps<typeof SideBarVariants> {}

const SideBarContent = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Content>,
  SideBarContentProps
>(({ side = "left", className, children, ...props }, ref) => (
  <SideBarPortal>
    <SideBarOverlay />
    <SideBarPrimitive.Content
      ref={ref}
      className={cn(SideBarVariants({ side }), className)}
      {...props}
    >
      {children}
      <SideBarPrimitive.Close className="absolute right-4 top-4 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800">
        <Cross2Icon className="w-7 h-7" />
        <span className="sr-only">Close</span>
      </SideBarPrimitive.Close>
    </SideBarPrimitive.Content>
  </SideBarPortal>
));

SideBarContent.displayName = SideBarPrimitive.Content.displayName;

const SideBarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SideBarHeader.displayName = "SideBarHeader";

const SideBarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SideBarFooter.displayName = "SideBarFooter";

const SideBarTitle = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-zinc-950 dark:text-zinc-50 text-start",
      className
    )}
    {...props}
  />
));
SideBarTitle.displayName = SideBarPrimitive.Title.displayName;

const SideBarDescription = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Description
    ref={ref}
    className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
SideBarDescription.displayName = SideBarPrimitive.Description.displayName;

export {
  SideBar,
  SideBarPortal,
  SideBarOverlay,
  SideBarTrigger,
  SideBarClose,
  SideBarContent,
  SideBarHeader,
  SideBarFooter,
  SideBarTitle,
  SideBarDescription,
};
