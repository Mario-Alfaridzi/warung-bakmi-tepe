"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Navbar from "@/components/main/Navbar";
import UserMenu from "./_components/UserMenu";
import { useGetMenusQuery } from "@/lib/redux/api/menuApi";

function UserMenuPage() {
  const { data } = useGetMenusQuery();
  if (!data) return;

  return (
    <>
      <Navbar />
      <UserMenu menu={data} />
    </>
  );
}

export default UserMenuPage;
