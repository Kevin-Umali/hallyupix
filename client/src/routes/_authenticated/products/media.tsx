import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/media')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/products/media"!</div>
}
