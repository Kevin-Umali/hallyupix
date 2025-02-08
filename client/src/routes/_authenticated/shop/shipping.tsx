import ShopShippingSettings from "@/components/custom/shop/shipping/shipping";
import { getShopShippingQueryOptions } from "@/lib/queries/shop.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/shipping")({
  loader: async ({ context }) => {
    const shopShipping = await context.queryClient.ensureQueryData(getShopShippingQueryOptions());
    return { shopShipping };
  },
  component: RouteComponent,
});

function RouteComponent() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { shopShipping } = Route.useLoaderData();
  /* eslint-enable react-hooks/rules-of-hooks */
  return <ShopShippingSettings initialData={shopShipping ?? {}} />;
}
