import '../styles/global.css'
import '../styles/table.css'

export const TableLote = (props) => {
  console.log("props", {...props})
  const loteData = props.loteData
  const hashData = props.hashData
  console.log(hashData)
  const { Codigo, Fecha, Calidad, Origen, Cantidad, Analisis } = loteData
  return (
    <div className="table-div">
      <table>
        <tbody>
        <tr>
            <td><span className='title'>Información lote {Codigo} </span></td>
          </tr>
          <tr>
            <td><b>Código:</b> {Codigo}</td>
          </tr>
          <tr>
            <td><b>Fecha entrada:</b> {Fecha}</td>
          </tr>
          <tr>
            <td><b>Calidad:</b> {Calidad}</td>
          </tr>
          <tr>
            <td><b>Origen:</b> {Origen}</td>
          </tr>
          <tr>
            <td><b>Cantidad:</b> {Cantidad} kg</td>
          </tr>
          <tr>
            <td><b>Análisis:</b> {Analisis}</td>
          </tr>

        </tbody>
      </table>

    </div>
  )
}