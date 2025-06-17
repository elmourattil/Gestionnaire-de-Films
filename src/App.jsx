import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import AddFilm from './pages/AddFilm'
import FilmDetails from './pages/FilmDetails'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#f9f9f9' },
    background: { default: '#f9f9f9' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: { fontWeight: 600 }
  }
})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar />
    <Container sx={{ mt: 4 }}>
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
