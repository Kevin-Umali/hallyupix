import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/pre-orders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/orders/pre-oders"!</div>
}
