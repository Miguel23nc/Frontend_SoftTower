import axios from "../../../../api/axios";
import { setMessage } from "../../../../redux/actions";

export const consultarRuc = async (numeroRuc, dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/ruc?numeroRuc=${numeroRuc}`
    );
    return response.data?.razonSocial || "";
  } catch (error) {
    dispatch(setMessage("Error al consultar RUC", "Error"));
    return "Error al consultar RUC"
  }
};
