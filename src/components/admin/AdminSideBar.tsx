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
import { Avatar, AvatarFallback } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import {
  AiOutlineShop,
  AiOutlineCheckCircle,
  AiOutlineSetting,
  AiOutlineMessage,
} from "react-icons/ai";
import { TbLayoutDashboard, TbShoppingBag } from "react-icons/tb";
import Image from "next/image";

export interface SidebarItem {
  title: string;
  url: string;
  icon: IconType;
}

interface UserDataType {
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  image: string | null;
}

export const AdminSidebar = ({ user }: { user: UserDataType }) => {
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
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: AiOutlineSetting,
    // },
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="default"
              size="lg"
              className="w-full flex items-center gap-3 p-2 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-amber-400/20 transition-all duration-300 group"
            >
              <div className="h-9 w-9 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    height={36}
                    width={36}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="bg-amber-400 text-black font-black text-xs uppercase">
                      {user?.name?.substring(0, 2) || "VD"}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              <div className="flex flex-col flex-1 text-left overflow-hidden">
                <span className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors">
                  {user?.name || "Alex Sterling"}
                </span>
                <span className="text-[10px] text-zinc-500 font-medium  tracking-wider truncate">
                  {user?.email}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
