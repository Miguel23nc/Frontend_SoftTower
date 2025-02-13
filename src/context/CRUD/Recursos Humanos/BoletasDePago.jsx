import axios from "../../../api/axios";

export const post_BoletasDePago = async (
  BoletasDePago,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post("/postBoletaDePagos", BoletasDePago);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    console.log(error);
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

export const update_BoletasDePago = async (
  BoletasDePago,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch("/patchBoletaDePago", BoletasDePago);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    console.log(error);
    setErrors(error?.response?.data?.message);
  }
};

export const delete_BoletasDePago = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteBoletaDePago", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    console.log(error);
    setErrors(error?.response?.data?.message);
  }
};

export const enviar_BoletasDePago = async (
  BoletasDePago,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post("/enviarBoletasDePago", BoletasDePago);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    console.log(error);
    setErrors(error?.response?.data?.message);
  }
};
