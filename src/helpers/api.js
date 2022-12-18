import { selectListEndpoints } from "../api/endpoints"

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

export {
    getObjIdToCalidad,
    getObjIdToTamaño
}