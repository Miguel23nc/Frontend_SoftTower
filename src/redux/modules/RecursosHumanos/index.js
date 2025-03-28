import { combineReducers } from "redux";
import colaboradoresReducer from "./colaboradores/reducer";
import boletasReducer from "./boletas-de-pago/reducer";
import asistenciaReducer from "./asistencia/reducer";
import contratosReducer from "./contratos/reducer";

const recursosHumanosReducer = combineReducers({
  colaboradores: colaboradoresReducer,
  boletasDePago: boletasReducer,
  asistencia: asistenciaReducer,
  contratos: contratosReducer,
});

export default recursosHumanosReducer;
