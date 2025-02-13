import {
  GET_EMPLOYEES,
  GET_CLIENTS,
  SET_MESSAGE,
  SET_MODULES_AND_SUBMODULES,
  GET_BUSINESS,
  GET_COTIZACIONES,
  GET_RUC,
  GET_CONTRACTS,
  GET_PLANTILLAS_CONTRATO,
  GET_ASISTENCIA_VISITANTES,
  GET_ASISTENCIA_COLABORADORES,
  GET_BOLETA_DE_PAGOS,
  GET_DATOS_CONTABLES,
} from "./actions";

const initialState = {
  modulesAndSubModules: [],
  ruc: "",
  cotizaciones: [],
  employees: [],
  business: [],
  clients: [],
  departamentos: [],
  contracts: [],
  allPlantillasContrato: [],
  asistenciaVisitantes: [],
  asistenciaColaboradores: [],
  boletaDePagos: [],
  datosContables: [],
  error: {
    type: "",
    message: "",
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_COTIZACIONES:
      return {
        ...state,
        cotizaciones: action.payload,
      };
    case GET_RUC:
      return {
        ...state,
        ruc: action.payload,
      };
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_BUSINESS:
      return {
        ...state,
        business: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        error: {
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    case SET_MODULES_AND_SUBMODULES:
      return {
        ...state,
        modulesAndSubModules: action.payload,
      };
    case GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload,
      };

    case GET_PLANTILLAS_CONTRATO:
      return {
        ...state,
        allPlantillasContrato: action.payload,
      };
    case GET_ASISTENCIA_VISITANTES:
      return {
        ...state,
        asistenciaVisitantes: action.payload,
      };
    case GET_ASISTENCIA_COLABORADORES:
      return {
        ...state,
        asistenciaColaboradores: action.payload,
      };
    case GET_BOLETA_DE_PAGOS:
      return {
        ...state,
        boletaDePagos: action.payload,
      };
    case GET_DATOS_CONTABLES:
      return {
        ...state,
        datosContables: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
