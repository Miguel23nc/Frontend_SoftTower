import axios from "../../../api/axios";
import {
  GET_ALL_CONTRATOS_ALMACEN,
  GET_ALL_MOVIMIENTOS_BY_SEDE,
  GET_ALL_SEDES_ALMACEN,
  GET_ALL_NAVES_ALMACEN,
  GET_ALL_ZONAS_ALMACEN,
} from "./types";

export const getAllContratosAlmacen = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllContratoAlmacen");
    const data = response.data;
    dispatch({
      type: GET_ALL_CONTRATOS_ALMACEN,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllSedesAlmacen = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllSedesAlmacen");
    const data = response.data;
    dispatch({
      type: GET_ALL_SEDES_ALMACEN,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
export const getAllMovimientosBySede = (sedeId) => async (dispatch) => {
  try {
    const response = await axios.get(`/getAllMovimientosBySede/${sedeId}`);
    const data = response.data;
    dispatch({
      type: GET_ALL_MOVIMIENTOS_BY_SEDE,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllNavesAlmacen = () => async (dispatch) => {
  try {
    const response = await axios.get("/getNavesAlmacen");
    const data = response.data;
    dispatch({
      type: GET_ALL_NAVES_ALMACEN,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllZonasAlmacen = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllZonas");
    const data = response.data;
    dispatch({
      type: GET_ALL_ZONAS_ALMACEN,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
