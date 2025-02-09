import ShopShippingSettings from "@/components/custom/shop/shipping/shipping";
import { getShopShippingQueryOptions } from "@/lib/queries/shop.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/shipping")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getShopShippingQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shopShipping, isLoading } = useSuspenseQuery(getShopShippingQueryOptions());
  return <ShopShippingSettings initialData={shopShipping ?? {}} />;
}
