import ShopProfileSettings from "@/components/custom/shop/profile/profile";
import { getShopProfileQueryOptions } from "@/lib/queries/shop.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/profile")({
  loader: async ({ context }) => {
    const result = await context.queryClient.ensureQueryData(getShopProfileQueryOptions());

    return {
      shopProfile: result,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
   
  const { shopProfile } = Route.useLoaderData();
   
  return <ShopProfileSettings initialData={shopProfile ?? {}} />;
}
