
import '../styles/global.css'

export const Home = () => {
    const smartContractAddress = '0xc7B23f2ffCfe6b466308dF175AA15c6202aa2a82'
    const smartContractUrl = `https://testnet.ftmscan.com/address/${smartContractAddress}`
    return(
        <div className='web-wrapper'>
            <h1 className="main-h1"> Información blockchain </h1>
            <a className='blockchain-link' href={smartContractUrl} target="_blank" rel="noreferrer"> Smart contract utilizado </a> 
        
    
        </div>
       
    )
}