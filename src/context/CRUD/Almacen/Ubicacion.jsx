import axios from "../../../api/axios";

const create_UbicacionProducto = async (
  UbicacionProducto,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/postUbicacionProducto",
      UbicacionProducto
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_UbicacionProducto = async (
  UbicacionProducto,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchUbicacionProducto",
      UbicacionProducto
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_UbicacionProducto = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteUbicacionProducto", {
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
  create_UbicacionProducto,
  update_UbicacionProducto,
  delete_UbicacionProducto,
};
