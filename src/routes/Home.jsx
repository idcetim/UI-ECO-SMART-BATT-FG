
import '../styles/global.css'

export const Home = () => {
    const smartContractAddress = '0x46196a39d26A4026A37AFD12eBf31831d3472634'
    const smartContractUrl = `https://testnet.ftmscan.com/address/${smartContractAddress}`
    return(
        <div className='web-wrapper'>
            <h1 className="main-h1"> Información blockchain </h1>
            <a className='blockchain-link' href={smartContractUrl} target="_blank" rel="noreferrer"> Smart contract utilizado </a> 
        
    
        </div>
       
    )
}