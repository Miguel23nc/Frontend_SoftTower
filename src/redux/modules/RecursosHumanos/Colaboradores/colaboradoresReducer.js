const { GET_EMPLOYEES } = require("./colaboradoresActions");

const initialState = {
  employees: [],
};

const colaboradoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    default:
      return state;
  }
};

module.exports = colaboradoresReducer;
