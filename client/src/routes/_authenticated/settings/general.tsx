import GeneralSettings from '@/components/custom/settings/general'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/general')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GeneralSettings />
}
