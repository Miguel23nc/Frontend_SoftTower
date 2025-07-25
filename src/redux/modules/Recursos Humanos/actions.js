import axios from "../../../api/axios";

import {
  GET_RUC,
  GET_ALL_EMPLOYEES,
  GET_CLIENTS,
  GET_BUSINESS,
  GET_CONTRACTS,
  GET_PLANTILLAS_CONTRATO,
  SET_MODULES_AND_SUBMODULES,
  GET_ASISTENCIA_COLABORADORES,
  GET_BOLETA_DE_PAGOS,
  GET_DATOS_CONTABLES,
} from "./types";

export const getEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get("/employee");
    const data = response.data;
    dispatch({
      type: GET_ALL_EMPLOYEES,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const consultRuc = (numeroRuc) => async (dispatch) => {
  try {
    const response = await axios.get(`/ruc?numeroRuc=${numeroRuc}`);
    const data = response.data;
    dispatch({
      type: GET_RUC,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getBusiness = () => async (dispatch) => {
  try {
    const response = await axios.get("/getBusiness");
    const data = response.data;
    dispatch({
      type: GET_BUSINESS,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
export const setModulesAndSubModules = (user) => async (dispatch) => {
  try {
    const modules = user ? user.modules : [];
    const grouped = modules.reduce((acc, mo) => {
      let moduleEntry = acc.find((entry) => entry.module === mo.name);
      if (!moduleEntry) {
        moduleEntry = { module: mo.name, submodule: [] };
        acc.push(moduleEntry);
      }
      if (mo.submodule && mo.submodule.name) {
        moduleEntry.submodule.push(mo.submodule.name);
      }
      return acc;
    }, []);

    dispatch({
      type: SET_MODULES_AND_SUBMODULES,
      payload: grouped,
    });
  } catch (error) {
    throw error;
  }
};
export const getPlantillasContrato = () => async (dispatch) => {
  try {
    const response = await axios.get("/getPlantillasDeContrato");
    const data = response.data;
    dispatch({
      type: GET_PLANTILLAS_CONTRATO,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
export const getContracts = () => async (dispatch) => {
  try {
    const response = await axios.get("/allContracts");
    const data = response.data;
    dispatch({
      type: GET_CONTRACTS,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAsistenciaColaboradores = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllAsistenciaColaborador");
    const data = response.data;
    dispatch({
      type: GET_ASISTENCIA_COLABORADORES,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getBoletaDePagos = () => async (dispatch) => {
  try {
    const response = await axios.get("/getBoletaDePagos");
    const data = response.data;
    dispatch({
      type: GET_BOLETA_DE_PAGOS,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
export const getDatosContables = () => async (dispatch) => {
  try {
    const response = await axios.get("/getDatosContables");
    const data = response.data;
    dispatch({
      type: GET_DATOS_CONTABLES,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
