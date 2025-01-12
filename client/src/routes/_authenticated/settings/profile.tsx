import ProfileSettings from '@/components/custom/settings/profile'
import { createImageData } from '@/lib/utils'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({
    strict: false,
  })

  return (
    <ProfileSettings
      initialData={{
        id: auth?.user?.id ?? '',
        name: auth?.user?.name ?? '',
        username: auth?.user?.username ?? '',
        email: auth?.user?.email ?? '',
        bio: auth?.user?.bio ?? '',
        role: auth?.user?.role ?? 'Seller',
        emailVerified: auth?.user?.emailVerified ?? false,
        createdAt: auth?.user?.createdAt.toDateString() ?? '',
        image: createImageData(auth?.user?.image),
      }}
    />
  )
}
