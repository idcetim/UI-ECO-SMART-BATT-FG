import '../styles/navBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <nav className='nav'>
      <div className='navMenu'>
        <Link to='/' className='navLink' activeStyle>
        📦 Ferroglobe 
        </Link>
        <Link to='/trazabilidad' className='navLink' activeStyle>
        Trazabilidad 
        </Link>
        <Link to='/stock' className='navLink' activeStyle>
        Gestión stock 
        </Link>
      </div>
    </nav>
  )
}

export default NavBar