"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import PageContainer from "@/layout/PageContainer";
import IncomeList from "./_components/IncomeList";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";

function PemasukkanPage() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("login");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const { data, isLoading } = useGetOrdersQuery();

  return (
    <PageContainer>
      {isLoading || !data ? "...Loading" : <IncomeList order={data} />}
    </PageContainer>
  );
}

export default PemasukkanPage;
