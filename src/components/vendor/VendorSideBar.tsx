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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";
import { handleUserLogoutAction } from "@/features/auth/auth.action";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface UserDataType {
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  image: string | null;
}

export const VendorSidebar = ({ user }: { user: UserDataType }) => {
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
  ];

  const layoutName: string = "Vendor Dashboard";

  const handleLogout = async () => {
    return await handleUserLogoutAction();
  };

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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  variant="default"
                  size="lg"
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-amber-400/20 transition-all duration-300 group"
                >
                  <Avatar className="h-9 w-9 border border-zinc-700 group-hover:border-amber-400/50 transition-colors">
                    <AvatarImage
                      src={user?.image || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback className="bg-amber-400 text-black font-bold text-xs">
                      {user?.name?.substring(0, 2).toUpperCase() || "VD"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col flex-1 text-left overflow-hidden">
                    <span className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors">
                      {user?.name || "Alex Sterling"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider truncate">
                      {user?.role || "Vendor"}
                    </span>
                  </div>

                  <ChevronsUpDown className="size-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300 p-2 shadow-2xl rounded-xl"
              >
                <div className="px-2 py-2 mb-1">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    Account
                  </p>
                  <p className="text-sm text-zinc-100 truncate mt-1">
                    {user?.email || "alex@sterling.com"}
                  </p>
                </div>

                <DropdownMenuSeparator className="bg-zinc-800" />

                <Link href="/vendor/profile">
                  <DropdownMenuItem className="flex items-center gap-3 py-3 px-3 rounded-lg focus:bg-amber-400/10 focus:text-amber-400 cursor-pointer transition-colors group">
                    <User className="size-4 text-zinc-500 group-focus:text-amber-400" />
                    <span className="font-medium">Profile </span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator className="bg-zinc-800" />

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 px-3 rounded-lg focus:bg-red-500/10 focus:text-red-500 cursor-pointer transition-colors group text-red-400"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="size-4" />
                  <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
