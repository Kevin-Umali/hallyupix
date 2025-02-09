import ShopProfileSettings from "@/components/custom/shop/profile/profile";
import { getShopProfileQueryOptions } from "@/lib/queries/shop.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/profile")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getShopProfileQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shopProfile, isLoading, dataUpdatedAt } = useSuspenseQuery(getShopProfileQueryOptions());
  return <ShopProfileSettings key={`shop-profile-${dataUpdatedAt}`} initialData={shopProfile ?? {}} isLoading={isLoading} />;
}
