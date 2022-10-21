
import '../styles/global.css'

export const Home = () => {
    const smartContractAddress = '0x3532D9Ce801eE7343b06bfe848B16CFE09df8bDA'
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