/**
 * Sidebar Component - Tailored from shadcn/ui sidebar
 * HAI3 customization: Simplified for desktop-only collapsible navigation
 * Removed: mobile support, keyboard shortcuts, cookie persistence
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"aside"> & {
    collapsed?: boolean
  }
>(({ collapsed = false, className, children, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      data-state={collapsed ? "collapsed" : "expanded"}
      data-collapsible={collapsed ? "icon" : ""}
      className={cn(
        "group flex flex-col border-r transition-[width] duration-200 ease-linear",
        "bg-mainMenu text-mainMenu-foreground",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      // HAI3 customization: gap and padding use rem-based spacing for theme scaling
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden p-2",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    // HAI3 customization: gap-1 (0.25rem) scales with theme root font size
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  // HAI3 customization: All sizing uses rem-based Tailwind classes for theme responsiveness
  "peer/menu-button flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>span:last-child]:overflow-hidden [&>svg]:size-5 [&>svg]:shrink-0 text-mainMenu-foreground hover:bg-mainMenu-hover data-[active=true]:bg-mainMenu-selected data-[active=true]:text-white data-[active=true]:font-medium",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--border))] hover:bg-mainMenu-hover",
      },
      size: {
        // HAI3 customization: All heights use rem-based Tailwind classes (h-10=2.5rem, h-7=1.75rem, h-12=3rem)
        default: "h-10 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        title={tooltip}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuIcon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    // HAI3 customization: size-5 (1.25rem) scales with theme root font size
    // Force SVG children to fill container and inherit the rem-based size
    className={cn("size-5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full", className)}
    {...props}
  />
))
SidebarMenuIcon.displayName = "SidebarMenuIcon"

const SidebarMenuLabel = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
SidebarMenuLabel.displayName = "SidebarMenuLabel"

export {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuLabel,
  SidebarMenuIcon,
}
