import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CardOrder from "./CardOrder";
import { RupiahIRD } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUpdateOrderMutation } from "@/lib/redux/api/orderApi";

function DetailOrder({ open, setOpen, order }) {
  const router = useRouter();
  const [updateOrder, { isSuccess, data, error }] = useUpdateOrderMutation();

  const handleChangeStatus = async () => {
    const id = order.id;
    const updatedStatus = order.status === "Menunggu" ? "Diproses" : "Selesai";

    const updatedOrder = {
      customer_name: order.customer_name,
      table_number: order.table_number ?? 0,
      has_payed: order.has_payed,
      takeaway: order.takeaway,
      total_price: order.total_price,
      status: updatedStatus,
      order_list: order.order_list.map((item) => ({
        menuId: item.menu?.id || item.menuId || item.id, // pastikan menuId valid
        quantity: item.quantity,
      })),
    };

    const result = await updateOrder({ id, ...updatedOrder });

    if (result?.data) {
      toast.success("Success", {
        description: `Status pesanan diubah menjadi ${updatedStatus}`,
      });
      router.refresh();
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3 font-bold">Rincian Pesanan</DialogTitle>
          <DialogDescription className="flex flex-col gap-1 font-semibold">
            <span>Nomor Meja : {order.table_number}</span>
            <span>Nama Pemesan : {order.customer_name}</span>
            <span>
              Status Pembayaran :{" "}
              <Badge variant={order.has_payed ? "success" : "destructive"}>
                {order.has_payed ? "Sudah Bayar" : "Belum Bayar"}
              </Badge>
            </span>
            <span>
              Status Pesanan :{" "}
              <Badge
                variant={order.status === "Menunggu" ? "secondary" : "info"}
              >
                {order.status}
              </Badge>
            </span>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-52 w-auto">
          {order?.order_list?.length > 0
            ? order?.order_list.map((item) => (
                <CardOrder key={item.id} product={item} />
              ))
            : null}
        </ScrollArea>
        <DialogDescription className="flex justify-between font-bold text-black">
          <span>Total</span>
          <span>{RupiahIRD(order.total_price)},-</span>
        </DialogDescription>
        <hr />
        <DialogFooter className="flex-col">
          <Button
            variant={order.status === "Menunggu" ? "info" : "success"}
            onClick={handleChangeStatus}
            className="cursor-pointer"
          >
            {order.status === "Menunggu" ? "Proses" : "Selesaikan Pesanan"}
          </Button>
          <DialogClose asChild>
            <Button variant="destructive" className="cursor-pointer">
              Kembali
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DetailOrder;
