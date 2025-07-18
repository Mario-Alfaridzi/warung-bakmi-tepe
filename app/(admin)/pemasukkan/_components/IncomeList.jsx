"use client";

import React, { useEffect, useState } from "react";
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
import * as XLSX from "xlsx";
import { useResetOrderMutation } from "@/lib/redux/api/orderApi";
import { toast } from "sonner";

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

  const handleExportToExcel = () => {
    const convertRupiah = (value) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);

    const dataToExport = filteredOrder.map((item) => ({
      Tanggal: moment(item.order_time).format("DD/MM/YYYY"),
      Nama: item.customer_name,
      Tipe: item.takeaway ? "Take Away" : "Dine In",
      Pemasukkan: convertRupiah(item.total_price),
    }));

    dataToExport.push({
      Tanggal: "",
      Nama: "",
      Tipe: "Total",
      Pemasukkan: convertRupiah(totalRevenue),
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Pemasukan");

    const fileName = `Laporan-Pemasukan-${moment().format(
      "YYYYMMDD-HHmmss"
    )}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleReset = () => {
    try {
      resetOrder();
      toast.success("Sukses", {
        description: `Berhasil reset data`,
      });
    } catch (error) {
      toast.error("Gagal", {
        description: "Gagal reset data",
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
            onChange={setTable}
            placeholder="Pilih Nomor Meja"
          />
        </div>
      </div>
      <div className="flex justify-end mb-4 gap-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          {isLoading ? "Mereset..." : "Reset"}
        </button>
        <button
          onClick={handleExportToExcel}
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
              <TableHead>Tipe</TableHead>
              <TableHead>Pemasukkan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrder.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(item.order_time).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{item.customer_name}</TableCell>
                <TableCell>{item.takeaway ? "Take Away" : "Dine In"}</TableCell>
                <TableCell>{RupiahIRD(item.total_price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold">
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
          Tidak ada data pesanan yang sesuai.
        </div>
      )}
    </div>
  );
}

export default IncomeList;
