import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Movie } from '@mui/icons-material'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        backgroundColor: '#0f172a', 
        color: '#fff'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Movie />
            Gestionnaire de Films
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavLink to="/" label="Accueil" active={isActive('/')} />
            <NavLink to="/recherche" label="Recherche" active={isActive('/recherche')} />
            <NavLink to="/ajouter" label="Ajouter" active={isActive('/ajouter')} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const NavLink = ({ to, label, active }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: active ? '#93c5fd' : '#ffffff',
      borderBottom: active ? '2px solid #93c5fd' : '2px solid transparent',
      borderRadius: 0,
      fontWeight: active ? 600 : 400,
      transition: 'all 0.3s',
      '&:hover': {
        color: '#93c5fd'
      }
    }}
  >
    {label}
  </Button>
)

export default Navbar
