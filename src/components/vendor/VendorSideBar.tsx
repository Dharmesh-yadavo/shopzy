"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LucideIcon,
  Package,
  Settings,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const VendorSidebar = () => {
  const pathName = usePathname();

  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: "/vendor",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/vendor/products",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/vendor/orders",
      icon: ClipboardList,
    },
    {
      title: "Settings",
      url: "/vendor/settings",
      icon: Settings,
    },
  ];

  const layoutName: string = "Vendor Dashboard";

  return (
    <Sidebar className="border-r border-zinc-800 bg-black text-zinc-400">
      <SidebarHeader className="p-2">
        {/* Logo/Name area matching the image */}
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-black">
            <span className="font-bold">V</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight leading-none">
              {layoutName}
            </span>
            <span className="text-xs text-zinc-500">Premium Store</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 px-2">
              {items.map((item) => {
                const active = pathName === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active} // Dynamic check
                      asChild
                      className={`h-12 px-4 rounded-lg font-semibold transition-colors ${
                        active
                          ? "bg-amber-400! text-black! shadow-lg shadow-amber-400/20"
                          : "text-stone-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <a href={item.url}>
                        <item.icon
                          className={active ? "text-black" : "text-zinc-500"}
                        />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* will have to pass details here  */}

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 px-3 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
          <Avatar className="h-10 w-10 border-2 border-amber-400/20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-amber-400 text-black font-bold">
              AS
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">
              Alex Sterling
            </span>
            <span className="text-xs text-zinc-500 truncate">Super Admin</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
