import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa'
import { signIn, signUp } from '../../services/auth'

type AuthMode = 'signin' | 'signup'

interface AuthModalProps {
  open: boolean
  onClose: () => void
  initialMode?: AuthMode
}

const inputClass =
  'bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full'

const CONNECTION_ERROR_MESSAGE =
  'The authentication server is not available right now. Please try again later.'

function getErrorMessage(err: unknown): string {
  if (err instanceof TypeError) {
    return CONNECTION_ERROR_MESSAGE
  }

  const errObj = err as { message?: unknown; status?: unknown } | null | undefined

  if (typeof errObj?.status === 'number' && errObj.status >= 500) {
    return CONNECTION_ERROR_MESSAGE
  }

  const message = typeof errObj?.message === 'string' ? errObj.message : ''

  if (
    !message ||
    /failed to fetch|network error|load failed|bad gateway|service unavailable|gateway timeout/i.test(
      message,
    )
  ) {
    return CONNECTION_ERROR_MESSAGE
  }

  return message || 'Something went wrong'
}

export default function AuthModal({ open, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setError('')
    }
  }, [open, initialMode])

  const switchMode = (next: AuthMode) => {
    setMode(next)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result =
        mode === 'signup'
          ? await signUp({ name, email, password })
          : await signIn({ email, password })

      if (result.error || !result.data) {
        const message = getErrorMessage(result.error ?? null)
        setError(message)
        toast.error(message)
        return
      }

      toast.success(mode === 'signup' ? 'Account created successfully' : 'Signed in successfully')
      onClose()
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-[#161616] border border-white/10 shadow-2xl shadow-black/60 p-6"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-extrabold text-white">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'signin' ? 'Welcome back to ReelFlow' : 'Join ReelFlow today'}
            </p>

            <div className="mt-5 flex bg-white/5 rounded-full p-1">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/60 transition-colors">
                  <FaUser className="text-gray-400 text-sm shrink-0" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              )}

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/60 transition-colors">
                <FaEnvelope className="text-gray-400 text-sm shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/60 transition-colors">
                <FaLock className="text-gray-400 text-sm shrink-0" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className={inputClass}
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'signin'
                    ? 'Sign In'
                    : 'Sign Up'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
