
import '../styles/global.css'
import styles from '../styles/Home.module.css'
import { Link } from 'react-router-dom'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// export const Home = () => {
//     const smartContractAddress = '0x3532D9Ce801eE7343b06bfe848B16CFE09df8bDA'
//     const smartContractUrl = `https://testnet.ftmscan.com/address/${smartContractAddress}`
//     const fantomUrl = "https://fantom.foundation/"
//     return(
//         <div className='web-wrapper'>
//             <h1 className="main-h1"> Información blockchain </h1>
//             <div className='url-home-link'>
//                 <a className='blockchain-link' href={fantomUrl} target="_blank" rel="noreferrer"> Red de blockchain: Fantom </a>
//             </div>

//             <div className='url-home-link'>
//                 <a className='blockchain-link' href={smartContractUrl} target="_blank" rel="noreferrer"> Smart contract  </a>
//             </div>
//         </div>

//     )
// }

export const Home = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
                Bienvenido!
            </h1>


            <div className={styles.grid}>
                <Link to="/trazabilidad" className={styles.card}>
                    <h2>Trazabilidad &rarr;</h2>
                    <p>Visualizar  información  de productos guardada en la blockchain.</p>
                </Link>

                <Link to="/gestionstock" className={styles.card}>
                    <h2>Gestión stock &rarr;</h2>
                    <p>Ver y editar información del stock de materias primas y productos.</p>
                </Link>

                <Link to="/registro" className={styles.card}>
                    <h2>Registro &rarr;</h2>
                    <p>Registrar un nuevo lote de materias primas o productos.</p>
                </Link>
            </div>
        </div>
    )
}