import { useState } from 'react'
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AddCircle } from '@mui/icons-material'

const AddFilm = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newFilm = {
      id: Date.now(),
      title,
      overview: description,
      release_date: releaseDate,
      poster_path: null,
      isLocal: true
    }

    const existing = JSON.parse(localStorage.getItem('localFilms') || '[]')
    localStorage.setItem('localFilms', JSON.stringify([newFilm, ...existing]))

    navigate('/')
  }

  return (
    <Box sx={{ mt: 6, px: { xs: 1, sm: 2 } }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7} lg={6}>
          <Card elevation={6} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
              <Box textAlign="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" className="section-title" gutterBottom>
                  <AddCircle sx={{ fontSize: 36, verticalAlign: 'middle', mr: 1 }} />
                  Ajouter un Film
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Veuillez remplir les informations ci-dessous pour ajouter un nouveau film à votre liste.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Titre du film"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <TextField
                  label="Date de sortie"
                  type="date"
                  variant="outlined"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    ':hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  Ajouter le film
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddFilm
