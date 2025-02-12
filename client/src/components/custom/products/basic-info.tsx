// components/custom/products/basic-info.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldInfo from "@/components/custom/field-info";

export const BasicInfoFields = ({ form }) => (
  <div className="space-y-4">
    <form.Field
      name="title"
      children={(field) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>Product Title</Label>
          <Input
            id={field.name}
            placeholder="Enter product title"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
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
            placeholder="Enter product description"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          <FieldInfo field={field} />
        </div>
      )}
    />
  </div>
);
