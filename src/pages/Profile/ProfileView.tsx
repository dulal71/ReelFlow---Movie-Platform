import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { signOut, useSession } from '../../services/auth'

function ProfileView() {
  const navigate = useNavigate()
  const { data: session, isPending } = useSession()
  const user = session?.user

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <span className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
            <FaUser className="text-2xl" />
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-4">
            You are not signed in
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Sign in to view your profile and watchlist.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24 pb-20 px-4 sm:px-8 lg:px-14 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-5">
          <span className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-extrabold">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{user.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-lg font-bold">Account</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-400">Email verified</dt>
              <dd className={user.emailVerified ? 'text-green-400' : 'text-yellow-400'}>
                {user.emailVerified ? 'Yes' : 'No'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-400">Member since</dt>
              <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>

        <button
          onClick={() => {
            void signOut().then(() => toast.success('Signed out successfully'))
          }}
          className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default ProfileView
