import { selectListEndpoints, ordenesTrabajoEndpoints } from "../api/endpoints"

const getObjIdToCalidad = async () => {
    let calidades = await (await fetch(selectListEndpoints.getCalidades)).json()

    let objIdToCalidad = {}

    for (let calidad of calidades) {
        objIdToCalidad[calidad.id] = calidad.nombre
    }

    return objIdToCalidad
}

const getObjIdToTamaño = async () => {
    let tamaños = await (await fetch(selectListEndpoints.getSizes)).json()

    let objIdToTamaño = {}

    for (let tamaño of tamaños) {
        objIdToTamaño[tamaño.id] = tamaño.nombre
    }

    return objIdToTamaño
}

const getObjIdToProceso = async () => {
    let procesos = await (await fetch(selectListEndpoints.getProcesos)).json()

    let objIdToProceso = {}

    for (let proceso of procesos) {
        objIdToProceso[proceso.id] = proceso.nombre
    }

    return objIdToProceso
}

const getOrdenesTrabajoIdYCodigo = async () => {
    let ordenesTrabajo = await (await fetch(ordenesTrabajoEndpoints.getOT)).json()

    let ordenesTrabajoIdYCodigo = []

    for (let ordenTrabajo of ordenesTrabajo) {
        ordenesTrabajoIdYCodigo.push({
            id: ordenTrabajo.id,
            codigo: ordenTrabajo.codigo
        })
    }
}

export {
    getObjIdToCalidad,
    getObjIdToTamaño,
    getObjIdToProceso,
    getOrdenesTrabajoIdYCodigo
}