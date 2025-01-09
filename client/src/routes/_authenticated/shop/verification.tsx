import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/shop/verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/shop/verification"!</div>
}
