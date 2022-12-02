
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

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
	const handleCloseNavMenu = () => setAnchorElNav(null)

	const activeStyle = {
		color: '#c4be01'
	}
	return (
		<AppBar position="static">
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

						<Box sx={{ display: { xs: 'initial', md: 'none' }, width: '100%', display: 'flex', justifyContent: 'center' }}>
							<Link to="/">
								<img src={'ferroglobe500.png'} alt="Logo" style={{ width: '50px', cursor: 'pointer', marginRight: '25px' }} />
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
								<Typography textAlign='center' component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/trazabilidad'>Trazabilidad</Typography>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/gestionstock'>Gestion stock</Typography>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/registro'>Registro</Typography>
							</MenuItem>
						</Menu>
					</Box>

					{/* NAVBAR PARA TAMAÑO DE PANTALLA NORMAL */}
					{/* <Typography
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
					 */}

					<Box sx={{ display: { xs: 'none', md: 'initial' } }}>
						<Link to="/">
							<img src={'ferroglobe500.png'} alt="Logo" style={{ width: '50px', cursor: 'pointer', marginRight: '25px' }} />
						</Link>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/trazabilidad' sx={{ my: 2, color: 'white', display: 'block' }}>Trazabilidad</Button>
						<Button component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/gestionstock' sx={{ my: 2, color: 'white', display: 'block' }}>Gestion stock</Button>
						<Button component={NavLink} style={({ isActive }) => isActive ? activeStyle : null} to='/registro' sx={{ my: 2, color: 'white', display: 'block' }}>Registro</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

// export const myNavLink = ({  }) => { return <NavLink className="navLink" to={`/${text}`} />}

export default NavBar