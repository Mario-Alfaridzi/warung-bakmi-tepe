"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuCard from "@/components/general/MenuCard";
import InputField from "@/components/general/InputField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
// import { promo } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserMenu({ menu }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const filteredMenu =
    search && menu.length > 0
      ? menu.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.available
        )
      : menu.filter((item) => item.available);

  const handleAddMenu = (item) => {
    const itemToAdd = {
      ...item,
      quantity: item.quantity ? item.quantity++ : 1,
    };

    addItem(itemToAdd);
    toast("Sukses", {
      description: "Berhasil menambahkan menu",
      action: {
        label: "Lihat Keranjang",
        onClick: () => router.push("/user-pesanan"),
      },
    });
  };

  const listMenu = ({ type }) => {
    return (
      <div className="flex flex-col gap-4 my-6">
        <h3 className="font-semibold text-base sm:text-lg">
          {type === "food" ? "Makanan" : "Minuman"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenu.filter((item) => item.type === type).length > 0 ? (
            filteredMenu
              .filter((item) => item.type === type)
              .map((item) => (
                <MenuCard
                  key={item.id}
                  image={item.image}
                  title={item.name}
                  price={item.price}
                >
                  <Button
                    onClick={() => handleAddMenu(item)}
                    className="w-full flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus />
                    <span>Tambah</span>
                  </Button>
                </MenuCard>
              ))
          ) : (
            <p>No Result</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* {promo.map((item) => (
        <Image
          key={item.id}
          src={item.image}
          alt={item.alt}
          width={1000}
          height={1000}
          className="w-full h-40 sm:h-60 object-cover rounded-lg mb-4"
        />
      ))} */}
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg">
        <span className="font-semibold ms-4">Menu Makanan</span>
        <div className="sm:w-80 me-4">
          <InputField
            dark={false}
            type="text"
            id="menu"
            name="menu"
            placeholder="Cari Menu"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      {listMenu({ type: "food" })}
      {listMenu({ type: "drink" })}
    </div>
  );
}

export default UserMenu;
