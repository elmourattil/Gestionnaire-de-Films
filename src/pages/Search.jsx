import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { searchMovies } from '../services/api'
import FilmCard from '../components/FilmCard'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    const films = await searchMovies(query)
    setResults(films)
    setHasSearched(true)
  }

  return (
    <Box sx={{ mt: 6, px: 2 }}>
      <Card
        elevation={5}
        sx={{
          maxWidth: 720,
          mx: 'auto',
          p: 4,
          borderRadius: 4,
          backgroundColor: 'background.paper'
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <SearchIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              Recherche de Films
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" align="center" mb={2}>
            Entrez un mot-clé pour rechercher un film via TMDb.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSearch}>
            <TextField
              label="Mot-clé"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                ':hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Rechercher
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <Box sx={{ mt: 6 }}>
          {results.length > 0 ? (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 600, mb: 3 }}
              >
                🎞️ Résultats de la recherche
              </Typography>

              <Grid container spacing={3}>
                {results.map((film) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
                    <FilmCard film={film} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              Aucun film trouvé pour votre recherche.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Search
