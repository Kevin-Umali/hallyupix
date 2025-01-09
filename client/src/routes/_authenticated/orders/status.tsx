import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/status')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/orders/status"!</div>
}
