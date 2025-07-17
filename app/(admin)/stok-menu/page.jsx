"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import PageContainer from "@/layout/PageContainer";
import StokMenu from "./_components/StokMenu";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function StokMenuPage() {
  const { data: menu, isLoading } = useGetMenusQuery();

  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("login");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <PageContainer>
      {isLoading || !menu ? "Loading..." : <StokMenu menu={menu} />}
    </PageContainer>
  );
}

export default StokMenuPage;
