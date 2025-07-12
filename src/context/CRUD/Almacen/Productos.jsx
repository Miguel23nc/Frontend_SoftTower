import axios from "../../../api/axios";

const create_ProductoAlmacen = async (
  ProductoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post("/postProductoAlmacen", ProductoAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_ProductoAlmacen = async (
  ProductoAlmacen,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchProductoAlmacen",
      ProductoAlmacen
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_ProductoAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteProductoAlmacen", {
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
  create_ProductoAlmacen,
  update_ProductoAlmacen,
  delete_ProductoAlmacen,
};
