import axios from "../../../api/axios";

const create_AsistenciaVisitante = async (
  AsistenciaVisitante,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/postAsistenciaVisitante",
      AsistenciaVisitante
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    console.log(error);
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_AsistenciaVisitante = async (
  AsistenciaVisitante,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/patchAsistenciaVisitante",
      AsistenciaVisitante
    );
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    console.log(error);
    setErrors(error?.response?.data?.message);
  }
};
const delete_AsistenciaVisitante = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteAsistenciaVisitante", {
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

export {
  create_AsistenciaVisitante,
  update_AsistenciaVisitante,
  delete_AsistenciaVisitante,
};
