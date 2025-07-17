"use client";

import React from "react";
import Cart from "./Cart";
import FormOrder from "./FormOrder";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MenuCart() {
  const router = useRouter();
  const { cart } = useCart();
  return (
    <div className="flex flex-col gap-3 p-6">
      <span className="font-semibold text-lg">Menu Anda</span>
      <div className="flex flex-col gap-2">
        {cart.length > 0 ? (
          <Table className="text-sm sm:text-base">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Gambar</TableHead>
                <TableHead>Nama Menu</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            {cart.map((item) => (
              <Cart key={item.id} product={item} />
            ))}
          </Table>
        ) : (
          <p className="text-xl text-center text-red-500">Keranjang Kosong</p>
        )}
      </div>
      <Button
        onClick={() => router.push("/user-menu")}
        className="w-auto sm:w-fit sm:self-center mt-5"
      >
        Tambah Menu Lainnya
      </Button>
      {cart.length > 0 && (
        <>
          <hr className="border-base-300 my-6" />
          <FormOrder />
        </>
      )}
    </div>
  );
}

export default MenuCart;
