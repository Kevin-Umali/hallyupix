import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FieldInfo from "@/components/custom/field-info";
import { CreateProductWithVariantsRequest } from "@/lib/mutation/product-variant.mutation";
import { useForm } from "@tanstack/react-form";

// Options
const PRODUCT_STATUS_OPTIONS = [
  { label: "Pre-order", value: "Pre-order" },
  { label: "On-hand", value: "On-hand" },
  { label: "Reserved", value: "Reserved" },
  { label: "Sold Out", value: "Sold Out" },
];

const VISIBILITY_OPTIONS = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
  { label: "Hidden", value: "Hidden" },
];

const INVENTORY_STATUS_OPTIONS = [
  { label: "In Stock", value: "In Stock" },
  { label: "Low Stock", value: "Low Stock" },
  { label: "Out of Stock", value: "Out of Stock" },
  { label: "Discontinued", value: "Discontinued" },
];

export interface AvailabilityFieldsProps {
  form: ReturnType<typeof useForm<CreateProductWithVariantsRequest>>;
}

// Main component
const AvailabilityFields: React.FC<AvailabilityFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Availability</CardTitle>
          <CardDescription>Configure visibility and stock settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Product Status */}
            <form.Field name="productStatus">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Product Status</Label>
                  <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as typeof field.state.value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Visibility */}
            <form.Field name="visibility">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Visibility</Label>
                  <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as typeof field.state.value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISIBILITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Inventory Status */}
            <form.Field name="inventoryStatus">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Inventory Status</Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inventory status" />
                    </SelectTrigger>
                    <SelectContent>
                      {INVENTORY_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Minimum Stock Alert */}
            <form.Field name="minimumStockAlert">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Minimum Stock Alert</Label>
                  <Input
                    id={field.name}
                    type="number"
                    min={1}
                    placeholder="Enter minimum stock level"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">You&apos;ll be notified when stock falls below this number</p>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityFields;
