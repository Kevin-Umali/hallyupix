import ProductsInventory from "@/components/custom/products/inventory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/products/inventory")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductsInventory />;
}
