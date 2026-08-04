export interface ReleaseMovie {
  id: string
  title: string
  posterImage: string
  hoverImage: string
  year: string
  language: string
  genre: string
  rating: number
}

const tmdb = (size: 'w500' | 'w780', path: string) =>
  `https://image.tmdb.org/t/p/${size}/${path}.jpg`

export const LATEST_RELEASES: ReleaseMovie[] = [
  {
    id: 'inception',
    title: 'Inception',
    posterImage: tmdb('w500', '9gk7adHYeDvHkCSEqAvQNLV5Uge'),
    hoverImage: tmdb('w780', '8ZTVqvKDQ8emSGUEMjsS4yHAwrp'),
    year: '2010',
    language: 'English',
    genre: 'Sci-Fi',
    rating: 8.8,
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    posterImage: tmdb('w500', 'gEU2QniE6E77NI6lCU6MxlNBvIx'),
    hoverImage: tmdb('w780', 'pbrkL804c8yAv3zBZR4QPEafpAR'),
    year: '2014',
    language: 'English',
    genre: 'Sci-Fi',
    rating: 8.7,
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    posterImage: tmdb('w500', 'qJ2tW6WMUDux911r6m7haRef0WH'),
    hoverImage: tmdb('w780', 'nMKdUUepR0i5zn0y1T4CsSB5chy'),
    year: '2008',
    language: 'English',
    genre: 'Action',
    rating: 9.0,
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    posterImage: tmdb('w500', 'f89U3ADr1oiB1s9GkdPOEpXUk5H'),
    hoverImage: tmdb('w780', 'oMsxZEvz9a708d49b6UdZK1KAo5'),
    year: '1999',
    language: 'English',
    genre: 'Sci-Fi',
    rating: 8.7,
  },
  {
    id: 'joker',
    title: 'Joker',
    posterImage: tmdb('w500', 'udDclJoHjfjb8Ekgsd4FDteOkCU'),
    hoverImage: tmdb('w780', 'hO7KbdvGOtDdeg0W4Y5nKEHeDDh'),
    year: '2019',
    language: 'English',
    genre: 'Crime',
    rating: 8.4,
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    posterImage: tmdb('w500', 'or06FN3Dka5tukK1e9sl16pB3iy'),
    hoverImage: tmdb('w780', '7RyHsO4yDXtBv1zUU3mTpHeQ0d5'),
    year: '2019',
    language: 'English',
    genre: 'Action',
    rating: 8.3,
  },
  {
    id: 'gladiator',
    title: 'Gladiator',
    posterImage: tmdb('w500', 'ty8TGRuvJLPUmAR1H1nRIsgwvim'),
    hoverImage: tmdb('w780', 'rzdPqYx7Um4FUZeD8wpXqjAUcEm'),
    year: '2000',
    language: 'English',
    genre: 'Action',
    rating: 8.5,
  },
  {
    id: 'the-godfather',
    title: 'The Godfather',
    posterImage: tmdb('w500', '3bhkrj58Vtu7enYsRolD1fZdja1'),
    hoverImage: tmdb('w780', '63y4XSVTZ7mRzAzkqwi3o0ajDZZ'),
    year: '1972',
    language: 'English',
    genre: 'Crime',
    rating: 9.2,
  },
  {
    id: 'parasite',
    title: 'Parasite',
    posterImage: tmdb('w500', '7IiTTgloJzvGI1TAYymCfbfl3vT'),
    hoverImage: tmdb('w780', '9BBTo63ANSmhC4e6r62OJFuK2GL'),
    year: '2019',
    language: 'Korean',
    genre: 'Thriller',
    rating: 8.5,
  },
  {
    id: 'the-shawshank-redemption',
    title: 'The Shawshank Redemption',
    posterImage: tmdb('w500', 'q6y0Go1tsGEsmtFryDOJo3dEmqu'),
    hoverImage: tmdb('w780', 'c3OHQncTAnKFhdOTX7D3LTW6son'),
    year: '1994',
    language: 'English',
    genre: 'Drama',
    rating: 9.3,
  },
]
