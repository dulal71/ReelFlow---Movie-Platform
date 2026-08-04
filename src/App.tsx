import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import MoviesView from './pages/Movies/MoviesView'
import TvShowsView from './pages/TvShows/TvShowsView'
import VideoView from './pages/Video/VideoView'
import PagesView from './pages/Pages/PagesView'
import ProfileView from './pages/Profile/ProfileView'
import SubscribeView from './pages/Subscribe/SubscribeView'
import HeroBanner from './components/HeroBanner'
import Header from './components/Header'
import LatestReleases from './components/LatestReleases/LatestReleases'

function AppContent() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => navigate('/movies')

  return (
    <>
      <Header query={query} setQuery={setQuery} onSubmit={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroBanner />
              <LatestReleases />
            </>
          }
        />
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/tv-shows" element={<TvShowsView />} />
        <Route path="/video" element={<VideoView />} />
        <Route path="/pages" element={<PagesView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/subscribe" element={<SubscribeView />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
