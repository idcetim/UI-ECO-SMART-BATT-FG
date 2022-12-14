import { esPorcentaje } from './methods'

const validarMateriasPrimas = (materiaPrima) => {
    let resultado = {
        mensajeError: "",
        errorValidacion: false
    }

    if (!materiaPrima.codigo || materiaPrima.codigo === "") {
        resultado.mensajeError += "Debe introducir un código. \n"
        resultado.errorValidacion = true
    }

    if (!materiaPrima.fecha || materiaPrima.fecha === "") {
        resultado.mensajeError += "Debe introducir una fecha. \n"
        resultado.errorValidacion = true
    }

    if (!materiaPrima.cantidad) {
        resultado.mensajeError += "Debe introducir la cantidad. \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.aluminio)) {
        resultado.mensajeError += "Al debe ser <= 100%. \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.calcio)) {
        resultado.mensajeError += "Ca debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.hierro)) {
        resultado.mensajeError += "Fe debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.titanio)) {
        resultado.mensajeError += "Ti debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.total)) {
        resultado.mensajeError += "Total debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra10)) {
        resultado.mensajeError += "Gra10 debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra50)) {
        resultado.mensajeError += "Gra50 debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(materiaPrima.gra90)) {
        resultado.mensajeError += "Gra90 debe ser <= 100%. \n";
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

    if (!producto.codigoProducto || producto.codigoProducto === "") {
        resultado.mensajeError += "Debe introducir un código. \n"
        resultado.errorValidacion = true
    }

    if (!producto.fecha || producto.fecha === "") {
        resultado.mensajeError += "Debe introducir una fecha. \n"
        resultado.errorValidacion = true
    }

    if (!producto.cantidad) {
        resultado.mensajeError += "Debe introducir la cantidad. \n"
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.aluminio)) {
        resultado.mensajeError += "Al debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.calcio)) {
        resultado.mensajeError += "Ca debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.hierro)) {
        resultado.mensajeError += "Fe debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.titanio)) {
        resultado.mensajeError += "Ti debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.totalImpurezas)) {
        resultado.mensajeError += "Total debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra10)) {
        resultado.mensajeError += "Gra10 debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra50)) {
        resultado.mensajeError += "Gra50 debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }

    if (!esPorcentaje(producto.gra90)) {
        resultado.mensajeError += "Gra90 debe ser <= 100%. \n";
        resultado.errorValidacion = true
    }
    return resultado
}

const validarOrdenTrabajo = (ordenTrabajo) => {
    let resultado = {
        mensajeError: "",
        errorValidacion: false
    }

    if (!ordenTrabajo.codigo || ordenTrabajo.codigo === "") {
        resultado.mensajeError += "Debe introducir un código. \n"
        resultado.errorValidacion = true
    }

    if (!ordenTrabajo.fecha || ordenTrabajo.fecha === "") {
        resultado.mensajeError += "Debe introducir una fecha. \n"
        resultado.errorValidacion = true
    }

    if (!ordenTrabajo.procesosIds || ordenTrabajo.procesosIds.length === 0) {
        resultado.mensajeError += "Debe seleccionar al menos un proceso. \n"
        resultado.errorValidacion = true
    }

    if (!ordenTrabajo.materiasPrimas[0].cantidadEntrada || ordenTrabajo.materiasPrimas.length === 0) {
        resultado.mensajeError += "Debe introducir al menos una materia prima. \n"
        resultado.errorValidacion = true
    }

    return resultado
}

export {
    validarMateriasPrimas,
    validarProducto,
    validarOrdenTrabajo
}