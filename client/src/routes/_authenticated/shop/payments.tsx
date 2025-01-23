import ShopPaymentSettings from "@/components/custom/shop/payments/payments";
import { getShopPaymentQueryOptions } from "@/lib/queries/shop.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/payments")({
  loader: async ({ context }) => {
    const shopPayment = await context.queryClient.ensureQueryData(getShopPaymentQueryOptions());
    return { shopPayment };
  },
  component: () => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { shopPayment } = Route.useLoaderData();
    /* eslint-enable react-hooks/rules-of-hooks */
    return <ShopPaymentSettings initialData={shopPayment ?? {}} />;
  },
});
