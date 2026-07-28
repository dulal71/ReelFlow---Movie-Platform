import type { Movie } from './HomeModel'
import MovieCard from '../../components/MovieCard/MovieCard'

interface HomeViewProps {
  movies: Movie[]
  loading: boolean
  error: string
}

function HomeView({ movies, loading, error }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default HomeView
