import axios from "../../../api/axios";

const create_ZonaAlmacen = async (ZonaAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postZonaAlmacen", ZonaAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_ZonaAlmacen = async (ZonaAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchZonaAlmacen", ZonaAlmacen);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_ZonaAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteZonaAlmacen", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export { create_ZonaAlmacen, update_ZonaAlmacen, delete_ZonaAlmacen };
