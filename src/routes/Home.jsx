
import '../styles/global.css'
import styles from '../styles/Home.module.css'
import { Link } from 'react-router-dom'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InventoryIcon from '@mui/icons-material/Inventory';

export const Home = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
                Bienvenido!
            </h1>


            <div className={styles.grid}>
                <Link to="/trazabilidad" className={styles.card}>
                    <h2><ContentPasteSearchIcon />   Trazabilidad &rarr;</h2>
                    <p>Visualizar  información  de productos guardada en la blockchain.</p>
                </Link>

                <Link to="/gestionstock" className={styles.card}>
                    <h2><InventoryIcon />   Gestión stock &rarr;</h2>
                    <p>Ver y editar información del stock de materias primas y productos.</p>
                </Link>

                <Link to="/registro" className={styles.card}>
                    <h2><AppRegistrationIcon/> Registro &rarr;</h2>
                    <p>Registrar un nuevo lote de materias primas o productos.</p>
                </Link>
            </div>
        </div>
    )
}