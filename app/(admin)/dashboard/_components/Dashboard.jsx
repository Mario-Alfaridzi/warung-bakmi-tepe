"use client";
import React from "react";
import CardOrder from "./CardOrder";

function Dashboard({ order, menus }) {
  const menuAvailable = menus.filter((menu) => menu.available === true);

  const filteredOrder = order.filter((item) => item.has_payed == true);
  const totalPendapatan =
    filteredOrder?.reduce((acc, curr) => acc + curr.total_price, 0) || 0;
  const tableOrder = order.filter(
    (item) => item.status !== "Selesai" && item.takeaway !== true
  );
  console.log(tableOrder);
  const stats = [
    {
      title: "Menu Tersedia",
      value: menuAvailable.length,
    },

    {
      title: "Total Pesanan",
      value: filteredOrder.length,
    },
    {
      title: "Total Pendapatan",
      value: `Rp ${totalPendapatan.toLocaleString("id-ID")}`,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-base-200 flex flex-col items-center gap-1 rounded-md p-6 shadow-md"
          >
            <span className="text-2xl font-semibold">{item.title}</span>
            <span className="text-4xl font-bold">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {tableOrder.length > 0 ? (
          tableOrder.map((item, index) => <CardOrder key={index} item={item} />)
        ) : (
          <span className="text-center col-span-3">Tidak ada pesanan</span>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
