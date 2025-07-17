"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

function MenuCard({ children, image, title, price }) {
  const formatedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
  return (
    <Card>
      <CardHeader>
        <Image
          src={image || "/placeholder.jpg"}
          alt={title || "Menu"}
          width={500}
          height={300}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <span className="capitalize text-xl font-semibold">{title}</span>
        <span>{formatedPrice}</span>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}

export default MenuCard;
