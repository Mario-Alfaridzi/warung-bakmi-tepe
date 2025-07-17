import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function SelectField({
  dark = true,
  options = [],
  label = "",
  id = "",
  name = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="capitalize font-normal text-base">
        {label}
      </Label>
      <Select
        id={id}
        name={name}
        value={value}
        onValueChange={onChange}
        {...props}
      >
        <SelectTrigger
          className={cn(
            "w-full text-base",
            dark &&
              "bg-base-300 text-base-200 data-[placeholder]:text-base-200",
            !dark &&
              "bg-base-100 text-base-300 data-[placeholder]:text-base-300"
          )}
        >
          <SelectValue placeholder={placeholder} className="text-red-500" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={undefined}>Reset</SelectItem>
          {options.length > 0 ? (
            options.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="">Opsi Kosong</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectField;
