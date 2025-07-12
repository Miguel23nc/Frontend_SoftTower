import axios from "../../../api/axios";

const create_NavesAlmacen = async (NavesAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postNavesAlmacen", NavesAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_NavesAlmacen = async (NavesAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchNavesAlmacen", NavesAlmacen);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_NavesAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteNavesAlmacen", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export { create_NavesAlmacen, update_NavesAlmacen, delete_NavesAlmacen };
