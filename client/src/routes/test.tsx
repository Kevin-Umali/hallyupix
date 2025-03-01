import ProductForm from "@/components/custom/products/product-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductForm />;
}
