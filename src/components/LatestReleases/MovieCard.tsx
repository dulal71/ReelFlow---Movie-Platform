import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaPlus, FaShareAlt, FaStar } from 'react-icons/fa'
import type { ReleaseMovie } from '../../data/latestReleases'

interface MovieCardProps {
  movie: ReleaseMovie
}

const fallbackPoster = (id: string) =>
  `https://picsum.photos/seed/reelflow-poster-${id}/500/750`

const fallbackHover = (id: string) =>
  `https://picsum.photos/seed/reelflow-hover-${id}/780/500`

function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false)
  const [posterLoaded, setPosterLoaded] = useState(false)
  const [posterSrc, setPosterSrc] = useState(movie.posterImage)
  const [hoverSrc, setHoverSrc] = useState(movie.hoverImage)

  const setActive = (active: boolean) => setHovered(active)

  return (
    <motion.div
      className="group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer select-none"
      initial={false}
      animate={{ scale: hovered ? 1.03 : 1, boxShadow: hovered ? '0 0 35px rgba(239,68,68,0.35)' : '0 0 0px rgba(0,0,0,0)' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setActive(true)
      }}
      tabIndex={0}
      role="group"
      aria-label={`${movie.title} (${movie.year})`}
    >
      {/* skeleton */}
      <AnimatePresence>
        {!posterLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-800 animate-pulse"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* poster */}
      <motion.img
        src={posterSrc}
        alt={movie.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={() => setPosterLoaded(true)}
        onError={() => setPosterSrc(fallbackPoster(movie.id))}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* hover backdrop */}
      <motion.img
        src={hoverSrc}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setHoverSrc(fallbackHover(movie.id))}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* dark gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* rating badge (default state) */}
      {movie.rating !== undefined && (
        <motion.div
          className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <FaStar className="text-[10px]" />
          {movie.rating.toFixed(1)}
        </motion.div>
      )}

      {/* hover content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* center play button */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <span
                  className="absolute inset-0 rounded-full bg-red-500/60 animate-ping"
                  style={{ animationDuration: '1.8s' }}
                />
                <motion.button
                  type="button"
                  aria-label={`Play ${movie.title}`}
                  onClick={() => {}}
                  className="relative w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/40 cursor-pointer"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <FaPlay className="text-lg translate-x-[2px]" />
                </motion.button>
              </div>
            </div>

            {/* bottom info */}
            <div className="p-4">
              <h3 className="text-white font-bold text-base leading-snug line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                {movie.year}
                {movie.language ? ` · ${movie.language}` : ''}
              </p>
              <p className="text-red-500 text-xs font-semibold mt-0.5 uppercase tracking-wider">
                {movie.genre}
              </p>

              {/* action buttons */}
              <div className="flex justify-end gap-2 mt-3">
                <motion.button
                  type="button"
                  aria-label={`Add ${movie.title} to watchlist`}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <FaPlus className="text-xs" />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label={`Share ${movie.title}`}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <FaShareAlt className="text-xs" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MovieCard
