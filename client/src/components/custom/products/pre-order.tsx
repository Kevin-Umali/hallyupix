import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FieldInfo from "../field-info";

export const PreOrderFields = ({ form }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <form.Field
      name="deadlineOfDownPayment"
      children={(field) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>Down Payment Deadline</Label>
          <Input
            id={field.name}
            type="datetime-local"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          <FieldInfo field={field} />
        </div>
      )}
    />

    <form.Field
      name="estimatedTimeOfArrival"
      children={(field) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>Estimated Arrival</Label>
          <Input
            id={field.name}
            type="datetime-local"
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
