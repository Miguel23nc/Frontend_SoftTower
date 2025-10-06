import { GET_INVENTARIO_SISTEMAS } from "./types";

const initialState = {
  inventario: [],
};

const sistemasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTARIO_SISTEMAS:
      return {
        ...state,
        inventario: action.payload,
      };
    default:
      return state;
  }
};
export default sistemasReducer;
