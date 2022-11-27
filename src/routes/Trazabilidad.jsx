import React from 'react'
import {
	Tabs,
	Tab,
	Box,
	IconButton,
	TextField,
	TableCell,
	TableRow,
	TableContainer,
	Paper,
	Table,
	TableBody
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Modal from 'react-bootstrap/Modal';

const Trazabilidad = () => {
	const [currentTab, setCurrentTab] = React.useState(0)

	const tabChanged = (event, newValue) => {
		setCurrentTab(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={currentTab} onChange={tabChanged} aria-label="basic tabs example" centered>
					<Tab label="Órdenes de trabajo" {...a11yProps(0)} />
					<Tab label="Código de lote" {...a11yProps(0)} />
				</Tabs>
			</Box>

			<TabPanel value={currentTab} index={0}>
				<TrazabilidadPorOrdenesTrabajo />
			</TabPanel>

			<TabPanel value={currentTab} index={1}>
				<TrazabilidadPorCodigo />
			</TabPanel>
		</Box>
	)
}

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const TrazabilidadPorOrdenesTrabajo = () => {
	return (
		<>
		</>
	)
}

const TrazabilidadPorCodigo = () => {
	const [codigoBuscado, setCodigoBuscado] = React.useState(null)
	const [lote, setLote] = React.useState(null)
	const [loteOrigen, setLoteOrigen] = React.useState(null)

	React.useEffect(() => {
		if (codigoBuscado != null) {
			if (codigoBuscado === "FGI-10-11-22-3N") {
				setLote({
					codigo: 'FGI-10-11-22-3N',
					codigoOrigen: ["B200", "B330"],
					fecha: '23-11-22',
					ubicacion: 'Parking 2',
					cantidad: '670 kg',
					calidad: '3N',
					analisisQuimico: '',
					granulometria: '',
					ordenTrabajoAsociada: ''
				})
			}
			else {
				setLote(null)
			}
		}
	}, [codigoBuscado])

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '10px'
		}}>
			<SearchBar setCodigoBuscado={(codigo) => setCodigoBuscado(codigo)} />

			<TableContainer
				sx={{ width: '800px', maxWidth: '90%', marginTop: '30px' }}
				component={Paper}
			>
				<Table aria-label="simple table">
					<TableBody>
						<TableContent lote={lote} codigoBuscado={codigoBuscado} setLoteOrigen={(lote) => setLoteOrigen(lote)} />
					</TableBody>
				</Table>
			</TableContainer>

			<ModalCodigoOrigen loteOrigen={loteOrigen} removeLoteOrigen={() => setLoteOrigen(null)} />
		</ div>
	)
}

const SearchBar = (props) => {
	const [codigo, setCodigo] = React.useState("")

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: '600px',
			maxWidth: '90%'
		}}>
			<TextField
				id="search-bar"
				className="text"
				onInput={(e) => setCodigo(e.target.value)}
				label="Buscar código"
				variant="outlined"
				placeholder="Buscar..."
				size="large"
				style={{ flex: 1 }}
			/>

			<IconButton
				type="submit"
				aria-label="search"
				onClick={() => props.setCodigoBuscado(codigo)}
				style={{ marginLeft: '10px' }}
			>
				<SearchIcon style={{ fill: "blue" }} />
			</IconButton>
		</ div>
	)
}

const TableContent = (props) => {
	if (props.lote != null) {
		return (
			<>
				<TableRow>
					<TableCell component='th' scope='row'>Código de lote:</TableCell>
					<TableCell align='right'>{props.lote.codigo}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Código de lote de origen:</TableCell>
					<TableCell align='right'>
						{
							props.lote.codigoOrigen.map(codigo => {
								return (
									<a
										href="#"
										key={codigo}
										onClick={ev => {
											ev.preventDefault()

											props.setLoteOrigen(codigo)
										}}
										style={{
											marginLeft: '5px'
										}}>
											{codigo}
										</a>
								)
							})
						}
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Fecha:</TableCell>
					<TableCell align='right'>{props.lote.fecha}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Ubicación:</TableCell>
					<TableCell align='right'>{props.lote.ubicacion}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Cantidad:</TableCell>
					<TableCell align='right'>{props.lote.cantidad}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Calidad:</TableCell>
					<TableCell align='right'>{props.lote.calidad}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Análisis químico:</TableCell>
					<TableCell align='right'>{props.lote.analisisQuimico}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Granulometría:</TableCell>
					<TableCell align='right'>{props.lote.granulometria}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Orden de trabajo asociada:</TableCell>
					<TableCell align='right'>{props.lote.ordenTrabajoAsociada}</TableCell>
				</TableRow>
			</>
		)
	}

	if (props.codigoBuscado != null) {
		return (
			<TableRow>
				<TableCell
					colSpan={6}
					sx={{
						height: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					El lote buscado no existe
				</TableCell>
			</TableRow>
		)
	}

	return (
		<TableRow>
			<TableCell
				colSpan={6}
				sx={{
					height: '400px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				No hay lotes buscados
			</TableCell>
		</TableRow>
	)
}

const ModalCodigoOrigen = (props) => {
	const [lote, setLote] = React.useState(null)

	React.useEffect(() => {
		if (props.loteOrigen === "B330") {
			setLote({
				origen: "Puertollano",
				fecha: "23-11-22",
				cantidad: "670 kg",
				calidad: "3N",
				analisis: ""
			})
		}
		else {
			setLote(null)
		}
	}, [props.loteOrigen])

	return (
		<Modal show={props.loteOrigen != null} onHide={props.removeLoteOrigen}>
			<Modal.Header closeButton>
				<Modal.Title>{props.loteOrigen}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableBody>
							<ModalCodigoOrigenRows lote={lote} />
						</TableBody>
					</Table>
				</TableContainer>
			</Modal.Body>
		</Modal>
	)
}

const ModalCodigoOrigenRows = (props) => {
	if (props.lote != null) {
		return (
			<>
				<TableRow>
					<TableCell component='th' scope='row'>Origen:</TableCell>
					<TableCell align='right'>{props.lote.origen}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Fecha:</TableCell>
					<TableCell align='right'>{props.lote.fecha}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Cantidad:</TableCell>
					<TableCell align='right'>{props.lote.cantidad}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Calidad:</TableCell>
					<TableCell align='right'>{props.lote.calidad}</TableCell>
				</TableRow>

				<TableRow>
					<TableCell component='th' scope='row'>Análisis:</TableCell>
					<TableCell align='right'>{props.lote.analisis}</TableCell>
				</TableRow>
			</>
		)
	}

	return (
		<TableRow>
			<TableCell
				colSpan={6}
				sx={{
					height: '200px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				El lote buscado no existe
			</TableCell>
		</TableRow>
	)
}

export default Trazabilidad

