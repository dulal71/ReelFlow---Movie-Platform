import SectionHeader from '../../components/SectionHeader/SectionHeader'
import MovieCard from '../../components/LatestReleases/MovieCard'
import { LATEST_RELEASES } from '../../data/latestReleases'

function MoviesView() {
  return (
    <div className="min-h-screen bg-[#121212] pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader title="Movies" />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {LATEST_RELEASES.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoviesView
