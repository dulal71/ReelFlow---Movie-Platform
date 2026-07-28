import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'

function App() {
  const { query, setQuery, movies, loading, error, handleSearch } = useHomeViewModel()

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<HomeView movies={movies} loading={loading} error={error} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
