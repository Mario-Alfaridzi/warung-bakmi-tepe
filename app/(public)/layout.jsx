import React from "react";
import { CartProvider } from "@/hooks/use-cart";

function layout({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

export default layout;
