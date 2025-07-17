"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/components/general/InputField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RupiahIRD } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import {
  useCreateOrderMutation,
  useGetOrdersQuery,
} from "@/lib/redux/api/orderApi";
import { generateReceiptPDF } from "@/utils/generateReceiptPDF";

const formatDateTime = (date) => {
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

function PaymentModal({ name, table, takeaway }) {
  const { cart, clearCart, totalPrice } = useCart();

  const [open, setOpen] = useState(false); // formatted string
  const [value, setValue] = useState(""); // formatted string
  const [rawValue, setRawValue] = useState(0); // unformatted number
  const change = rawValue - totalPrice;

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // remove non-digits
    const number = parseInt(raw || "0", 10);
    setRawValue(number);
    setValue(number === 0 ? "" : RupiahIRD(number));
  };

  const ListCard = ({ product }) => {
    return (
      <div className="grid grid-cols-3 text-sm sm:text-base py-1 border-b">
        <span className="text-left">{product.quantity}x</span>
        <span className="text-left">{product.name}</span>
        <span className="text-end">
          {RupiahIRD(product.price * product.quantity)}
        </span>
      </div>
    );
  };

  const [createOrder] = useCreateOrderMutation();
  const parseRupiah = (rupiah) => {
    if (typeof rupiah === "string") {
      return Number(rupiah.replace(/[^0-9]/g, ""));
    }
    return rupiah;
  };

  const handlePlaceOrder = async () => {
    const cash = parseRupiah(value);
    const payload = {
      customer_name: name,
      table_number: !takeaway ? table : null,
      order_list: cart,
      has_payed: true,
      total_price: totalPrice,
      takeaway,
      cash,
      change,
    };

    if (rawValue < totalPrice) {
      return toast.success("Error", {
        description: "Nominal kurang dari Total Harga",
      });
    }

    await createOrder(payload).unwrap();
    await generateReceiptPDF(payload);

    toast.success("Sukses", {
      description: "Berhasil membuat pesanan",
    });

    setTimeout(() => {
      clearCart();
      setOpen(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Pesan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className={"text-center font-semibold text-lg"}>
            Bakmi Tepe
          </span>
          <DialogTitle className={"text-center"}>Rincian Pesanan</DialogTitle>
          <span className={"text-center"}>{formatDateTime(new Date())}</span>
        </DialogHeader>
        <ScrollArea className="w-auto flex items-center justify-center mx-5">
          <div className="grid grid-cols-3 text-sm sm:text-base py-1 border-b">
            <span className="text-left">Jumlah</span>
            <span className="text-left">Nama</span>
            <span className="text-end">Harga</span>
          </div>
          {cart.length > 0 ? (
            cart.map((item) => <ListCard key={item.id} product={item} />)
          ) : (
            <p>Keranjang Kosong</p>
          )}
        </ScrollArea>
        <DialogDescription className="flex justify-between font-bold text-black  mx-5">
          <span>Total</span>
          <span>{RupiahIRD(totalPrice)},-</span>
        </DialogDescription>
        <hr />
        <InputField
          type="text"
          id="cash"
          name="cash"
          label="masukkan nominal uang :"
          placeholder="Rp."
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          id="cash"
          name="cash"
          label="jumlah kembalian : "
          placeholder="Rp."
          inputMode="numeric"
          value={RupiahIRD(change)}
          disabled
        />
        <DialogFooter className="flex-col">
          <DialogClose asChild>
            <Button variant="destructive">Batal</Button>
          </DialogClose>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
            disabled={rawValue < totalPrice}
          >
            Bayar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
