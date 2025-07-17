"use client";

import React, { useEffect } from "react";
import PageContainer from "@/layout/PageContainer";
import Dashboard from "./_components/Dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";

export const dynamic = "force-dynamic";

function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("login");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const { data, isLoading } = useGetOrdersQuery();
  const { data: menus, isLoading: isLoadingMenu } = useGetMenusQuery();
  if (isLoading || isLoadingMenu) {
    return <p>Loading..</p>;
  }

  return (
    <PageContainer>
      <Dashboard order={data} menus={menus} />
    </PageContainer>
  );
}

export default DashboardPage;
