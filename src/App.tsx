import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import MoviesView from './pages/Movies/MoviesView'
import TvShowsView from './pages/TvShows/TvShowsView'
import VideoView from './pages/Video/VideoView'
import PagesView from './pages/Pages/PagesView'
import ProfileView from './pages/Profile/ProfileView'
import SubscribeView from './pages/Subscribe/SubscribeView'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'
import HeroBanner from './components/HeroBanner'
import Header from './components/Header'
import LatestReleases from './components/LatestReleases/LatestReleases'

function AppContent() {
  const { query, setQuery, movies, loading, error, handleSearch } = useHomeViewModel()
  const navigate = useNavigate()

  const onSubmit = () => {
    void handleSearch()
    navigate('/movies')
  }

  return (
    <>
      <Header query={query} setQuery={setQuery} onSubmit={onSubmit} />
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
        <Route
          path="/movies"
          element={
            <MoviesView
              movies={movies}
              loading={loading}
              error={error}
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
            />
          }
        />
        <Route path="/tv-shows" element={<TvShowsView />} />
        <Route path="/video" element={<VideoView />} />
        <Route path="/pages" element={<PagesView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfileView />} />
        </Route>
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
        <Toaster theme="dark" position="top-right" richColors />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
