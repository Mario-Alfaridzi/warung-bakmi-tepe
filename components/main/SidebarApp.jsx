"use client";

import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/lib/redux/api/authApi";

function SidebarApp() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Pesanan",
      url: "/pesanan",
    },
    {
      title: "Stok Menu",
      url: "/stok-menu",
    },
    {
      title: "Tambah Menu",
      url: "/tambah-menu",
    },
    {
      title: "Pemasukkan",
      url: "/pemasukkan",
    },
  ];

  const logout = async () => {
    dispatch(logoutUser());
    router.push("/login");
    Cookies.remove("login");
  };
  return (
    <Sidebar>
      <SidebarHeader className="p-6 flex items-center">
        <Link href="/portal">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={120}
            height={40}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-6 gap-11">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => {
                const isCurrent = item.url === pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        "hover:bg-base-300 hover:text-base-200 rounded-md",
                        isCurrent && "bg-base-300 text-base-200",
                        !isCurrent && "bg-base-200 text-base-300"
                      )}
                      asChild
                    >
                      <a
                        href={item.url}
                        className="flex justify-center text-sm"
                      >
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="flex justify-center bg-base-200 text-base-300 hover:bg-base-300 hover:text-base-200 rounded-none text-sm cursor-pointer"
                >
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SidebarApp;
