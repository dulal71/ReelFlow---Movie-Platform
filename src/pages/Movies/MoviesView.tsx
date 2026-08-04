import SectionHeader from '../../components/SectionHeader/SectionHeader'
import MovieCard from '../../components/LatestReleases/MovieCard'
import { FaSearch } from 'react-icons/fa'
import type { ReleaseMovie } from '../../data/latestReleases'
import type { Movie } from '../../services/omdbMovieService'

interface MoviesViewProps {
  movies: Movie[]
  loading: boolean
  error: string
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  handleSearch: () => Promise<void>
}

const fallbackPoster = (id: string) =>
  `https://picsum.photos/seed/reelflow-poster-${id}/500/750`

function toReleaseMovie(movie: Movie): ReleaseMovie {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : fallbackPoster(movie.imdbID)

  return {
    id: movie.imdbID,
    title: movie.Title,
    posterImage: poster,
    hoverImage: poster,
    year: movie.Year,
    genre: movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1),
  }
}

function MoviesView({ movies, loading, error, query, setQuery, handleSearch }: MoviesViewProps) {
  return (
    <div className="min-h-screen bg-[#121212] pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader title="Movies" />

        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleSearch()
          }}
          className="mt-8 max-w-xl mx-auto flex items-center bg-white/10 border border-white/15 rounded-full pl-5 pr-1.5 py-1.5 focus-within:border-red-500/60 transition-colors"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 flex-1"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white text-xs transition-colors cursor-pointer shrink-0"
          >
            <FaSearch />
          </button>
        </form>

        {loading && <p className="text-center text-gray-400 mt-10">Loading...</p>}

        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No movies found.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} movie={toReleaseMovie(movie)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoviesView
