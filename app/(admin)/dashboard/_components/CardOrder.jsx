"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUpdateOrderMutation } from "@/lib/redux/api/orderApi";

function CardOrder({ item }) {
  const router = useRouter();
  const [updateOrder, { data, isSuccess }] = useUpdateOrderMutation();

  const handleChangeStatus = async () => {
    const id = item.id;
    const completedStatus = "Selesai";

    const updatedOrder = {
      customer_name: item.customer_name,
      table_number: item.table_number,
      has_payed: true,
      takeaway: item.takeaway,
      total_price: item.total_price,
      status: completedStatus,
      order_list: item.order_list.map((item) => ({
        menuId: item.menu?.id || item.menuId || item.id, // pastikan menuId valid
        quantity: item.quantity,
      })),
    };

    await updateOrder({ id, ...updatedOrder });

    if (isSuccess) {
      toast.success("Sukses", {
        description: `Pesanan ${completedStatus}`,
      });
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col gap-2 bg-base-300 p-3 rounded-md">
      <span className="text-center text-2xl text-base-200">
        Meja {item.table_number}
      </span>
      <Button
        onClick={handleChangeStatus}
        variant="secondary"
        className="rounded-md"
      >
        Selesai
      </Button>
    </div>
  );
}

export default CardOrder;
