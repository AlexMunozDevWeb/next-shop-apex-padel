import { auth } from '@/auth.config'
import { Title } from '@/modules/components'
import { redirect } from 'next/navigation'

export default async function name() {
  const session = await auth()

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect('/')
  }

  return (
    <div>
      <Title
        className=""
        title="Página de perfil"
      />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <h3 className="mb-10 text-3xl">{session.user.role}</h3>
    </div>
  )
}
