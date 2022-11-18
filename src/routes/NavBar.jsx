// import '../styles/navBar.css'
// import { Link } from 'react-router-dom'

// const NavBar = () => {
// 	return (
// 		<nav className='nav'>
// 			<div className='navMenu'>
// 				<Link to='/' className='navLink'>Ferroglobe</Link>
// 				<Link to='/trazabilidad' className='navLink'>Trazabilidad</Link>
// 				<Link to='/leerlotes' className='navLink'>Leer lotes</Link>

// 				{/* <Link to='/stock' className='navLink' activestyle>
//         Gestión stock 
//         </Link> */}
// 			</div>
// 		</nav>
// 	)
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'


const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
	const handleCloseNavMenu = () => setAnchorElNav(null)

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>LOGO</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
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
								<Link to='/'>
									<Typography textAlign='center'>Trazabilidad</Typography>
								</Link>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Link to='/'>
									<Typography textAlign='center'>Gestion stock</Typography>
								</Link>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Link to='/'>
									<Typography textAlign='center'>Registro</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</Box> 
					
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>LOGO</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{/* <Button component={Link} to='/' sx={{ my: 2, color: 'white', display: 'block' }}>Ferroglobe</Button>
						<Button component={Link} to='/trazabilidad' sx={{ my: 2, color: 'white', display: 'block' }}>Trazabilidad</Button>
						<Button component={Link} to='/leerlotes' sx={{ my: 2, color: 'white', display: 'block' }}>Leer lotes</Button> */}

						<Button component={Link} to='/trazabilidad' sx={{ my: 2, color: 'white', display: 'block' }}>Trazabilidad</Button>
						<Button component={Link} to='/gestionstock' sx={{ my: 2, color: 'white', display: 'block' }}>Gestion stock</Button>
						<Button component={Link} to='/registro' sx={{ my: 2, color: 'white', display: 'block' }}>Registro</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default NavBar