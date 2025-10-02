import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import AddFilm from './pages/AddFilm'
import FilmDetails from './pages/FilmDetails'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2563eb' },
    secondary: { main: '#94a3b8' },
    background: { default: '#0b1020', paper: '#0f172a' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    h4: { fontWeight: 700 }
  }
})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar />
    <Container className="app-container" sx={{ mt: 4 }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recherche' element={<Search />} />
        <Route path='/ajouter' element={<AddFilm />} />
        <Route path='/film/:id' element={<FilmDetails />} />
      </Routes>
    </Container>
  </ThemeProvider>
)

export default App
