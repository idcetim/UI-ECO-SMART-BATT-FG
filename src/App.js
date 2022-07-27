
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./routes/Home"
import {Entradas} from "./routes/Entradas"
import {Produccion} from './routes/Produccion'
import {VerStockEntradas} from './routes/VerStockEntradas'
import {VerStockProduccion} from './routes/VerStockProduccion'

function App() {
  return ( <div >
    <BrowserRouter >
    <Routes >
      <Route path = "/" element = { < Home /> }/> 
      <Route path = "/entradas" element = { < Entradas /> }/> 
      <Route path = "/produccion"element = { < Produccion/> }/>
      <Route path = "/verentradas" element = { < VerStockEntradas /> }/> 
      <Route path = "/verproduccion" element = { < VerStockProduccion /> }/> 
    </Routes> 
    </BrowserRouter>
    </div>
);
}

export default App;
