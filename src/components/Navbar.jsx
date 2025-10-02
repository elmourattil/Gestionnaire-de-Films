import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Movie, Menu as MenuIcon } from '@mui/icons-material'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const [open, setOpen] = React.useState(false)

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/recherche', label: 'Recherche' },
    { to: '/ajouter', label: 'Ajouter' }
  ]

  return (
    <AppBar position="sticky" elevation={6} className="nav-blur" sx={{ color: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Movie />
            Gestionnaire de Films
          </Button>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} label={l.label} active={isActive(l.to)} />
            ))}
          </Box>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', sm: 'none' }, color: '#fff' }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, bgcolor: '#0b1020', height: '100%', color: '#fff' }} role="presentation" onClick={() => setOpen(false)}>
          <Typography variant="h6" sx={{ px: 2, py: 2, fontWeight: 700 }}>Menu</Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <List>
            {links.map(l => (
              <ListItem key={l.to} disablePadding>
                <ListItemButton component={Link} to={l.to} selected={isActive(l.to)}>
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
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
