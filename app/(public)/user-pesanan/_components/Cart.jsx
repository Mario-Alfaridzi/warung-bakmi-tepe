"use client";

import React from "react";
import Image from "next/image";
import { RupiahIRD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function Cart({ product }) {
  const { updateQuantity, removeItem, updateNote } = useCart();

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        </TableCell>
        <TableCell>
          <div>{product.name}</div>
          <input
            type="text"
            className="mt-1 text-xs border rounded px-2 py-1 w-full"
            placeholder="Catatan (opsional)"
            value={product.note || ""}
            onChange={(e) => updateNote(product.id, e.target.value)}
          />
        </TableCell>
        <TableCell>{RupiahIRD(product.price)}</TableCell>
        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Button
              onClick={() => updateQuantity(product, "min")}
              className="px-2 cursor-pointer"
            >
              -
            </Button>
            <span className="w-6 text-center">{product.quantity}</span>
            <Button
              onClick={() => updateQuantity(product, "plus")}
              className="px-2 cursor-pointer"
            >
              +
            </Button>
          </div>
        </TableCell>
        <TableCell className="text-center">
          <Button onClick={() => removeItem(product)} variant="destructive">
            Hapus
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default Cart;
