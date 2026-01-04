import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import CardOrder from './CardOrder';
import { RupiahIRD } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUpdateOrderMutation } from '@/lib/redux/api/orderApi';

function DetailOrder({ open, setOpen, order }) {
  const router = useRouter();
  const [updateOrder, { isSuccess, data, error }] = useUpdateOrderMutation();

  const handleChangeStatus = async () => {
    const orderId = order.orderId;
    const updatedStatus = order.status === 'Menunggu' ? 'Diproses' : 'Selesai';

    const updatedOrder = {
      customerName: order.customerName,
      tableNumber: order.tableNumber ?? 0,
      hasPayed: order.hasPayed,
      takeaway: order.takeaway,
      totalPrice: order.totalPrice,
      status: updatedStatus,
      orderItems: order.orderItems.map((item) => ({
        menuId: item.menu?.menuId || item.menuId || item.menuId, // pastikan menuId valid
        quantity: item.quantity,
      })),
    };

    const result = await updateOrder({ orderId, ...updatedOrder });

    if (result?.data) {
      toast.success('Success', {
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
            <span>Nomor Meja : {order.tableNumber}</span>
            <span>Nama Pemesan : {order.customerName}</span>
            <span>
              Status Pembayaran :{' '}
              <Badge variant={order.hasPayed ? 'success' : 'destructive'}>
                {order.hasPayed ? 'Sudah Bayar' : 'Belum Bayar'}
              </Badge>
            </span>
            <span>
              Status Pesanan :{' '}
              <Badge variant={order.status === 'Menunggu' ? 'secondary' : 'info'}>
                {order.status}
              </Badge>
            </span>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-52 w-auto">
          {order?.orderItems?.length > 0
            ? order?.orderItems.map((item) => <CardOrder key={item.idOrderItem} product={item} />)
            : null}
        </ScrollArea>
        <DialogDescription className="flex justify-between font-bold text-black">
          <span>Total</span>
          <span>{RupiahIRD(order.totalPrice)},-</span>
        </DialogDescription>
        <hr />
        <DialogFooter className="flex-col">
          <Button
            variant={order.status === 'Menunggu' ? 'info' : 'success'}
            onClick={handleChangeStatus}
            className="cursor-pointer"
          >
            {order.status === 'Menunggu' ? 'Proses' : 'Selesaikan Pesanan'}
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
