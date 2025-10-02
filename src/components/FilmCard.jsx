import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  Chip
} from '@mui/material'
import { Movie } from '@mui/icons-material'

const FilmCard = ({ film }) => {
  const posterUrl = film.poster_path
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png'

  return (
    <Card elevation={6} className="film-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" image={posterUrl} alt={film.title} className="film-media" />

      <CardContent sx={{ flexGrow: 1, p: 2.2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1.2}>
          <Movie fontSize="small" color="primary" />
          <Typography variant="h6" fontWeight="700" noWrap>{film.title}</Typography>
        </Box>

        {film.isLocal && (
          <Chip label="Ajouté manuellement" color="secondary" size="small" variant="outlined" sx={{ mb: 1.5 }} />
        )}

        <Button
          variant="contained"
          size="medium"
          fullWidth
          component={Link}
          to={`/film/${film.id}`}
          sx={{ mt: 1, textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
        >
          Voir détails
        </Button>
      </CardContent>
    </Card>
  )
}

export default FilmCard
