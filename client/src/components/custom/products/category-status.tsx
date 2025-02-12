import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import FieldInfo from "../field-info";

export const CategoryStatusFields = ({ form }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <form.Field
      name="originCategory"
      children={(field) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>Category</Label>
          <Select value={field.state.value} onValueChange={field.handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Album">Album</SelectItem>
              <SelectItem value="Photocard">Photocard</SelectItem>
              <SelectItem value="Merchandise">Merchandise</SelectItem>
            </SelectContent>
          </Select>
          <FieldInfo field={field} />
        </div>
      )}
    />

    <form.Field
      name="productStatus"
      children={(field) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>Status</Label>
          <Select value={field.state.value} onValueChange={field.handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pre-order">Pre-order</SelectItem>
              <SelectItem value="On-hand">On-hand</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Sold Out">Sold Out</SelectItem>
            </SelectContent>
          </Select>
          <FieldInfo field={field} />
        </div>
      )}
    />
  </div>
);
