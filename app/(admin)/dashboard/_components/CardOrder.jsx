'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUpdateOrderMutation } from '@/lib/redux/api/orderApi';

function CardOrder({ item }) {
  const router = useRouter();
  const [updateOrder, { data, isSuccess }] = useUpdateOrderMutation();

  const handleChangeStatus = async () => {
    const orderId = item.orderId;
    const completedStatus = 'Selesai';

    const updatedOrder = {
      customerName: item.customerName,
      tableNumber: item.tableNumber,
      hasPayed: true,
      takeaway: item.takeaway,
      totalPrice: item.totalPrice,
      status: completedStatus,
      orderItems: item.orderItems.map((item) => ({
        menuId: item.menu?.menuId || item.menuId || item.id,
        quantity: item.quantity,
      })),
    };
    console.log({ orderId, ...updatedOrder });
    await updateOrder({ orderId, ...updatedOrder });

    if (isSuccess) {
      toast.success('Sukses', {
        description: `Pesanan ${completedStatus}`,
      });
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col gap-2 bg-base-300 p-3 rounded-md">
      <span className="text-center text-2xl text-base-200">Meja {item.tableNumber}</span>
      <Button onClick={handleChangeStatus} variant="secondary" className="rounded-md">
        Selesai
      </Button>
    </div>
  );
}

export default CardOrder;
