"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/main/Navbar";
import UserMenu from "./_components/UserMenu";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function UserMenuPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const cookieData = Cookies.get("user_bakmitepe");

    if (!cookieData) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(cookieData);
      if (user.role !== "KASIR") {
        // Jika bukan kasir, arahkan sesuai role
        if (user.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error("Gagal parsing cookie user_bakmitepe", error);
      router.push("/login");
    }
  }, []);
  const { data, isLoading } = useGetMenusQuery(undefined, {
    skip: !isAuthorized,
  });

  if (!isAuthorized || isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <UserMenu menu={data} />
    </>
  );
}

export default UserMenuPage;
