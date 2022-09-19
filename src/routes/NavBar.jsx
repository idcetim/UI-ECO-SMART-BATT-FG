import '../styles/navBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <nav className='nav'>
      <div className='navMenu'>
        <Link to='/' className='navLink' activeStyle>
        📦 Gestión de stock 
        </Link>
      </div>
    </nav>
  )
}

export default NavBar