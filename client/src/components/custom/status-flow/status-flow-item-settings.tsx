// components/status-flow/status-flow-item-settings.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatusFlow } from "@/shared/types/status-flow.types";
import { STATUS_FLOW } from "@/constant/index";

interface StatusFlowItemSettingsProps {
  flowKey: string;
  flow: StatusFlow;
  allFlows: StatusFlow[];
  onUpdate: (flowKey: string, updates: Partial<StatusFlow>) => void;
}

export const StatusFlowItemSettings: React.FC<StatusFlowItemSettingsProps> = ({ flowKey, flow, allFlows, onUpdate }) => {
  // Update description using the computed flowKey.
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(flowKey, { description: e.target.value });
  };

  // Update the status color.
  const handleColorChange = (color: string) => {
    onUpdate(flowKey, { color });
  };

  // Toggle payment verification requirements.
  const handlePaymentVerificationChange = (type: keyof NonNullable<StatusFlow["paymentVerification"]>, checked: boolean) => {
    const currentPV = flow.paymentVerification ?? STATUS_FLOW.DEFAULT_PAYMENT_VERIFICATION;

    onUpdate(flowKey, {
      paymentVerification: {
        ...currentPV,
        [type]: checked,
      },
    });
  };

  // Toggle an allowed transition using the target's computed key.
  const toggleTransition = (targetKey: string) => {
    const currentTransitions = flow.allowedTransitions || [];
    const transitions = currentTransitions.includes(targetKey) ? currentTransitions.filter((t) => t !== targetKey) : [...currentTransitions, targetKey];
    onUpdate(flowKey, { allowedTransitions: transitions });
  };

  return (
    <div className="space-y-6">
      {/* Description and Color */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Description</Label>
          <Input value={flow.description || ""} onChange={handleDescriptionChange} placeholder="Status description" />
        </div>
        <div className="space-y-2">
          <Label>Status Color</Label>
          <Select value={flow.color} onValueChange={handleColorChange}>
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
        </div>
      </div>

      {/* Payment Verification Requirements */}
      <div className="space-y-4">
        <Label>Payment Verification Requirements</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          {STATUS_FLOW.PAYMENT_INDICATORS.map(({ type, label, description }) => (
            <div key={type} className="flex items-start space-x-2">
              <Checkbox
                id={`${flowKey}-${type}`}
                checked={flow.paymentVerification?.[type as keyof NonNullable<StatusFlow["paymentVerification"]>] || false}
                onCheckedChange={(checked) => handlePaymentVerificationChange(type as keyof NonNullable<StatusFlow["paymentVerification"]>, checked === true)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={`${flowKey}-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </Label>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allowed Transitions */}
      <div className="space-y-4">
        <Label>Allowed Transitions</Label>
        {allFlows.length > 1 ? (
          <div className="grid sm:grid-cols-2 gap-2">
            {allFlows
              .filter((targetFlow) => {
                // Compute target key similarly as in the editor.
                const targetKey = targetFlow.id != null ? targetFlow.id.toString() : `temp-${targetFlow.name}`;
                return targetKey !== flowKey;
              })
              .map((targetFlow) => {
                const targetKey = targetFlow.id != null ? targetFlow.id.toString() : `temp-${targetFlow.name}`;
                return (
                  <div key={targetKey} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${flowKey}-${targetKey}`}
                      checked={(flow.allowedTransitions || []).includes(targetKey)}
                      onCheckedChange={() => toggleTransition(targetKey)}
                    />
                    <Label htmlFor={`${flowKey}-${targetKey}`} className="text-sm">
                      {targetFlow.name}
                    </Label>
                  </div>
                );
              })}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Add more statuses to configure transitions</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default StatusFlowItemSettings;
