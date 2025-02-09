import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_FLOW } from "@/constant/index";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";
import { useForm } from "@tanstack/react-form";
import { StatusFlow } from "@/shared/types/status-flow.types";
import FieldInfo from "@/components/custom/field-info";

interface StatusFlowItemSettingsProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
  index: number;
}

export const StatusFlowItemSettings: React.FC<StatusFlowItemSettingsProps> = ({ form, index }) => {
  return (
    <div className="space-y-6">
      {/* Description and Color */}
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name={`flows[${index}].description`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Description</Label>
              <Input id={field.name} value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} placeholder="Status description" />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`flows[${index}].color`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Status Color</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_FLOW.COLORS.map(({ id, value, label }) => (
                    <SelectItem key={id} value={value}>
                      <div className="flex items-center gap-2">
                        <Badge className={cn(value)}>{label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {/* Payment Verification Requirements */}
      <div className="space-y-4">
        <Label>Payment Verification Requirements</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          {STATUS_FLOW.PAYMENT_INDICATORS.map(({ type, label, description }) => (
            <form.Field key={type} name={`flows[${index}].paymentVerification.${type as keyof NonNullable<StatusFlow["paymentVerification"]>}`}>
              {(field) => (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={`flow-${index}-${type}`}
                    checked={field.state.value || false}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor={`flow-${index}-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusFlowItemSettings;
