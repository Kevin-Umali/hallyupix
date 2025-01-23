// components/settings/payment/ShopPaymentSettings.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, FileText, Clock, Settings2 } from "lucide-react";
import PaymentMethodsForm from "@/components/custom/shop/payments/payment-methods";
import InstructionsForm from "@/components/custom/shop/payments/instructions";
import DeadlinesForm from "@/components/custom/shop/payments/deadlines";
import PoliciesForm from "@/components/custom/shop/payments/policies";
import { ShopPayment } from "@/shared/types/shop.types";

interface ShopPaymentSettingsProps {
  initialData: Partial<ShopPayment>;
}

export const ShopPaymentSettings = ({ initialData }: ShopPaymentSettingsProps) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Settings</h1>
        <p className="text-muted-foreground">Manage your payment methods and policies</p>
        <Separator className="my-4" />
      </div>
      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods" className="space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Methods</span>
          </TabsTrigger>
          <TabsTrigger value="instructions" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Instructions</span>
          </TabsTrigger>
          <TabsTrigger value="deadlines" className="space-x-2">
            <Clock className="h-4 w-4" />
            <span>Deadlines</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="space-x-2">
            <Settings2 className="h-4 w-4" />
            <span>Policies</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="methods">
          <PaymentMethodsForm paymentMethodsData={initialData.paymentMethods} />
        </TabsContent>
        <TabsContent value="instructions">
          <InstructionsForm paymentInstructions={initialData.paymentInstructions} />
        </TabsContent>
        <TabsContent value="deadlines">
          <DeadlinesForm deadlineSettings={initialData.deadlineSettings} />
        </TabsContent>
        <TabsContent value="policies">
          <PoliciesForm policies={initialData.paymentPolicies} customPolicies={initialData.customPolicies} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

ShopPaymentSettings.displayName = "ShopPaymentSettings";

export default ShopPaymentSettings;
