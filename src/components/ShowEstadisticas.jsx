import '../styles/table.css'
export const ShowEstadisticas = ({ amountsEntry, amountsProduct }) => {
return (
  <>
    <div className="table-div">
      <table>
        <tbody>
          <tr>
            <td><span className='title'>Estadísticas Entradas </span></td>
          </tr>
          <tr>
            <td><b>Cantidad 2N:</b> {amountsEntry.amount2N} Kg</td>
          </tr>
          <tr>
          <td><b>Cantidad 3N:</b> {amountsEntry.amount3N} Kg</td>
          </tr>
          <tr>
          <td><b>Cantidad 4N:</b> {amountsEntry.amount4N} Kg</td>
          </tr>
          <tr>
          <td><b>Cantidad 5N:</b> {amountsEntry.amount5N} Kg</td>
          </tr>
          <tr>
          <td><b>Cantidad Reciclado:</b> {amountsEntry.amountReciclado} Kg</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="table-div">
      <table>
        <tbody>
          <tr>
            <td><span className='title'>Estadísticas Producción </span></td>
          </tr>
          <tr>
            <td><b>Cantidad (0.2 - 2 mm):</b> {amountsProduct.amount02} Kg</td>
          </tr>
          <tr>
          <td><b>Cantidad {"(< 0.5 mm)"}:</b> {amountsProduct.amount05} Kg</td>
          </tr>
  
        </tbody>
      </table>
    </div>

    </>
  )
}