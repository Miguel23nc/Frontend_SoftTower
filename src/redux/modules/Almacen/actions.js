import axios from "../../../api/axios";
import {
  GET_ALL_CONTRATOS_ALMACEN,
  GET_ALL_MOVIMIENTOS_BY_SEDE,
  GET_ALL_SEDES_ALMACEN,
  GET_ALL_NAVES_ALMACEN,
  GET_ALL_ZONAS_ALMACEN,
  GET_UBICACION_BY_PARAMS,
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
export const getAllMovimientosBySede =
  (contratoId, movimiento = "TODOS", page = 0, limit = 10, search = "") =>
  async (dispatch) => {
    try {
      const response = await axios.get("/getAllMovimientosBySede", {
        params: {
          contratoId,
          movimiento,
          page,
          limit,
          search,
        },
      });

      const { data, total } = response.data;

      dispatch({
        type: GET_ALL_MOVIMIENTOS_BY_SEDE,
        payload: data,
      });

      return { data, total };
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

export const getUbicacionByParams = (paramsObj) => async (dispatch) => {
  try {
    const params = new URLSearchParams(paramsObj);
    const response = await axios.get(
      `/getUbicacionByParams?${params.toString()}`
    );
    const data = response.data;

    dispatch({
      type: GET_UBICACION_BY_PARAMS,
      payload: data,
    });

    return data; // Retorna la ubicación encontrada
  } catch (error) {
    throw error;
  }
};
