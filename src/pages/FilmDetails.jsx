import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieDetails } from '../services/api'
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  CircularProgress
} from '@mui/material'
import { Star } from '@mui/icons-material'

const FilmDetails = () => {
  const { id } = useParams()
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFilm = async () => {
      const localFilms = JSON.parse(localStorage.getItem('localFilms') || '[]')
      const localFilm = localFilms.find(f => String(f.id) === id)

      if (localFilm) {
        setFilm(localFilm)
        setLoading(false)
      } else {
        try {
          const apiFilm = await getMovieDetails(id)
          setFilm(apiFilm)
        } catch (err) {
          console.error('Erreur récupération film TMDb:', err)
          setFilm(null)
        } finally {
          setLoading(false)
        }
      }
    }

    loadFilm()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (!film) {
    return (
      <Typography textAlign="center" color="error" mt={4}>
        Le film n'a pas pu être chargé.
      </Typography>
    )
  }

  const posterUrl = film.poster_path
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png'

  return (
    <Card
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        mt: 5,
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        boxShadow: 6,
        backgroundColor: 'background.paper'
      }}
    >
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={posterUrl}
            alt={film.title}
            sx={{
              borderRadius: 2,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" className="section-title" gutterBottom>
              {film.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {film.overview || 'Aucune description disponible.'}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <strong>Date de sortie :</strong> {film.release_date || 'Inconnue'}
            </Typography>

            {film.vote_average !== undefined && (
              <Chip
                icon={<Star />}
                label={`Note : ${film.vote_average} / 10 (${film.vote_count} votes)`}
                color="warning"
                sx={{ mt: 1 }}
              />
            )}

            {film.isLocal && (
              <Chip
                label="Ajouté manuellement"
                color="secondary"
                variant="outlined"
                sx={{ mt: 2, ml: 1 }}
              />
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default FilmDetails
