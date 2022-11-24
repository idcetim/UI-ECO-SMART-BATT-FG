
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'

import '../styles/navBar.css'

import MenuIcon from '@mui/icons-material/Menu'

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
	const handleCloseNavMenu = () => setAnchorElNav(null)
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					{/* NAVBAR PARA TAMAÑO DE PANTALLA PEQUEÑO */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							edge= "start"
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to='/trazabilidad'>
									<Typography textAlign='center'>Trazabilidad</Typography>
								</NavLink>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to='/gestionstock'>
									<Typography textAlign='center'>Gestion stock</Typography>
								</NavLink>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to='/registro'>
									<Typography textAlign='center'>Registro</Typography>
								</NavLink>
							</MenuItem>
						</Menu>
					</Box>

			{/* NAVBAR PARA TAMAÑO DE PANTALLA NORMAL */}
					<Typography
						variant="h6"
						noWrap
						component={NavLink}
						to="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>FERROGLOBE</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{/* <Button component={Link} to='/' sx={{ my: 2, color: 'white', display: 'block' }}>Ferroglobe</Button>
						<Button component={Link} to='/trazabilidad' sx={{ my: 2, color: 'white', display: 'block' }}>Trazabilidad</Button>
						<Button component={Link} to='/leerlotes' sx={{ my: 2, color: 'white', display: 'block' }}>Leer lotes</Button> */}

						<Button component={NavLink} to={`/trazabilidad`} activeClassName="active" sx={{ my: 2, color: 'white', display: 'block' }}>Trazabilidad</Button>
						<Button component={NavLink} to={`/gestionstock`}   sx={{ my: 2, color: 'white', display: 'block' }}>Gestion stock</Button>
						<Button component={NavLink} to={`/registro`}  sx={{ my: 2, color: 'white', display: 'block' }}>Registro</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

// export const myNavLink = ({  }) => { return <NavLink className="navLink" to={`/${text}`} />}

export default NavBar