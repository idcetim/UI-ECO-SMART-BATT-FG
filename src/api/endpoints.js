// export const url = "http://localhost:5000/"
// export const url = "https://server-stock.azurewebsites.net/"

export const url = "http://localhost:7071/api/"
// export const url = "https://ferroglobe.azurewebsites.net/api/";

export const registroEndpoints = {
    file: url + "file-example",
    mmpp: url + "registrar-mmpp",
    producto: url + "registrar-producto",
    orden: url + "registrar-ot",
};

export const mmppEndpoints = {
    getMMPP: url + "GetMMPP",
    deleteMMPP: url + "DeleteMMPP",
    updateMMPP: url + "UpdateMMPP"
};

export const ordenesTrabajoEndpoints = {
    getOrdenesTrabajo: `${url}GetOrdenesTrabajo`
}

export const productosEndpoints = {
    getProductos: `${url}GetProductos`
}

export const selectListEndpoints = {
    getCalidades: `${url}GetCalidades`,
    getSizes: `${url}GetSizes`,
    getProcesos: `${url}GetProcesos`
} 

export const entradas = `${url}entradas`;

export const entradasFile = `${url}entradas/file`;

export const entradasAnalisis = `${url}entradas/analisis`;

export const cantidadEntradas = `${url}cantidad/entradas`;

export const produccion = `${url}produccion`;

export const produccionGra = `${url}produccion/analisis/granulometria`;

export const produccionQui = `${url}produccion/analisis/quimico`;

export const produccionOrden = `${url}produccion/analisis/orden`;

export const produccionOrdenFile = `${url}produccion/orden`;

export const produccionQuimicoFile = `${url}produccion/quimico`;

export const produccionGranulometricoFile = `${url}produccion/granulometria`;

export const cantidadProduccion = `${url}cantidad/produccion`;

export const getLote = `${url}GetEntradaBD`;

export const updateLote = `${url}entradas/updateLote`;


