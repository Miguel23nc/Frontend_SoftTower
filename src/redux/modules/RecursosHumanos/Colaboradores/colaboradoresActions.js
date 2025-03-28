import axios from "../../../../api/axios";
export const GET_EMPLOYEES = "GET_EMPLOYEES";

export const getEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get("/employee");
    dispatch({ type: GET_EMPLOYEES, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
