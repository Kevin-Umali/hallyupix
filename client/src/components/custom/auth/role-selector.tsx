import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export interface RoleOption {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

interface RoleSelectorProps {
  roles: RoleOption[];
  selectedRole: string;
  onRoleChange: (value: string) => void;
  className?: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, selectedRole, onRoleChange, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4" value={selectedRole} onValueChange={onRoleChange}>
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.value}
              className={`relative flex items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring hover:border-ring/50 transition-colors`}
            >
              <RadioGroupItem
                value={role.value}
                id={`radio-${role.value}`}
                aria-describedby={`radio-${role.value}-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="flex grow items-start gap-3">
                <Icon className="shrink-0 w-6 h-6 text-primary" />
                <div className="grid grow gap-1">
                  <Label htmlFor={`radio-${role.value}`} className="font-medium">
                    {role.label}
                  </Label>
                  <p id={`radio-${role.value}-description`} className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

RoleSelector.displayName = "RoleSelector";

export default RoleSelector;
