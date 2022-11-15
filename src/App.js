
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import { Entradas } from "./routes/Entradas"
import { Produccion } from './routes/Produccion'
import { VerStockEntradas } from './routes/VerStockEntradas'
import { VerStockProduccion } from './routes/VerStockProduccion'
import { Estadisticas } from "./routes/Estadisticas";
import { AddAnalisisEntrada } from "./routes/AddAnalisisEntrada";
import { AddAnalisisProduct } from "./routes/AddAnalisisProduct";
import Trazabilidad from "./routes/Trazabilidad";
import Stock from "./routes/Stock";
import NavBar from "./routes/NavBar";
import './styles/global.css'
import LeerLotes from "./routes/LeerLotes.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return ( <div>
    <BrowserRouter >
    <NavBar />
    <Routes >
      <Route path = "/" element = { < Home /> }/> 
      <Route path = "/trazabilidad" element = { < Trazabilidad /> }/> 
      <Route path = "/stock" element={<Stock />} />
      <Route path = "/leerlotes" element={ <LeerLotes />} />
      <Route path = "/trazabilidad/entradas" element = { < Entradas /> }/> 
      <Route path = "/trazabilidad/entradas/analisis" element = { < AddAnalisisEntrada /> }/> 
      <Route path = "/trazabilidad/produccion"element = { < Produccion/> }/>
      <Route path = "/trazabilidad/produccion/analisis"element = { < AddAnalisisProduct/> }/>
      <Route path = "/trazabilidad/verentradas" element = { < VerStockEntradas /> }/> 
      <Route path = "/trazabilidad/verproduccion" element = { < VerStockProduccion /> }/> 
      <Route path = "/trazabilidad/estadisticas" element = { < Estadisticas /> }/> 
    </Routes> 
    </BrowserRouter>
    </div>
);
}

export default App;
