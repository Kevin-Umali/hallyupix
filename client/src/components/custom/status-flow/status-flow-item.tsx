import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GripVertical, Settings, Trash2, ChevronDown, ChevronUp, Plus, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/custom/field-info";
import { STATUS_FLOW } from "@/constant";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";
import StatusFlowVerificationItem from "@/components/custom/status-flow/status-flow-vertification-item";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StatusFlowItemProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
  index: number;
  isOpen: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement> | null;
  isDragging?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRemove: () => void;
}

export const StatusFlowItem: React.FC<StatusFlowItemProps> = ({ form, index, isOpen, dragHandleProps, isDragging, onOpenChange, onRemove }) => {
  const statuses = form.getFieldValue("statuses");
  const isTerminal = index === statuses.length - 1;

  return (
    <Card className={cn("relative transition-all duration-200", isDragging && "opacity-50", isTerminal && "border-green-200")}>
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div {...dragHandleProps}>
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
            </div>
            <form.Field name={`statuses[${index}].name`}>
              {(field) => (
                <div className="flex-1 max-w-[200px]">
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Status Name" />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end sm:ml-auto">
            <div className="flex items-center gap-2">
              {isTerminal && (
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  Terminal
                </Badge>
              )}
              <form.Field name={`statuses[${index}].color`}>
                {(field) => (
                  <form.Field name={`statuses[${index}].name`}>
                    {(nameField) => <Badge className={cn("text-sm", field.state.value)}>{nameField.state.value || "New Status"}</Badge>}
                  </form.Field>
                )}
              </form.Field>
            </div>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
                {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
            </CollapsibleTrigger>

            <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isOpen && statuses?.[index] && (
          <div className="px-4 pb-3 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 flex-wrap">
              <ArrowRight className="h-4 w-4" />
              {statuses?.[index]?.allowedTransitions?.length ? (
                <div className="flex gap-1 flex-wrap">
                  {statuses[index].allowedTransitions.map((transitionId) => {
                    // Look up the status with this id and show its name.
                    const transitionStatus = statuses.find((s) => s.id === transitionId);
                    return (
                      <Badge key={transitionId} variant="outline" className="text-xs">
                        → {transitionStatus ? transitionStatus.name : transitionId}
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                <span className="text-xs">No transitions</span>
              )}
            </div>

            <span className="hidden sm:inline text-muted">•</span>

            <div className="flex items-center gap-2 flex-wrap">
              <ShieldCheck className="h-4 w-4" />
              {statuses?.[index]?.verifications?.length ? (
                <Badge variant="outline" className="text-xs">
                  {statuses[index].verifications.length} verification
                  {statuses[index].verifications.length !== 1 ? "s" : ""}
                </Badge>
              ) : (
                <span className="text-xs">No verifications</span>
              )}
            </div>
          </div>
        )}

        <CollapsibleContent>
          <div className="p-4 space-y-6 border-t">
            {/* Basic Settings */}
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name={`statuses[${index}].description`}>
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Description</Label>
                    <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} placeholder="Status description" />
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>

              <form.Field name={`statuses[${index}].color`}>
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Status Color</Label>
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

            <form.Field name={`statuses[${index}].allowedTransitions`} mode="array">
              {(field) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label htmlFor={field.name}>Allowed Transitions</Label>
                      <p className="text-sm text-muted-foreground">Select statuses this status can transition to</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        field.pushValue("");
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transition
                    </Button>
                  </div>

                  {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                    <div className="space-y-2 p-4 border rounded-md">
                      {field.state.value.map((transition, tIndex) => {
                        const nextStatusId = statuses?.[index + 1]?.id;
                        const isRequiredTransition = transition === nextStatusId;

                        return (
                          <div key={`transition-${statuses[index]?.id}-${tIndex}-${transition}`} className="flex items-center gap-2">
                            <div className="flex-1">
                              <form.Field name={`statuses[${index}].allowedTransitions[${tIndex}]`}>
                                {(transitionField) => (
                                  <Select
                                    value={transitionField.state.value}
                                    onValueChange={(value) => transitionField.handleChange(value)}
                                    disabled={isRequiredTransition}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select target status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {statuses
                                        .filter((_, sIndex) => sIndex !== index)
                                        .map((status) => (
                                          <SelectItem key={`select-item-${status.id}`} value={status.id} disabled={field?.state?.value?.includes(status.id)}>
                                            {status.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              </form.Field>
                            </div>
                            {isRequiredTransition ? (
                              <Badge variant="secondary" className="text-xs">
                                Required
                              </Badge>
                            ) : (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => field.removeValue(tIndex)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>No transitions added yet</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name={`statuses[${index}].verifications`} mode="array">
              {(field) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label htmlFor={field.name}>Verifications</Label>
                      <p className="text-sm text-muted-foreground">Required checks before status can change</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        field.pushValue({
                          type: "PAYMENT_PROOF",
                          required: true,
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Verification
                    </Button>
                  </div>

                  {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                    <div className="space-y-4">
                      {field.state.value.map((_, vIndex) => (
                        <StatusFlowVerificationItem
                          key={vIndex}
                          form={form}
                          statusIndex={index}
                          verificationIndex={vIndex}
                          onRemove={() => field.removeValue(vIndex)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>No verifications added yet</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default StatusFlowItem;
