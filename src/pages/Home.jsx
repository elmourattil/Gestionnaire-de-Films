import { useEffect, useState } from 'react'
import { fetchPopularMovies } from '../services/api'
import FilmCard from '../components/FilmCard'
import {
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Container
} from '@mui/material'
import { ChevronLeft, ChevronRight, Whatshot } from '@mui/icons-material'

const Home = () => {
  const [localFilms, setLocalFilms] = useState([])
  const [apiFilms, setApiFilms] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const load = async () => {
      const { results } = await fetchPopularMovies(page)
      const local = JSON.parse(localStorage.getItem('localFilms') || '[]')

      setLocalFilms(local)
      setApiFilms(results)
    }

    load()
  }, [page])

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 5, px: 2 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          <Whatshot sx={{ mr: 1, verticalAlign: 'middle' }} />
          Films Populaires
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Découvrez les films les plus en vogue et vos films ajoutés localement.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      
      {localFilms.length > 0 && (
        <Box mb={3}>
          <Typography
  variant="h6"
  sx={{
    mb: 1,
    fontWeight: 'bold',
    color: 'warning.main'
  }}
>
  🎬 Mes films ajoutés manuellement
</Typography>

          <Grid container spacing={3} columns={12}>
            {localFilms.map((film) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={film.id} sx={{ display: 'flex' }}>
                <FilmCard film={film} />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />
        </Box>
      )}

      
      {apiFilms.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Aucun film à afficher.
        </Typography>
      ) : (
        <Grid container spacing={3} columns={12}>
          {apiFilms.map((film) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={film.id} sx={{ display: 'flex' }}>
              <FilmCard film={film} />
            </Grid>
          ))}
        </Grid>
      )}

    
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handlePrev}
          startIcon={<ChevronLeft />}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={<ChevronRight />}
        >
          Suivant
        </Button>
      </Box>
    </Container>
  )
}

export default Home
