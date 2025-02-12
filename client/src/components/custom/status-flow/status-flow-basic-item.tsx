import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/custom/field-info";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";

interface StatusFlowBasicItemProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
}

export const StatusFlowBasicItem: React.FC<StatusFlowBasicItemProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      {/* Status Indicators */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
          Default Flow
        </Badge>
        <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
          Active
        </Badge>
      </div>

      {/* Main Form Fields */}
      <div className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-2">
                  Flow Name
                </Label>
                <Input
                  id={field.name}
                  placeholder="e.g., Order Processing Flow"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="initialStatus">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-2">
                  Initial Status
                </Label>
                <Input id={field.name} placeholder="e.g., New Order" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>Description</Label>
              </div>
              <Input
                id={field.name}
                placeholder="Describe the purpose and usage of this status flow"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
};

export default StatusFlowBasicItem;
