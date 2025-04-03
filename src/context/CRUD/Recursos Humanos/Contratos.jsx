import axios from "../../../api/axios";

const create_Contrato = async (contrato, setErrors, setResponse) => {
  try {
    const response = await axios.post("/createContract", contrato);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
     ;
    setErrors(error?.response?.data?.message);
  }
};
const update_Contrato = async (contrato, setErrors, setResponse) => {
  try {
    const response = await axios.patch("/patchContract", contrato);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
     ;
    setErrors(error?.response?.data?.message);
  }
};
const delete_Contrato = async (id, setErrors, setResponse) => {
  try {
    const response = await axios.delete("/deleteContract", {
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

export { create_Contrato, update_Contrato, delete_Contrato };
