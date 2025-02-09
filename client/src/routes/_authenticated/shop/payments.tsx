import ShopPaymentSettings from "@/components/custom/shop/payments/payments";
import { getShopPaymentQueryOptions } from "@/lib/queries/shop.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/payments")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getShopPaymentQueryOptions());
  },
  component: () => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { data: shopPayment, isLoading, dataUpdatedAt } = useSuspenseQuery(getShopPaymentQueryOptions());
    /* eslint-enable react-hooks/rules-of-hooks */
    return <ShopPaymentSettings key={`shop-payments-${dataUpdatedAt}`} initialData={shopPayment ?? {}} isLoading={isLoading} />;
  },
});
