import React from "react";
import Link from "next/link";

function PortalPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">
      <Link
        href="/login"
        className="w-[256px] p-2 bg-base-200 hover:bg-base-100 transition-all duration-200 ease-linear text-center rounded-md"
      >
        Admin Menu
      </Link>
      <Link
        href="/user-menu"
        className="w-[256px] p-2 bg-base-200 hover:bg-base-100 transition-all duration-200 ease-linear text-center rounded-md"
      >
        Kasir Pemesanan
      </Link>
    </div>
  );
}

export default PortalPage;
