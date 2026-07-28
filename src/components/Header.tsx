import { Link } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

interface HeaderProps {
  query: string
  setQuery: (q: string) => void
  handleSearch: () => void
}

function Header({ query, setQuery, handleSearch }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <header className="flex items-center justify-center gap-6 px-8 py-4 bg-[#1a1a2e] text-white relative">
      <Link to="/" className="absolute left-8 text-lg font-bold text-[#e94560] no-underline">
        ReelFlow
      </Link>

      <nav className="flex gap-4">
        <Link to="/" className="text-[#a0a0b0] font-medium no-underline hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/favourites" className="text-[#a0a0b0] font-medium no-underline hover:text-white transition-colors">
          Favourites
        </Link>
      </nav>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-3 py-1.5 border border-[#333] rounded bg-[#16213e] text-white outline-none placeholder-[#666]"
        />
        <button
          type="submit"
          className="px-4 py-1.5 border-none rounded bg-[#e94560] text-white font-semibold cursor-pointer hover:bg-[#d63851] transition-colors"
        >
          Search
        </button>
      </form>

      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute right-8 p-2 rounded text-[#a0a0b0] hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
      </button>
    </header>
  )
}

export default Header
