import React, { useEffect, useMemo, useState } from "react";
import InputField from "@/components/general/InputField";
import SelectField from "@/components/general/SelectField";
import SwitchField from "@/components/general/SwitchField";
import PaymentModal from "./PaymentModal";
import { table_number } from "@/lib/constants";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";

function FormOrder() {
  const [takeaway, setTakeaway] = useState(false);
  const [table, setTable] = useState("");
  const [name, setName] = useState("");

  const { data: orders = [] } = useGetOrdersQuery();

  const usedTableNumbers = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.table_number && !order.takeaway && order.status != "Selesai"
      )
      .map((order) => String(order.table_number));
  }, [orders]);

  const availableTableNumbers = useMemo(() => {
    return table_number.filter((t) => !usedTableNumbers.includes(t.name));
  }, [usedTableNumbers]);

  useEffect(() => {
    if (availableTableNumbers.length === 0) {
      setTakeaway(true);
    }
  }, [availableTableNumbers]);

  const normalizedTable = table === "" ? null : table;

  return (
    <div className="flex flex-col gap-6">
      <span>Isi data pesanan anda</span>
      {!takeaway && availableTableNumbers.length !== 0 && (
        <SelectField
          id="meja"
          name="meja"
          label="Nomor Meja"
          value={table}
          options={
            availableTableNumbers.length > 0 ? availableTableNumbers : []
          }
          onChange={setTable}
          placeholder="Pilih nomor meja"
        />
      )}
      {availableTableNumbers.length == 0 && (
        <p className="text-red-400">Tidak ada meja tersedia</p>
      )}
      {availableTableNumbers.length == 0 ? (
        <SwitchField label={"Take away"} checked={true} disabled={true} />
      ) : (
        <SwitchField
          label={takeaway ? "Take away" : "Dine in"}
          checked={takeaway}
          onChange={setTakeaway}
          disabled={false}
        />
      )}

      <InputField
        id="nama"
        name="nama"
        label="Nama"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <PaymentModal name={name} table={normalizedTable} takeaway={takeaway} />
    </div>
  );
}

export default FormOrder;
