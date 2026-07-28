const API_URL = 'https://www.omdbapi.com/'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface OmdbSearchResponse {
  Search?: Movie[]
  totalResults?: string
  Response: string
  Error?: string
}

export async function searchMovies(query: string): Promise<Movie[]> {
  console.log('1. searchMovies called with query:', query)

  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  console.log('2. API key found:', !!apiKey)

  if (!apiKey) {
    throw new Error('VITE_OMDB_API_KEY is not set')
  }

  const url = `${API_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}`
  console.log('3. Request URL:', url)

  const res = await fetch(url)
  console.log('4. Response status:', res.status)

  if (!res.ok) {
    throw new Error(`OMDb request failed with status ${res.status}`)
  }

  const data: OmdbSearchResponse = await res.json()
  console.log('5. Response data:', data)

  if (data.Response === 'False') {
    console.log('6. OMDb returned error:', data.Error)
    throw new Error(data.Error ?? 'OMDb returned an error')
  }

  console.log('6. Movies fetched successfully:', data.Search)

  return data.Search ?? []
}
