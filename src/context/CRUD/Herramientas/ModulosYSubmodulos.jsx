import axios from "../../../api/axios";

const create_Module = async (Module, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postModule", Module);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_Module = async (Module, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchModule", Module);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_Module = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteModule", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};

const create_subModule = async (subModule, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postSubmodule", subModule);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_subModule = async (subModule, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchSubmodule", subModule);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_subModule = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteSubmodule", {
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
  create_Module,
  update_Module,
  delete_Module,
  create_subModule,
  update_subModule,
  delete_subModule,
};
