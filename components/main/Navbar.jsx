"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/lib/redux/api/authApi";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(logoutUser());
    router.push("/login");
  };
  return (
    <div className="bg-base-200 flex justify-between items-center px-6 py-4">
      <h1 className="text-lg font-semibold">
        <Link href="/portal">
          <Image src="/logo-bakmi.png" alt="Logo" width={120} height={40} />
        </Link>
      </h1>
      <div className="flex items-center gap-5">
        <LogOut
          className="w-20 text-red-600 cursor-pointer hover:text-red-800"
          size={60}
          onClick={logout}
        />

        {pathname === "/user-menu" && (
          <Link href="/user-pesanan">
            <Image
              src="/assets/images/keranjang.png"
              alt="Logo"
              width={100}
              height={40}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
