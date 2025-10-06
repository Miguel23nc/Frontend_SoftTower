// const initialState = {
//   modulesAndSubModules: [],
//   ruc: "",
//   cotizaciones: [],
//   employees: [],
//   business: [],
//   clients: [],
//   departamentos: [],
//   contracts: [],
//   allPlantillasContrato: [],
//   asistenciaVisitantes: [],
//   asistenciaColaboradores: [],
//   boletaDePagos: [],
//   certificados: [],
//   datosContables: [],
//   allWidgets: [],
//   modules: [],
//   submodules: [],
//   allNotificaciones: [],
//   widgetsPreference: [],
//   error: {
//     type: "",
//     message: "",
//   },
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_EMPLOYEES:
//       return {
//         ...state,
//         employees: action.payload,
//       };
//     case GET_COTIZACIONES:
//       return {
//         ...state,
//         cotizaciones: action.payload,
//       };
//     case GET_RUC:
//       return {
//         ...state,
//         ruc: action.payload,
//       };
//     case GET_CLIENTS:
//       return {
//         ...state,
//         clients: action.payload,
//       };
//     case GET_BUSINESS:
//       return {
//         ...state,
//         business: action.payload,
//       };
//     case SET_MESSAGE:
//       return {
//         ...state,
//         error: {
//           message: action.payload.message,
//           type: action.payload.type,
//         },
//       };
//     case SET_MODULES_AND_SUBMODULES:
//       return {
//         ...state,
//         modulesAndSubModules: action.payload,
//       };
//     case GET_CONTRACTS:
//       return {
//         ...state,
//         contracts: action.payload,
//       };

//     case GET_PLANTILLAS_CONTRATO:
//       return {
//         ...state,
//         allPlantillasContrato: action.payload,
//       };
//     case GET_ASISTENCIA_VISITANTES:
//       return {
//         ...state,
//         asistenciaVisitantes: action.payload,
//       };
//     case GET_ASISTENCIA_COLABORADORES:
//       return {
//         ...state,
//         asistenciaColaboradores: action.payload,
//       };
//     case GET_BOLETA_DE_PAGOS:
//       return {
//         ...state,
//         boletaDePagos: action.payload,
//       };
//     case GET_DATOS_CONTABLES:
//       return {
//         ...state,
//         datosContables: action.payload,
//       };
//     case GET_CERTIFICADOS:
//       return {
//         ...state,
//         certificados: action.payload,
//       };
//     case GET_All_WIDGETS:
//       return {
//         ...state,
//         allWidgets: action.payload,
//       };
//     case GET_WIDGETS_PREFERENCE:
//       return {
//         ...state,
//         widgetsPreference: action.payload,
//       };
//     case GET_MODULES:
//       return {
//         ...state,
//         modules: action.payload,
//       };
//     case GET_SUBMODULES:
//       return {
//         ...state,
//         submodules: action.payload,
//       };
//     case GET_ALL_NOTIFICACIONES:
//       return {
//         ...state,
//         allNotificaciones: action.payload,
//       };
//     default:
//       return state;
//   }
// };
// export default rootReducer;

import { combineReducers } from "redux";
import almacenReducer from "./modules/Almacen/reducer";
import recursosHumanosReducer from "./modules/Recursos Humanos/reducer";
import errorReducer from "./errorReducer";
import herramientasReducer from "./modules/Herramientas/reducer";
import sistemasReducer from "./modules/Sistemas/reducer";

const rootReducer = combineReducers({
  sistemas: sistemasReducer,
  almacen: almacenReducer,
  recursosHumanos: recursosHumanosReducer,
  // comercial: comercialReducer,
  herramientas: herramientasReducer,
  // certificacion: certificacionReducer,
  error: errorReducer,
});

export default rootReducer;
