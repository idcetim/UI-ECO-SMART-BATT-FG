// export const url = "http://localhost:5000/"
// export const url = "https://server-stock.azurewebsites.net/"

// export const url = "http://localhost:7071/api/"
export const url = "https://ferroglobe.azurewebsites.net/api/";

export const registroEndpoints = {
    file: url + "file-example",
    mmpp: url + "registrar-mmpp",
    producto: url + "registrar-producto",
};

export const stockEndpoints = {
    update: url + "entradas/update",
    getLote: url + "GetEntradaBD",
    getLotes: url + "GetEntradasBD",
};

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

export const getLotes = `${url}GetEntradasBD`;

export const updateLote = `${url}entradas/updateLote`;