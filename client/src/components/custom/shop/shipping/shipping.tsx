// components/settings/shipping/shipping.tsx
import { Separator } from "@/components/ui/separator";
import { Ship, Timer, Globe2, ScrollText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessingForm from "@/components/custom/shop/shipping/processing";
import ShippingMethodForm from "@/components/custom/shop/shipping/method";
import ShippingPoliciesForm from "@/components/custom/shop/shipping/policies";
import { ShopShipping } from "@/shared/types/shop.types";
import ShippingCustomPolicies from "@/components/custom/shop/shipping/custom-policies";
import CustomLoader from "@/components/custom/custom-loader";

interface ShopShippingSettingsProps {
  initialData: Partial<ShopShipping>;
  isLoading: boolean;
}

const ShopShippingSettings: React.FC<ShopShippingSettingsProps> = ({ initialData, isLoading }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Shipping Settings</h1>
        <p className="text-muted-foreground">Manage your shipping policies and processing times</p>
        <Separator className="my-4" />
      </div>
      <Tabs defaultValue="processing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="processing" className="space-x-2">
            <Timer className="h-4 w-4" />
            <span>Processing Times</span>
          </TabsTrigger>
          <TabsTrigger value="methods" className="space-x-2">
            <Ship className="h-4 w-4" />
            <span>Shipping Methods</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="space-x-2">
            <Globe2 className="h-4 w-4" />
            <span>Shipping Policies</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="space-x-2">
            <ScrollText className="h-4 w-4" />
            <span>Custom</span>
          </TabsTrigger>
        </TabsList>
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <CustomLoader text="Loading shipping settings..." />
          </div>
        ) : (
          <>
            <TabsContent value="processing">
              <ProcessingForm processingTimes={initialData.processingTimes} />
            </TabsContent>
            <TabsContent value="methods">
              <ShippingMethodForm shippingMethod={initialData.shippingMethods} />
            </TabsContent>
            <TabsContent value="policies">
              <ShippingPoliciesForm policies={initialData.shippingPolicies} />
            </TabsContent>
            <TabsContent value="custom">
              <ShippingCustomPolicies customPolicies={initialData.customPolicies} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ShopShippingSettings;
