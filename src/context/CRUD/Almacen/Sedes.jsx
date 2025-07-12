import axios from "../../../api/axios";

const create_SedesAlmacen = async (SedesAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postSedesAlmacen", SedesAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_SedesAlmacen = async (SedesAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchSedesAlmacen", SedesAlmacen);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_SedesAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteSedesAlmacen", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export { create_SedesAlmacen, update_SedesAlmacen, delete_SedesAlmacen };
