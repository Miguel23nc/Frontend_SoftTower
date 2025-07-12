import axios from "../../../api/axios";

const create_MovimientoAlmacen = async (
  MovimientoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/postMovimientoAlmacen",
      MovimientoAlmacen
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_MovimientoAlmacen = async (
  MovimientoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchMovimientoAlmacen",
      MovimientoAlmacen
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_MovimientoAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteMovimientoAlmacen", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export {
  create_MovimientoAlmacen,
  update_MovimientoAlmacen,
  delete_MovimientoAlmacen,
};
