import { useNavigate } from "react-router-dom";
import '../styles/global.css'
const Trazabilidad = () =>  {
  const navigate = useNavigate();
  const registrarHandler = () => {navigate('/trazabilidad/entradas/')}
  const produccionHandler = () => {navigate('/trazabilidad/produccion/')}
  const verStockEntradasHandler = () => {navigate('/trazabilidad/verentradas/')}
  const verStockProduccionHandler = () => {navigate('/trazabilidad/verproduccion/')}
  
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

export default Trazabilidad

