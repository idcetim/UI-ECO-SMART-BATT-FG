import { useNavigate } from "react-router-dom";
import '../styles/global.css'

export const Home = () => {
    const navigate = useNavigate();
    const registrarHandler = () => {navigate('/entradas/')}
    const produccionHandler = () => {navigate('/produccion/')}
    const verStockEntradasHandler = () => {navigate('/verentradas/')}
    const verStockProduccionHandler = () => {navigate('/verproduccion/')}
    
    return(
        <div className='web-wrapper'>
            <h1 className="main-h1"> Gestión de stock</h1>
        
            <button className="button-home" onClick={registrarHandler}>Registrar entradas</button>
           
            <button className="button-home" onClick={produccionHandler}>Registrar producción</button>
            
            <button className="button-home" onClick={verStockEntradasHandler}>Ver entradas</button>
     
            <button className="button-home" onClick={verStockProduccionHandler}>Ver producción</button>
        </div>
       
    )
}