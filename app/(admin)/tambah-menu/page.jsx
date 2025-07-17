"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import PageContainer from "@/layout/PageContainer";
import { redirect, useRouter } from "next/navigation";
import TambahMenu from "./_components/TambahMenu";
import Cookies from "js-cookie";

function TambahMenuPage() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("login");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <PageContainer>
      <TambahMenu />
    </PageContainer>
  );
}

export default TambahMenuPage;
