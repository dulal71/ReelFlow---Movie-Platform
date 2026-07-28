import type { Movie } from '../../services/omdbMovieService'

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
        alt={movie.Title}
        className="w-full h-[350px] object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{movie.Year} • {movie.Type}</p>
        <button
          type="button"
          className="w-full px-3 py-1.5 text-sm rounded bg-[#e94560] text-white font-semibold cursor-pointer hover:bg-[#d63851] transition-colors"
        >
          Favourite
        </button>
      </div>
    </div>
  )
}

export default MovieCard
