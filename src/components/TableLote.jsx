import '../styles/global.css'
import '../styles/table.css'

export const TableLote = (props) => {
  const type = props.type
  const hashData = props.hashData
  const loteData = props.loteData
  const fantomExplorer = `https://testnet.ftmscan.com/tx/${hashData}`
  if (type === "Entry") {
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
            <tr>
              <td><b>Blockchain: </b><a className='' href={fantomExplorer} target="_blank" rel="noreferrer">Ver transacción</a> </td>
            </tr>

          </tbody>
        </table>

      </div>
    )
  } else {
    const { Codigo, CodigoOrigen, Fecha, Tipo, Calidad, GranulometriaUrl, Cantidad, QuimicoUrl, OrdenUrl } = loteData
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
              <td><b>Código origen:</b> {CodigoOrigen}</td>
            </tr>
            <tr>
              <td><b>Fecha entrada:</b> {Fecha}</td>
            </tr>
            <tr>
              <td><b>Calidad:</b> {Calidad}</td>
            </tr>
            <tr>
              <td><b>Tipo:</b> {Tipo}</td>
            </tr>
            <tr>
              <td><b>Cantidad:</b> {Cantidad} kg</td>
            </tr>
            <tr>
              <td><b>Orden trabajo:</b> {OrdenUrl}</td>
            </tr>
            <tr>
              <td><b>Químico:</b> {QuimicoUrl}</td>
            </tr>
            <tr>
              <td><b>Granulometría:</b> {GranulometriaUrl}</td>
            </tr>
            <tr>
              <td><b>Blockchain: </b><a className='' href={fantomExplorer} target="_blank" rel="noreferrer">Ver transacción</a> </td>
            </tr>

          </tbody>
        </table>

      </div>
    )
  }

}