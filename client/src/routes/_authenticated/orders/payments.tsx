import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/orders/payments"!</div>
}
