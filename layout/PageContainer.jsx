"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "@/components/main/SidebarApp";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

function PageContainer({ children }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <SidebarProvider>
      <SidebarApp />
      <div className="w-full flex flex-col">
        <div className="bg-base-200 p-6 flex justify-between items-center">
          <span>Welcome, Mario {user?.username}</span>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user?.imageProfile}
              alt="Foto Admin"
              className="object-cover"
            />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default PageContainer;
