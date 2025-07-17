"use client";

import React, { useState } from "react";
import MenuCard from "@/components/general/MenuCard";
import SwitchField from "@/components/general/SwitchField";
import { toast } from "sonner";
import { useUpdateMenuMutation } from "@/lib/redux/api/menuApi";

function CardStokMenu({ menu }) {
  const [available, setAvailable] = useState(menu.available);
  const [updateMenu] = useUpdateMenuMutation();

  const handleStock = async (val) => {
    try {
      await updateMenu({
        id: menu.id,
        available: val,
      }).unwrap();
      setAvailable(val);

      toast.success("Sukses", {
        description: "Berhasil mengubah status menu",
      });
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      });
    }
  };

  return (
    <MenuCard image={menu.image} title={menu.name} price={menu.price}>
      <SwitchField
        checked={available}
        label={available ? "Tersedia" : "Habis"}
        onChange={handleStock}
      />
    </MenuCard>
  );
}

export default CardStokMenu;
