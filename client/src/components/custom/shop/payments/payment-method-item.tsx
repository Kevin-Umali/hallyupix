import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { Trash2, Upload, QrCode } from "lucide-react";
import FieldInfo from "@/components/custom/field-info";
import { PaymentMethod } from "@/components/custom/shop/payments/payment-methods";

interface PaymentMethodItemProps {
  form: ReturnType<
    typeof useForm<{
      paymentMethods: PaymentMethod[];
    }>
  >;
  index: number;
  onQRUpload: () => Promise<void>;
  onRemove: (index: number) => void;
}

const PaymentMethodItem = ({ form, index, onQRUpload, onRemove }: PaymentMethodItemProps) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-medium">Payment Method {index + 1}</h4>
      <div className="flex items-center space-x-2">
        <form.Field
          name={`paymentMethods[${index}].isActive`}
          children={(field) => (
            <div className="flex items-center space-x-2">
              <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
              <Label className="text-sm">Active</Label>
            </div>
          )}
        />
        <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(index)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <form.Field
        name={`paymentMethods[${index}].name`}
        children={(field) => (
          <div className="space-y-2">
            <Label>Method Name</Label>
            <Input placeholder="e.g., Bank Transfer" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name={`paymentMethods[${index}].type`}
        children={(field) => (
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as "BANK" | "EWALLET" | "CRYPTO")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BANK">Bank</SelectItem>
                <SelectItem value="EWALLET">E-Wallet</SelectItem>
                <SelectItem value="CRYPTO">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name={`paymentMethods[${index}].accountName`}
        children={(field) => (
          <div className="space-y-2">
            <Label>Account Name</Label>
            <Input placeholder="Enter account name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name={`paymentMethods[${index}].accountNumber`}
        children={(field) => (
          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input placeholder="Enter account number" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            <FieldInfo field={field} />
          </div>
        )}
      />
    </div>

    <form.Field
      name={`paymentMethods[${index}].qrCodeImage`}
      children={(field) => (
        <div className="space-y-2">
          <Label>QR Code</Label>
          <div className="flex items-center space-x-4">
            {field.state.value ? (
              <div className="relative w-32 h-32">
                <img src={field.state.value} alt="Payment QR Code" className="rounded-lg object-cover" />
                <Button type="button" variant="secondary" size="sm" className="absolute bottom-2 right-2" onClick={onQRUpload}>
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button type="button" variant="outline" onClick={onQRUpload}>
                <QrCode className="h-4 w-4 mr-2" />
                Upload QR Code
              </Button>
            )}
          </div>
        </div>
      )}
    />
  </div>
);

export default PaymentMethodItem;
