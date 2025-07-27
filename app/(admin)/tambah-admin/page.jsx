"use client";

import React, { useEffect, useState } from "react";
import PageContainer from "@/layout/PageContainer";
import AddAdmin from "./_components/AddAdmin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const TambahAdmin = () => {
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
    } catch (error) {
      console.error("Gagal parsing cookie user_bakmitepe", error);
      router.push("/login");
    }
  }, []);

  if (!isAuthorized) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <AddAdmin />
    </PageContainer>
  );
};

export default TambahAdmin;
