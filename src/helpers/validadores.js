import { esPorcentaje } from './methods'

const validarMateriasPrimas = (materiaPrima) => {
    let resultado = {
        mensajeError: "",
        errorValidacion: false
    }

    if (!materiaPrima.codigo || materiaPrima.codigo == "") {
        resultado.mensajeError += "Debe introducir un codigo \n"
        resultado.errorValidacion = true
    }

    if (!materiaPrima.fecha || materiaPrima.fecha == "") {
        resultado.mensajeError += "Debe introducir una fecha \n"
        resultado.errorValidacion = true
    }

    if (!materiaPrima.cantidad) {
        resultado.mensajeError += "Debe introducir la cantidad \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.aluminio)) {
        resultado.mensajeError += "El aluminio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.calcio)) {
        resultado.mensajeError += "El calcio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.hierro)) {
        resultado.mensajeError += "El hierro debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.titanio)) {
        resultado.mensajeError += "El titanio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.total)) {
        resultado.mensajeError += "El total debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra10)) {
        resultado.mensajeError += "La granulometría10 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra50)) {
        resultado.mensajeError += "La granulometría50 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra90)) {
        resultado.mensajeError += "La granulometría90 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    return resultado
}

const validarProducto = (producto) => {
    let resultado = {
        mensajeError: "",
        errorValidacion: false
    }

    // if (!producto.ordenesTrabajo || !producto.ordenesTrabajo.length || producto.ordenesTrabajo.length < 1) {
    //     resultado.mensajeError += "Debe seleccionar al menos una orden de trabajo \n"
    //     resultado.errorValidacion = true
    // }

    if (!producto.codigoProducto || producto.codigoProducto == "") {
        resultado.mensajeError += "Debe introducir un codigo \n"
        resultado.errorValidacion = true
    }

    if (!producto.fecha || producto.fecha == "") {
        resultado.mensajeError += "Debe introducir una fecha \n"
        resultado.errorValidacion = true
    }

    if (!producto.cantidad) {
        resultado.mensajeError += "Debe introducir la cantidad \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.aluminio)) {
        resultado.mensajeError += "El aluminio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.calcio)) {
        resultado.mensajeError += "El calcio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.hierro)) {
        resultado.mensajeError += "El hierro debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.titanio)) {
        resultado.mensajeError += "El titanio debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.totalImpurezas)) {
        resultado.mensajeError += "El total debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra10)) {
        resultado.mensajeError += "La granulometría10 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra50)) {
        resultado.mensajeError += "La granulometría50 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra90)) {
        resultado.mensajeError += "La granulometría90 debe ser un valor de porcentaje \n"
        resultado.errorValidacion = true
    }

    return resultado
} 

export {
    validarMateriasPrimas,
    validarProducto
}