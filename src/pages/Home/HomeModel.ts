import { searchMovies, type Movie } from '../../services/omdbMovieService'

export type { Movie }

const SEED_KEYWORDS = [
  'Batman', 'Avengers', 'Harry Potter', 'Star Wars', 'Spider-Man',
  'Marvel', 'Disney', 'Matrix', 'Lord of the Rings', 'Fast',
  'Mission Impossible', 'Pixar', 'Horror', 'Comedy', 'Action',
]

function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function initialMovies(): Promise<Movie[]> {
  const count = Math.min(SEED_KEYWORDS.length, 4)
  const picked = shuffle(SEED_KEYWORDS).slice(0, count)

  const results = await Promise.all(picked.map(keyword => searchMovies(keyword)))

  const merged = results.flat()

  const seen = new Set<string>()
  const unique = merged.filter(m => {
    if (seen.has(m.imdbID)) return false
    seen.add(m.imdbID)
    return true
  })

  return shuffle(unique).slice(0, 20)
}

export async function getMovies(query: string): Promise<Movie[]> {
  const trimmed = query.trim()

  if (trimmed.length < 2) {
    throw new Error('Query must contain at least two characters')
  }

  return searchMovies(trimmed)
}
