"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InputField from "@/components/general/InputField";
import SelectField from "@/components/general/SelectField";
import DetailOrder from "./DetailOrder";
import { Trash2, Eye } from "lucide-react";
import { table_number } from "@/lib/constants";
import moment from "moment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteOrderMutation } from "@/lib/redux/api/orderApi";

function OrderList({ order }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [table, setTable] = useState("");
  const [selectOrder, setSelectOrder] = useState({});

  const filteredOrder =
    (search || table) && order.length > 0
      ? order
          .filter((item) =>
            search
              ? item.customer_name.toLowerCase().includes(search.toLowerCase())
              : item
          )
          .filter((item) =>
            table ? item.table_number === parseInt(table) : item
          )
      : order;
  const handleOpenDetail = (item) => {
    setSelectOrder(item);
    setOpen(true);
  };
  const [deleteOrder, { error }] = useDeleteOrderMutation();

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    toast.success("Sukses", {
      description: "Berhasil menghapus pesanan",
    });
    router.refresh();

    if (error) {
      toast.error("Error", {
        description: error?.message,
      });
    }
  };
  return (
    <div>
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 my-6 rounded-lg">
        <span className="text-2xl">Daftar Pesanan</span>
        <div className="flex gap-2">
          <div className="sm:w-80">
            <InputField
              dark={false}
              type="text"
              id="order"
              name="order"
              placeholder="Cari Pemesan"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <SelectField
            id="meja"
            name="meja"
            value={table}
            options={table_number}
            onChange={setTable}
            placeholder="Pilih nomor meja"
          />
        </div>
      </div>
      {filteredOrder.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Nomor Meja</TableHead>
              <TableHead>Waktu Pemesanan</TableHead>
              <TableHead>Total Belanja</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrder.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.customer_name}
                </TableCell>
                <TableCell className="font-medium">
                  {item.table_number ?? "-"}
                </TableCell>
                <TableCell className="font-medium">
                  {moment(item.order_time).format("DD-MM-YYYY hh:mm")}
                </TableCell>
                <TableCell className="font-medium">
                  Rp. {parseFloat(item.total_price).toLocaleString("ID-id")}
                </TableCell>
                <TableCell className="font-medium">
                  {item.takeaway ? "Take Away" : "Dine In"}
                </TableCell>
                <TableCell className="font-medium">
                  <Badge
                    variant={
                      item.status === "Menunggu"
                        ? "destructive"
                        : item.status === "Diproses"
                        ? "info"
                        : "success"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2 font-medium">
                  <Button
                    onClick={() => handleOpenDetail(item)}
                    className="cursor-pointer"
                  >
                    <Eye />
                  </Button>
                  <Button
                    onClick={() => handleDeleteOrder(item.id)}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <span className="text-center">Pesanan tidak ditemukan</span>
      )}
      <DetailOrder open={open} setOpen={setOpen} order={selectOrder} />
    </div>
  );
}

export default OrderList;
