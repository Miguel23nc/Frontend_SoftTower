import axios from "../../../api/axios";

const create_Widgets = async (Widgets, setResponse, setErrors) => {
  try {
    const response = await axios.post("/postWidget", Widgets);
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(
      error?.response?.data?.message?._message || error?.response?.data?.message
    );
  }
};

const update_Widgets = async (Widgets, setResponse, setErrors) => {
  try {
    const response = await axios.patch("/patchWidget", Widgets);
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const delete_Widgets = async (id, setResponse, setErrors) => {
  try {
    const response = await axios.delete("/deleteWidget", {
      data: { _id: id },
    });
    const data = response.data;
    setResponse(data.message);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const add_WidgetPreference = async (
  widgetsPreference,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.post(
      "/addWidgetPreference",
      widgetsPreference
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
const update_WidgetPreference = async (
  widgetsPreference,
  setResponse,
  setErrors
) => {
  try {
    const response = await axios.patch(
      "/updateWidgetPreference",
      widgetsPreference
    );
    const data = response.data;
    setResponse(data.message);
  } catch (error) {
    setErrors(error?.response?.data?.message);
  }
};
export {
  create_Widgets,
  update_Widgets,
  delete_Widgets,
  add_WidgetPreference,
  update_WidgetPreference,
};
