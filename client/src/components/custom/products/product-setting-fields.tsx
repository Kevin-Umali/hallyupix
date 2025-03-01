import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DatePicker from "@/components/ui/date-picker";
import { CreateProductWithVariantsRequest } from "@/lib/mutation/product-variant.mutation";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FieldInfo from "../field-info";

interface ProductSettingFieldsProps {
  form: ReturnType<typeof useForm<CreateProductWithVariantsRequest>>;
}

const ProductSettingFields: React.FC<ProductSettingFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Settings</CardTitle>
          <CardDescription>Configure special settings and release information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Limited Edition Toggle */}
          <form.Field name="isLimitedEdition">
            {(field) => (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor={field.name}>Limited Edition</Label>
                  <p className="text-sm text-muted-foreground">Mark this product as a limited edition item</p>
                </div>
                <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
              </div>
            )}
          </form.Field>

          {/* Release Date */}
          <form.Field name="releaseDate">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Release Date</Label>
                <DatePicker value={field.state.value ?? ""} onChange={(date) => field.handleChange(date)} />
                <p className="text-sm text-muted-foreground">Set the official release date for this product</p>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSettingFields;
