import {
  GET_ALL_EMPLOYEES,
  GET_RUC,
  GET_CLIENTS,
  GET_BUSINESS,
  GET_CONTRACTS,
  GET_PLANTILLAS_CONTRATO,
  GET_ASISTENCIA_COLABORADORES,
  GET_BOLETA_DE_PAGOS,
  GET_DATOS_CONTABLES,
  SET_MODULES_AND_SUBMODULES,
  GET_CERTIFICADOS,
  GET_COTIZACIONES,
} from "./types";

const iniTialState = {
  modulesAndSubModules: [],
  ruc: "",
  cotizaciones: [],
  allEmployees: [],
  business: [],
  clients: [],
  departamentos: [],
  contracts: [],
  allPlantillasContrato: [],
  asistenciaVisitantes: [],
  asistenciaColaboradores: [],
  boletaDePagos: [],
  certificados: [],
  datosContables: [],
  allWidgets: [],
  modules: [],
  submodules: [],
  allNotificaciones: [],
  widgetsPreference: [],
  inventarioSistemas: [],
};

const recursosHumanosReducer = (state = iniTialState, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        allEmployees: action.payload,
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

export default recursosHumanosReducer;
