import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import Trazabilidad from "./routes/Trazabilidad";
import NavBar from "./routes/NavBar";
import LeerLotes from "./routes/LeerLotes";
import GestionStock from "./routes/GestionStock"
import Registro from "./routes/Registro"
import EditarTipos from "./routes/EditarTipos"
import { QueryClient, QueryClientProvider } from "react-query";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import Resumen from './routes/Resumen'

const queryClient = new QueryClient()

function App() {
  return (
    < div >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <NavBar />
          <Routes >
            <Route path="/" element={< Home />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/trazabilidad" element={< Trazabilidad />} />
            <Route path="/gestionstock" element={< GestionStock />} />
            <Route path="/leerlotes" element={< LeerLotes />} />
            <Route path="/registro" element={< Registro />} />
            <Route path="/EditarTipos" element={< EditarTipos />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider >
    </div>

  );
}

export default App;