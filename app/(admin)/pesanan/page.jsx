"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import PageContainer from "@/layout/PageContainer";
import OrderList from "./_components/OrderList";

import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function PesananPage() {
  const { isAuth } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetOrdersQuery();

  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("login");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <PageContainer>
      {isLoading || !data ? <div>Loading...</div> : <OrderList order={data} />}
    </PageContainer>
  );
}

export default PesananPage;
