import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import Trazabilidad from "./routes/Trazabilidad";
import NavBar from "./routes/NavBar";
import LeerLotes from "./routes/LeerLotes";
import GestionStock from "./routes/GestionStock"
import Registro from "./routes/Registro"

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'

function App() {
  return (
    < div >
      <BrowserRouter >
        <NavBar />
        <Routes >
          <Route path="/" element={< Home />} />
          <Route path="/trazabilidad" element={< Trazabilidad />} />
          <Route path="/gestionstock" element={< GestionStock />} />
          <Route path="/leerlotes" element={< LeerLotes />} />
          <Route path="/registro" element={< Registro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;