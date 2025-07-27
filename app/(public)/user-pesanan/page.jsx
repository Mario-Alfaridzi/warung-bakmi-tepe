"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/main/Navbar";
import UserPesanan from "./_components/UserPesanan";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function UserPesananPage() {
  const router = useRouter();
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
    } catch (error) {
      console.error("Gagal parsing cookie user_bakmitepe", error);
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <UserPesanan />
    </>
  );
}

export default UserPesananPage;
