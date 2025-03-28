import { combineReducers } from "redux";
import recursosHumanosReducer from "./recursos-humanos";
import certificacionesReducer from "./certificaciones";

const rootReducer = combineReducers({
  recursosHumanos: recursosHumanosReducer,
  certificaciones: certificacionesReducer,
});

export default rootReducer;
