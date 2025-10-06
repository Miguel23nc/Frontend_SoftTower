import axios from "../../../api/axios";
import { GET_INVENTARIO_SISTEMAS } from "./types";

export const getInventarioSistemas = () => async (dispatch) => {
  try {
    const response = await axios.get("/sistemas/getInventario");
    const data = response.data;
    dispatch({
      type: GET_INVENTARIO_SISTEMAS,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};
