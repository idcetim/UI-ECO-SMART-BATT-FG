import '../styles/global.css'
import '../styles/table.css'

export const TableLote = ({ loteData, type, hashData }) => {
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
              <td><b>Análisis:</b> <a className='' href={Analisis} target="_blank" rel="noreferrer">Ver análisis</a></td>
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
              <td><b>Orden trabajo:</b><a className='' href={OrdenUrl} target="_blank" rel="noreferrer">Ver orden de trabajo</a></td>
            </tr>
            <tr>
              <td><b>Químico:</b> <a className='' href={QuimicoUrl} target="_blank" rel="noreferrer">Ver análisis químico</a></td>
            </tr>
            <tr>
              <td><b>Granulometría:</b><a className='' href={GranulometriaUrl} target="_blank" rel="noreferrer">Ver granulometría</a></td>
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