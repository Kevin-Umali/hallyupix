import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/products/categories"!</div>
}
