
import '../styles/global.css'

export const Home = () => {
    const smartContractAddress = '0x8005534f73B8E7b52484f20541c8108254AdA168'
    const smartContractUrl = `https://testnet.ftmscan.com/address/${smartContractAddress}`
    const fantomUrl = "https://fantom.foundation/"
    return(
        <div className='web-wrapper'>
            <h1 className="main-h1"> Información blockchain </h1>
            <div className='url-home-link'>
                <a className='blockchain-link' href={fantomUrl} target="_blank" rel="noreferrer"> Red de blockchain: Fantom </a>
            </div>

            <div className='url-home-link'>
                <a className='blockchain-link' href={smartContractUrl} target="_blank" rel="noreferrer"> Smart contract  </a>
            </div>
        </div>
       
    )
}