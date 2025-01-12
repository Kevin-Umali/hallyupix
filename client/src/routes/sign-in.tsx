import { createFileRoute, redirect } from '@tanstack/react-router'
import AuthCard from '@/components/custom/auth/auth-card'
import SignInForm from '@/components/custom/auth/sign-in'
import { z } from 'zod'
import { APP_NAME } from '@/constant'

export const Route = createFileRoute('/sign-in')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    const { auth } = context

    if (auth) {
      if (!auth.user?.emailVerified) {
        throw redirect({
          to: '/verify-email',
        })
      }

      if (auth.isAuthenticated) {
        throw redirect({
          to: search.redirect ?? '/dashboard',
        })
      }
    }
  },
  component: SignIn,
})

function SignIn() {
  return (
    <AuthCard
      sideContent={{
        title: `Welcome back to ${APP_NAME}`,
        description:
          'Your trusted marketplace for authentic K-pop merchandise. Sign in to continue your journey.',
      }}
    >
      <SignInForm />
    </AuthCard>
  )
}
