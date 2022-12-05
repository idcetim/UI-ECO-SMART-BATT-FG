
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import '../styles/navbar.css'

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
	const handleCloseNavMenu = () => setAnchorElNav(null)

	const activeStyleBig = {
		color: 'yellow',
		textDecoration: "underline"
	}

	const actveStyleSmall = {
		color: '#7c6901'
	}

	const smallScreenLinkStyle = { color: "black", textDecoration: "none", textTransform: "uppercase", fontSize: "13px", fontWeight: "bold" }

	return (
		<AppBar position="static" sx={{background: "grey"}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					{/* NAVBAR PARA TAMAÑO DE PANTALLA PEQUEÑO */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							edge="start"
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						<Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', justifyContent: 'center' }}>
							<Link to="/">
								<img src={'ferroglobe500.png'} alt="Logo" style={{ width: '60px', cursor: 'pointer', marginRight: '25px' }} />
							</Link>
						</Box>

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
								<Typography textAlign='center' component={NavLink} className="small-navlink" style={({ isActive }) => isActive ? actveStyleSmall : null} to='/trazabilidad' sx={smallScreenLinkStyle}>Trazabilidad</Typography>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component={NavLink} className="small-navlink" style={({ isActive }) => isActive ? actveStyleSmall : null} to='/gestionstock' sx={ smallScreenLinkStyle }>Gestion stock</Typography>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component={NavLink} className="small-navlink" style={({ isActive }) => isActive ? actveStyleSmall : null} to='/registro' sx={smallScreenLinkStyle}>Registro</Typography>
							</MenuItem>
						</Menu>
					</Box>

					{/* NAVBAR PARA TAMAÑO DE PANTALLA NORMAL */}

					<Box sx={{ display: { xs: 'none', md: 'initial' } }}>
						<Link to="/">
							<img src={'ferroglobe500.png'} alt="Logo" style={{ width: '60px', cursor: 'pointer', marginRight: '25px' }} />
						</Link>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button component={NavLink} className="navlink" style={({ isActive }) => isActive ? activeStyleBig : null} to='/trazabilidad' sx={{ my: 2, color: 'black', display: 'block' }}>Trazabilidad</Button>
						<Button component={NavLink} className="navlink" style={({ isActive }) => isActive ? activeStyleBig : null} to='/gestionstock' sx={{ my: 2, color: 'black', display: 'block' }}>Gestion stock</Button>
						<Button component={NavLink} className="navlink" style={({ isActive }) => isActive ? activeStyleBig : null} to='/registro' sx={{ my: 2, color: 'black', display: 'block' }}>Registro</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

// export const myNavLink = ({  }) => { return <NavLink className="navLink" to={`/${text}`} />}

export default NavBar