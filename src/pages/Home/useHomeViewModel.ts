import { useEffect, useState } from 'react'
import { getMovies, initialMovies, type Movie } from './HomeModel'

export function useHomeViewModel() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    initialMovies()
      .then(setMovies)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load initial movies'))
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await getMovies(query)
      setMovies(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { query, setQuery, movies, loading, error, handleSearch }
}
