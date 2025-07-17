"use client";

import React, { useState } from "react";
import InputField from "@/components/general/InputField";
import CardStokMenu from "./CardStokMenu";

function StokMenu({ menu }) {
  const [search, setSearch] = useState("");
  const filteredMenu =
    search && menu.length > 0
      ? menu.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : menu;

  return (
    <div>
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 my-6 rounded-lg">
        <span className="text-2xl">Stok Menu</span>
        <div className="sm:w-80">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMenu.length > 0 ? (
          filteredMenu?.map((item) => (
            <CardStokMenu key={item.id} menu={item} />
          ))
        ) : (
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}

export default StokMenu;
