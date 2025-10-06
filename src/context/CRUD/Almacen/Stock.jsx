import axios from "../../../api/axios";

const create_StockAlmacen = async (StockAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postStockAlmacen", StockAlmacen);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_StockAlmacen = async (StockAlmacen, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchStockAlmacen", StockAlmacen);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_StockAlmacen = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteStockAlmacen", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export { create_StockAlmacen, update_StockAlmacen, delete_StockAlmacen };
