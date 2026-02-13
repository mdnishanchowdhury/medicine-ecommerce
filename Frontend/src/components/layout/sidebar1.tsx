"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { adminRoutes } from "@/routes/adminRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { sellerRoutes } from "@/routes/sellerRouter";
import { Roles } from "@/constants/roles";
import { LogOut, User } from "lucide-react";
import { Route } from "@/types/menuBar";
import { authClient } from "@/lib/auth-client";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; email?: string; name?: string }
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  // Logout Handler
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  // Role based route selection
  let routes: Route[] = [];
  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={`${item.title}-${index}`}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={`transition-all duration-200 ${isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "hover:bg-slate-100"
                          }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          {Icon && <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-500"}`} />}
                          <div className="flex flex-col">
                            <span className="truncate">{item.title}</span>
                            {item.description && (
                              <span className="text-[10px] text-muted-foreground leading-none font-normal">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer Section with User Profile & Logout */}
      <SidebarFooter className="border-t border-slate-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Clean Logout Button */}
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold h-11 transition-all"
            >
              <LogOut size={20} />
              <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}