import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/pre-orders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/products/pre-orders"!</div>
}
