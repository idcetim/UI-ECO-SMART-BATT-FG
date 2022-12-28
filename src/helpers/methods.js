const esPorcentaje = (numero) => {
    let valor = Number(numero)

    if (!isNaN(valor)) {
        if (0 <= valor && valor <= 100) {
            return true
        }
    }

    return false
}

export {
    esPorcentaje
}