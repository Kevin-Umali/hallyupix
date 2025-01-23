import ShopShippingSettings from "@/components/custom/shop/shipping/shipping";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/shipping")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShopShippingSettings />;
}
