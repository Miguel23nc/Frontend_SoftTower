import axios from "../../../api/axios";

const create_Certificado = async (Certificado, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postCertificado", Certificado);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_Certificado = async (Certificado, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchCertificado", Certificado);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_Certificado = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteCertificado", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

export { create_Certificado, update_Certificado, delete_Certificado };
