"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import PageContainer from "@/layout/PageContainer";
import StokMenu from "./_components/StokMenu";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function StokMenuPage() {
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
        // Redirect kalau bukan ADMIN
        if (user.role === "KASIR") {
          router.push("/user-menu");
        } else {
          router.push("/login");
        }
        return;
      }

      setIsAuthorized(true);
    } catch (err) {
      console.error("Gagal parsing cookie user_bakmitepe", err);
      router.push("/login");
    }
  }, []);

  const { data: menu, isLoading } = useGetMenusQuery(undefined, {
    skip: !isAuthorized,
  });

  if (!isAuthorized || isLoading || !menu) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <StokMenu menu={menu} />
    </PageContainer>
  );
}

export default StokMenuPage;
