import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldInfo from "@/components/custom/field-info";
import { useForm } from "@tanstack/react-form";
import { ShopProfileFormType } from "@/components/custom/shop/profile";

interface ShopInformationProps {
  form: ReturnType<typeof useForm<ShopProfileFormType>>;
}

const ShopInformation: React.FC<ShopInformationProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shop Information</CardTitle>
        <CardDescription>Basic information about your shop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form.Field
          name="shopName"
          children={(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Shop Name</Label>
              <Input
                id={field.name}
                placeholder="Enter your shop name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="description"
          children={(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                placeholder="Describe your shop..."
                className="min-h-[120px] resize-none"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <div className="flex justify-between items-center text-sm">
                <FieldInfo field={field} />
                <span className="text-muted-foreground">{field.state.value?.length || 0}/500</span>
              </div>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

ShopInformation.displayName = "ShopInformation";

export default ShopInformation;
