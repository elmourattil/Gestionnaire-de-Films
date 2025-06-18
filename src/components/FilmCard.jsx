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
    <Card
      elevation={5}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8
        }
      }}
    >
      
      <Box sx={{ height: 300, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={film.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        />
      </Box>

     
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Movie fontSize="small" color="primary" />
          <Typography variant="h6" fontWeight="600" noWrap>
            {film.title}
          </Typography>
        </Box>

        {film.isLocal && (
          <Chip
            label="Ajouté manuellement"
            color="secondary"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}

        <Button
          variant="contained"
          size="small"
          fullWidth
          component={Link}
          to={`/film/${film.id}`}
          sx={{
            mt: 1,
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 2
          }}
        >
          Voir détails
        </Button>
      </CardContent>
    </Card>
  )
}

export default FilmCard
