"use client";

import React, { useEffect, useState } from "react";
import PageContainer from "@/layout/PageContainer";
import Dashboard from "./_components/Dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";

export const dynamic = "force-dynamic";

function DashboardPage() {
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

      if (user.role !== "ADMIN") {
        // Jika bukan admin, arahkan sesuai role
        if (user.role === "KASIR") {
          router.push("/user-menu");
        } else {
          router.push("/login");
        }
      } else {
        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Gagal parsing cookie login", err);
      router.push("/login");
    }
  }, []);

  const { data, isLoading } = useGetOrdersQuery(undefined, {
    skip: !isAuthorized,
  });
  const { data: menus, isLoading: isLoadingMenu } = useGetMenusQuery(
    undefined,
    {
      skip: !isAuthorized,
    }
  );

  if (!isAuthorized || isLoading || isLoadingMenu) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <Dashboard order={data} menus={menus} />
    </PageContainer>
  );
}

export default DashboardPage;
