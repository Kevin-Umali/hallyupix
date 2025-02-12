import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";
import { STATUS_FLOW } from "@/constant";
import { Fragment, useId } from "react";

interface StatusFlowVerificationItemProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
  statusIndex: number;
  verificationIndex: number;
  onRemove: () => void;
}

export const StatusFlowVerificationItem: React.FC<StatusFlowVerificationItemProps> = ({ form, statusIndex, verificationIndex, onRemove }) => {
  const selectId = useId();

  return (
    <Card className="relative group">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">Verification {verificationIndex + 1}</h4>
              <form.Field name={`statuses[${statusIndex}].verifications[${verificationIndex}].required`}>
                {(field) =>
                  field.state.value ? (
                    <Badge variant="secondary" className="bg-red-50 text-red-700">
                      Required
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      Optional
                    </Badge>
                  )
                }
              </form.Field>
            </div>
            <p className="text-sm text-muted-foreground">Configure verification requirements for this status</p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Verification Type */}
        <form.Field name={`statuses[${statusIndex}].verifications[${verificationIndex}].type`}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="verification-type" className="text-sm font-medium">
                Type
              </Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger id={selectId} className="[&_[data-desc]]:hidden">
                  <SelectValue placeholder="Choose verification type..." />
                </SelectTrigger>

                <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                  {Object.entries(STATUS_FLOW.VERIFICATION_GROUPS).map(([key, group], groupIndex, groupsArray) => (
                    <Fragment key={key}>
                      <SelectGroup>
                        <SelectLabel className="font-semibold px-2 py-1.5 text-sm">{group.label}</SelectLabel>
                        {group.types.map((verification) => (
                          <SelectItem key={verification.value} value={verification.value}>
                            {verification.value
                              .split("_")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                              .join(" ")}
                            <span className="mt-1 block text-xs text-muted-foreground" data-desc>
                              {verification.description}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      {groupIndex < groupsArray.length - 1 && <SelectSeparator />}
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Required Toggle */}
        <form.Field name={`statuses[${statusIndex}].verifications[${verificationIndex}].required`}>
          {(field) => (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
              <div className="flex-1 space-y-0.5">
                <Label className="text-sm font-medium">Requirement Level</Label>
                <p className="text-sm text-muted-foreground">
                  {field.state.value ? "Must be completed before status can change" : "Optional verification step"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={field.state.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => field.handleChange(true)}
                  className="relative"
                >
                  Required
                </Button>
                <Button
                  type="button"
                  variant={!field.state.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => field.handleChange(false)}
                  className="relative"
                >
                  Optional
                </Button>
              </div>
            </div>
          )}
        </form.Field>
      </div>
    </Card>
  );
};

export default StatusFlowVerificationItem;
