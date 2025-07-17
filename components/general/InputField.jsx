"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField = React.forwardRef(function InputField(
  {
    dark = true,
    type = "",
    label = "",
    id = "",
    name = "",
    placeholder = "",
    ...props
  },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="capitalize font-normal text-base">
        {label}
      </Label>
      <Input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={cn(
          dark && "bg-base-300 text-base-200 placeholder:text-base-200",
          !dark && "bg-base-100 text-base-300 placeholder:text-[#C4E1E6]"
        )}
        {...props}
      />
    </div>
  );
});

export default InputField;
