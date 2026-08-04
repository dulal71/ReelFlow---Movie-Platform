import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../../services/auth'

export default function ProtectedRoute() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
