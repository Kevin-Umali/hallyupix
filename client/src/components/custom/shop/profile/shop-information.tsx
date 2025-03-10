import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldInfo from "@/components/custom/field-info";
import { useForm } from "@tanstack/react-form";
import { SaveShopProfileRequest } from "@/lib/mutation/shop.mutation";

interface ShopInformationProps {
  form: ReturnType<typeof useForm<SaveShopProfileRequest>>;
}

const ShopInformation: React.FC<ShopInformationProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shop Information</CardTitle>
        <CardDescription>Basic information about your shop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form.Field name="shopName">
          {(field) => (
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
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                placeholder="Describe your shop..."
                className="min-h-[120px] resize-none"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <div className="flex justify-end">
                <span className="text-sm text-muted-foreground">{field.state.value?.length ?? 0}/500</span>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
    </Card>
  );
};

ShopInformation.displayName = "ShopInformation";

export default ShopInformation;
