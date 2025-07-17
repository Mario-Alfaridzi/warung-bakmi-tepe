import React from "react";
import Image from "next/image";

import { RupiahIRD } from "@/lib/utils";

function CardOrder({ product }) {
  return (
    <div className="bg-base-200 min-h-14 sm:min-h-20 sm:h-auto flex gap-1">
      <div className="basis-2/3 flex gap-2 p-2">
        <Image
          src={product.menu.image}
          height={100}
          width={100}
          alt={product.menu.name}
          className="w-auto h-14 sm:h-auto"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm sm:text-lg font-medium">
            {product.menu.name}
          </span>
          <span className="text-xs sm:text-base">-{product.quantity}-</span>
          {product.note && (
            <p className="text-base">
              Catatan:{" "}
              <span className="text-slate-700 italic">{product.note}</span>
            </p>
          )}
        </div>
      </div>
      <div className="basis-1/3 flex flex-col justify-center items-center gap-1">
        <span className="text-sm">
          {RupiahIRD(product.menu.price * product.quantity)}
        </span>
      </div>
    </div>
  );
}

export default CardOrder;
