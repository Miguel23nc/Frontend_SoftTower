import axios from "../../../api/axios";

export const create_plantilla_contrato = async (
  plantilla_contrato,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/postPlantillasDeContrato",
      plantilla_contrato
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
     ;
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

export const update_plantilla_contrato = async (
  plantilla_contrato,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchPlantillaDeContrato",
      plantilla_contrato
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
     ;
    setErrors(error?.response?.data?.message);
  }
};
export const delete_plantilla_contrato = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deletePlantillaContrato", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
     ;
    setErrors(error?.response?.data?.message);
  }
};
