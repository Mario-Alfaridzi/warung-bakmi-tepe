// IncomeList.jsx
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import InputField from "@/components/general/InputField";
import SelectField from "@/components/general/SelectField";
import { table_number } from "@/lib/constants";
import { RupiahIRD } from "@/lib/utils";
import moment from "moment";
import { useResetOrderMutation } from "@/lib/redux/api/orderApi";
import { toast } from "sonner";
import { handleExportToExcel } from "./GenerateReport";

moment.locale("id");

function IncomeList({ order }) {
  const [resetOrder, { isLoading }] = useResetOrderMutation();
  const [search, setSearch] = useState("");
  const [table, setTable] = useState("");

  const completedOrder = order.filter((item) => item.has_payed);

  const filteredOrder = completedOrder.filter((item) => {
    const matchesSearch = search
      ? item.customer_name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesTable = table
      ? item.table_number === parseInt(table, 10)
      : true;
    return matchesSearch && matchesTable;
  });

  const totalRevenue = filteredOrder.reduce(
    (acc, curr) => acc + curr.total_price,
    0
  );

  const handleReset = async () => {
    try {
      await resetOrder().unwrap();
      toast.success("Sukses", {
        description: `Berhasil reset data`,
      });
    } catch (error) {
      toast.error("Gagal", {
        description: "Gagal reset data. Coba lagi.",
      });
    }
  };

  return (
    <div className="mb-20">
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-4 my-6 rounded-lg gap-2">
        <span className="text-xl font-semibold">Pemasukkan</span>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <InputField
            dark={false}
            type="text"
            id="search"
            name="search"
            placeholder="Cari Nama Pemesan"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <SelectField
            id="table"
            name="table"
            value={table}
            options={table_number}
            onChange={(e) => setTable(e.target.value)}
            placeholder="Pilih Nomor Meja"
          />
        </div>
      </div>
      <div className="flex justify-end mb-4 gap-4">
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer disabled:bg-gray-400"
        >
          {isLoading ? "Mereset..." : "Reset Data"}
        </button>
        <button
          onClick={() => handleExportToExcel(filteredOrder, totalRevenue)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Export Excel
        </button>
      </div>

      {filteredOrder.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-[200px]">Nama</TableHead>
              <TableHead className="w-[200px]">Menu</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Pemasukkan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrder.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {moment(item.order_time).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{item.customer_name}</TableCell>
                  <TableCell>
                    <ul className="list-disc ml-4">
                      {item.order_list?.map((orderItem) => (
                        <li key={orderItem.id}>
                          {orderItem.menu?.name} (x{orderItem.quantity})
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {item.takeaway ? "Take Away" : "Dine In"}
                  </TableCell>
                  <TableCell>{RupiahIRD(item.total_price)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-right font-semibold">
                Total
              </TableCell>
              <TableCell className="font-bold text-green-600">
                {RupiahIRD(totalRevenue)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          Tidak ada data pemasukkan yang ditemukan.
        </div>
      )}
    </div>
  );
}

export default IncomeList;
