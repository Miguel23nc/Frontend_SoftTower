import axios from "../../../api/axios";

const create_InventarioSistemas = async (
  InventarioSistemas,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/sistemas/postInventario",
      InventarioSistemas
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_InventarioSistemas = async (
  InventarioSistemas,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/sistemas/patchInventario",
      InventarioSistemas
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_InventarioSistemas = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/sistemas/deleteInventario", {
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
  create_InventarioSistemas,
  update_InventarioSistemas,
  delete_InventarioSistemas,
};
