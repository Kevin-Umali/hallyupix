import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import FieldInfo from "@/components/custom/field-info";
import { MultiSelect } from "@/components/custom/multi-select";
import { CreateProductWithVariantsRequest } from "@/lib/mutation/product-variant.mutation";
import { useForm } from "@tanstack/react-form";

interface BasicInfoFieldsProps {
  form: ReturnType<typeof useForm<CreateProductWithVariantsRequest>>;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the essential details about your product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Product Title</Label>
                <Input
                  id={field.name}
                  placeholder="Enter product title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  placeholder="Enter product description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-32 resize-none"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Artist */}
            <form.Field name="artist">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Artist/Group</Label>
                  <Input
                    id={field.name}
                    placeholder="Enter artist or group name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Merch Type */}
            <form.Field name="merchType">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Merchandise Type</Label>
                  <Input
                    id={field.name}
                    placeholder="e.g., Album, Photocard, Lightstick"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Origin */}
          <form.Field name="origin">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Product Origin</Label>
                <Input
                  id={field.name}
                  placeholder="e.g., Mercari, Yangdo, Xianyu, Withmuu"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Tags */}
          <form.Field name="tags">
            {(field) => (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </Label>
                <MultiSelect
                  options={[]}
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder="Add searchable tags..."
                  maxSelected={10}
                  creatable
                />
                <p className="text-sm text-muted-foreground">Add up to 10 tags to help buyers find your product</p>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoFields;
