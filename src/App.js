import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import Trazabilidad from "./routes/Trazabilidad";
import NavBar from "./routes/NavBar";
import LeerLotes from "./routes/LeerLotes";
import GestionStock from "./routes/GestionStock"
import Registro from "./routes/Registro"
import EditarTipos from "./routes/EditarTipos"
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import Resumen from './routes/Resumen'
import { authorizationEndpoints } from "./api/endpoints";
import { CookiesProvider, useCookies } from 'react-cookie';
import { CircularProgress } from "@mui/material";
import Login from "./components/Login";

const queryClient = new QueryClient()

function App() {
  const [logeado, setLogeado] = useState(false)

  return (
    < div >
      <CookiesProvider>
        <CookiesWrapped />
      </CookiesProvider>
    </div>
  );
}

const CookiesWrapped = () => {
  const [logeado, setLogeado] = useState(null)
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    const callback = async () => {
      let response = await fetch(authorizationEndpoints.testAuthentification, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jwt: cookies['jwt'] })
      })

      if (response.ok) {
        setLogeado(true)

        return
      }

      setLogeado(false)
    }

    callback()

  }, [])


  if (logeado == null) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress />
      </div>
    )
  }

  if (logeado) {
    return <Contenido />
  }

  return <Login setLogeado={() => setLogeado(true)} setToken={(token) => setCookie("jwt", token)} />
}

const Contenido = () => {
  return (
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
  )
} 

export default App;