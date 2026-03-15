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
import { IconType } from "react-icons";
import {
  AiOutlineShop,
  AiOutlineCheckCircle,
  AiOutlineSetting,
  AiOutlineMessage,
} from "react-icons/ai";
import { TbLayoutDashboard, TbShoppingBag } from "react-icons/tb";

export interface SidebarItem {
  title: string;
  url: string;
  icon: IconType;
}

export const AdminSidebar = () => {
  const pathName = usePathname();

  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: TbLayoutDashboard,
    },
    {
      title: "Vendor Details",
      url: "/admin/details",
      icon: AiOutlineShop,
    },
    {
      title: "User Orders",
      url: "/admin/orders",
      icon: TbShoppingBag,
    },
    {
      title: "Vendor Approval",
      url: "/admin/approvals",
      icon: AiOutlineCheckCircle,
    },
    {
      title: "Product Requests",
      url: "/admin/requests",
      icon: AiOutlineMessage,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: AiOutlineSetting,
    },
  ];

  const layoutName: string = "Admin Dashboard";

  return (
    <Sidebar className="border-r border-zinc-800 bg-black text-zinc-400">
      <SidebarHeader className="p-2">
        {/* Logo/Name area matching the image */}
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-black">
            <span className="font-bold">A</span>
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
                const Icon = item.icon;
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
                        <Icon size={50} className="shrink-0" />
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
