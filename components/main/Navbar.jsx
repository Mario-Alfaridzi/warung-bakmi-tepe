"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  return (
    <div className="bg-base-200 flex justify-between items-center px-6 py-4">
      <h1 className="text-lg font-semibold">
        <Link href="/portal">
          <Image src="/assets/images/logo.png" alt="Logo" width={120} height={40} />
        </Link>
      </h1>
      {pathname === "/user-menu" && <Link href="/user-pesanan">
      <Image src="/assets/images/keranjang.png" alt="Logo" width={100} height={40} />
      </Link>}
    </div>
  );
}

export default Navbar;
