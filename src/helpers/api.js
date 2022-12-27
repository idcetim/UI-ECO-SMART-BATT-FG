import { selectListEndpoints, ordenesTrabajoEndpoints } from "../api/endpoints"

const getObjIdToCalidad = async () => {
    let calidades = await (await fetch(selectListEndpoints.getCalidades)).json()

    let objIdToCalidad = {}
    objIdToCalidad.ids = []

    for (let calidad of calidades) {
        objIdToCalidad[calidad.id] = calidad.nombre
        objIdToCalidad.ids.push({
            id: calidad.id
        })
    }

    return objIdToCalidad
}

const getObjIdToTamaño = async () => {
    let tamaños = await (await fetch(selectListEndpoints.getSizes)).json()

    let objIdToTamaño = {}
    objIdToTamaño.ids = []

    for (let tamaño of tamaños) {
        objIdToTamaño[tamaño.id] = tamaño.nombre
        objIdToTamaño.ids.push({
            id: tamaño.id
        })
    }

    return objIdToTamaño
}

const getObjIdToProceso = async () => {
    let procesos = await (await fetch(selectListEndpoints.getProcesos)).json()

    let objIdToProceso = {}
    objIdToProceso.ids = []

    for (let proceso of procesos) {
        objIdToProceso[proceso.id] = proceso.nombre
        objIdToProceso.ids.push({
            id: proceso.id
        })
    }

    return objIdToProceso
}

const getObjIdToOrigen = async () => {
    let origenes = await (await fetch(selectListEndpoints.getOrigenes)).json()

    let objIdToOrigen = {}
    objIdToOrigen.ids = []

    for (let origen of origenes) {
        objIdToOrigen[origen.id] = origen.nombre
        objIdToOrigen.ids.push({
            id: origen.id
        })
    }

    return objIdToOrigen
}

const getObjIdToUbicacion = async () => {
    let ubicaciones = await (await fetch(selectListEndpoints.getUbicaciones)).json()

    let objIdToUbicacion = {}
    objIdToUbicacion.ids = []

    for (let ubicacion of ubicaciones) {
        objIdToUbicacion[ubicacion.id] = ubicacion.nombre
        objIdToUbicacion.ids.push({
            id: ubicacion.id
        })
    }

    return objIdToUbicacion
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
    getObjIdToUbicacion,
    getObjIdToOrigen,
    getOrdenesTrabajoIdYCodigo
}