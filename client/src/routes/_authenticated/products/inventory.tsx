import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/inventory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/products/inventory"!</div>
}
