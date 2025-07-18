import {
  GET_ALL_CONTRATOS_ALMACEN,
  GET_ALL_MOVIMIENTOS_BY_SEDE,
  GET_ALL_SEDES_ALMACEN,
  GET_ALL_NAVES_ALMACEN,
  GET_ALL_ZONAS_ALMACEN,
  GET_UBICACION_BY_PARAMS,
} from "./types";

const iniTialState = {
  allContratos: [],
  allSedes: [],
  allMovimientos: [],
  allMovimientosBySede: [],
  allNaves: [],
  allZonas: [],
  getUbicacionByParams: [],
};

const almacenReducer = (state = iniTialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTRATOS_ALMACEN:
      return {
        ...state,
        allContratos: action.payload,
      };
    case GET_ALL_SEDES_ALMACEN:
      return {
        ...state,
        allSedes: action.payload,
      };
    case GET_ALL_MOVIMIENTOS_BY_SEDE:
      return {
        ...state,
        allMovimientosBySede: action.payload,
      };
    case GET_ALL_NAVES_ALMACEN:
      return {
        ...state,
        allNaves: action.payload,
      };
    case GET_ALL_ZONAS_ALMACEN:
      return {
        ...state,
        allZonas: action.payload,
      };
    case GET_UBICACION_BY_PARAMS:
      return {
        ...state,
        getUbicacionByParams: action.payload,
      };

    default:
      return state;
  }
};

export default almacenReducer;
