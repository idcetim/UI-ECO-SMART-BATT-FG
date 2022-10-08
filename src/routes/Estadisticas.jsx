import { useState } from "react"
import { useEffect } from "react"
import { cantidadEntradas, cantidadProduccion } from "../api/endpoints"
import { Loading } from "../components/Loading"
import { ShowEstadisticas } from "../components/ShowEstadisticas"

export const Estadisticas = () => {
  const [amountsEntry, setAmountsEntry] = useState(null)
  const [amountsProduct, setAmountsProducto] = useState(null)

  useEffect(() => {
    (async function () {
      const res = await fetch(cantidadEntradas)
      if (res.ok) setAmountsEntry(await res.json())
      else setAmountsEntry(null)
    })()
  }, [])

  useEffect(() => {
    (async function () {
      const res = await fetch(cantidadProduccion)
      if (res.ok) setAmountsProducto(await res.json())
      else setAmountsProducto(null)
    })()
  }, [])


  if (amountsEntry === null || amountsProduct === null) return <div> <Loading text="Cargando" /></div>

  return (
    <div className="web-wrapper">
      <ShowEstadisticas amountsEntry = {amountsEntry} amountsProduct = {amountsProduct} />
    </div>

  )

}