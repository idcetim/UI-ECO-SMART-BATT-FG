
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

            {/* <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>pages/index.tsx</code>
            </p> */}

            <div className={styles.grid}>
                <a href="https://nextjs.org/docs" className={styles.card}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ContentPasteSearchIcon />
                        <h2>Trazabilidad &rarr;</h2>
                    </div>
                    <p>Consulte la información registrada en la blockchain de las ordenes de trabajo.</p>
                </a>

                <a href="https://nextjs.org/learn" className={styles.card}>
                    <h2>Gestion stock &rarr;</h2>
                    <p>Explore el stock de productos y de materias primas.</p>
                </a>

                <a
                    href="https://github.com/vercel/next.js/tree/canary/examples"
                    className={styles.card}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AppRegistrationIcon />
                        <h2>Registro &rarr;</h2>
                    </div>
                    <p>Cree un nuevo registro para un producto terminado o materia prima.</p>
                </a>

                {/* <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                >
                    <h2>Deploy &rarr;</h2>
                    <p>
                        Instantly deploy your Next.js site to a public URL with Vercel.
                    </p>
                </a> */}
            </div>
        </div>
    )
}