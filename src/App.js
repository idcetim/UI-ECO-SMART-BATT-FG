
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./routes/Home"
import {Entradas} from "./routes/Entradas"
import {Produccion} from './routes/Produccion'
import {VerStockEntradas} from './routes/VerStockEntradas'
import {VerStockProduccion} from './routes/VerStockProduccion'
import Trazabilidad from "./routes/Trazabilidad";
import Stock from "./routes/Stock";
import NavBar from "./routes/NavBar";
import './styles/global.css'

function App() {
  return ( <div>
    <BrowserRouter >
    <NavBar />
    <Routes >
      <Route path = "/" element = { < Home /> }/> 
      <Route path = "/trazabilidad" element = { < Trazabilidad /> }/> 
      <Route path = "/stock" element={<Stock />} />
      <Route path = "/trazabilidad/entradas" element = { < Entradas /> }/> 
      <Route path = "/trazabilidad/produccion"element = { < Produccion/> }/>
      <Route path = "/trazabilidad/verentradas" element = { < VerStockEntradas /> }/> 
      <Route path = "/trazabilidad/verproduccion" element = { < VerStockProduccion /> }/> 
    </Routes> 
    </BrowserRouter>
    </div>
);
}

export default App;
