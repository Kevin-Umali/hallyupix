import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import FieldInfo from "../field-info";

export const VariantFields = ({ form }) => (
  <form.Field
    name="variants"
    children={(field) => (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Product Variants</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              field.pushValue({
                variantName: "",
                sku: "",
                price: 0,
                quantityAvailable: 0,
                metadata: {},
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variant
          </Button>
        </div>

        {field.state.value?.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Variant {index + 1}</h4>
              <Button type="button" variant="ghost" size="sm" onClick={() => field.removeValue(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name={`variants.${index}.variantName`}
                children={(variantField) => (
                  <div className="space-y-2">
                    <Label htmlFor={variantField.name}>Variant Name</Label>
                    <Input
                      id={variantField.name}
                      placeholder="e.g., Red / Version A"
                      value={variantField.state.value}
                      onChange={(e) => variantField.handleChange(e.target.value)}
                    />
                    <FieldInfo field={variantField} />
                  </div>
                )}
              />

              <form.Field
                name={`variants.${index}.sku`}
                children={(skuField) => (
                  <div className="space-y-2">
                    <Label htmlFor={skuField.name}>SKU</Label>
                    <Input id={skuField.name} placeholder="Enter SKU" value={skuField.state.value} onChange={(e) => skuField.handleChange(e.target.value)} />
                    <FieldInfo field={skuField} />
                  </div>
                )}
              />

              <form.Field
                name={`variants.${index}.price`}
                children={(priceField) => (
                  <div className="space-y-2">
                    <Label htmlFor={priceField.name}>Price</Label>
                    <Input
                      id={priceField.name}
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      value={priceField.state.value}
                      onChange={(e) => priceField.handleChange(Number(e.target.value))}
                    />
                    <FieldInfo field={priceField} />
                  </div>
                )}
              />

              <form.Field
                name={`variants.${index}.quantityAvailable`}
                children={(qtyField) => (
                  <div className="space-y-2">
                    <Label htmlFor={qtyField.name}>Quantity</Label>
                    <Input
                      id={qtyField.name}
                      type="number"
                      min={0}
                      placeholder="0"
                      value={qtyField.state.value}
                      onChange={(e) => qtyField.handleChange(Number(e.target.value))}
                    />
                    <FieldInfo field={qtyField} />
                  </div>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  />
);
