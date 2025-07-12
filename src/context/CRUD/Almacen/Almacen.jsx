import axios from "../../../api/axios";

const create_ContratoAlmacen = async (
  ContratoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post("/postContratoAlmacen", ContratoAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_ContratoAlmacen = async (
  ContratoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchContratoAlmacen",
      ContratoAlmacen
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_ContratoAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteContratoAlmacen", {
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
  create_ContratoAlmacen,
  update_ContratoAlmacen,
  delete_ContratoAlmacen,
};
