import React from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

function SwitchField({ label, checked, onChange, disabled }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        id="airplane-mode"
        disabled={disabled}
      />
      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
}

export default SwitchField;
