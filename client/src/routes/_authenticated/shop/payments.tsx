import ShopPaymentSettings from "@/components/custom/shop/payments/payments";
import { getShopPaymentQueryOptions } from "@/lib/queries/shop.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/payments")({
  loader: async ({ context }) => {
    const result = await context.queryClient.ensureQueryData(getShopPaymentQueryOptions());

    return {
      shopPayment: result,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return <ShopPaymentSettings initialData={data?.shopPayment ?? {}} />;
}
