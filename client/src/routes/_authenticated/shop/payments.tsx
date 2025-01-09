import ShopPaymentSettings from "@/components/custom/shop/payments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/payments")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShopPaymentSettings />;
}
