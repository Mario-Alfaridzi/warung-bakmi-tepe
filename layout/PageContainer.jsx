"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "@/components/main/SidebarApp";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function PageContainer({ children }) {
  const router = useRouter();
  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    username: "",
    imageProfile: "",
  });

  useEffect(() => {
    const userCookieData = Cookies.get("user_bakmitepe");
    if (!userCookieData) {
      router.push("/login");
    }
    const userData = JSON.parse(userCookieData);
    setUser(userData);
  }, []);

  return (
    <SidebarProvider>
      <SidebarApp />
      <div className="w-full flex flex-col">
        <div className="bg-base-200 p-6 flex justify-between items-center">
          <span>Welcome, {user?.username}</span>
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
