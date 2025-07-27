"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import PageContainer from "@/layout/PageContainer";
import { useRouter } from "next/navigation";
import TambahMenu from "./_components/TambahMenu";
import Cookies from "js-cookie";

function TambahMenuPage() {
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

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <TambahMenu />
    </PageContainer>
  );
}

export default TambahMenuPage;
