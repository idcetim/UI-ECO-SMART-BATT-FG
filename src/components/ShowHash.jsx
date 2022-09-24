//import Web3 from 'web3'
import '../styles/showHash.css'

export const ShowHash = (props) => {
  const txHash = props?.txHash
  const fantomExplorer = "https://testnet.ftmscan.com/tx/" + txHash
  return (
    <div className='div-showTxHash'>
     <span className='span-hashTx'> ✅ Registro completado:</span> 
     <a className='hash-link' href={fantomExplorer} target="_blank" rel="noreferrer">Transacción blockchain</a> 
    </div>

  )
}