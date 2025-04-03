import axios from "../api/axios";
export const SET_MESSAGE = "SET_MESSAGE";
export const GET_COTIZACIONES = "GET_COTIZACIONES";
export const GET_RUC = "GET_RUC";
export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_BUSINESS = "GET_BUSINESS";
export const SET_MODULES_AND_SUBMODULES = "SET_MODULES_AND_SUBMODULES";
export const GET_CONTRACTS = "GET_CONTRACTS";
export const GET_REPRESENTANTES = "GET_REPRESENTANTES";
export const GET_PLANTILLAS_CONTRATO = "GET_PLANTILLAS_CONTRATO";
export const GET_ASISTENCIA_VISITANTES = "GET_ASISTENCIA_VISITANTES";
export const GET_ASISTENCIA_COLABORADORES = "GET_ASISTENCIA_COLABORADORES";
export const GET_BOLETA_DE_PAGOS = "GET_BOLETA_DE_PAGOS";
export const GET_DATOS_CONTABLES = "GET_DATOS_CONTABLES";
export const GET_CERTIFICADOS = "GET_CERTIFICADOS";

export const setMessage = (message, type) => async (dispatch) => {
  try {
    dispatch({ type: SET_MESSAGE, payload: { message, type } });
  } catch (error) {
     ;
  }
};
export const getCertificados = () => async (dispatch) => {
  try {
    const response = await axios.get("/getCertificados");
    const data = response.data;
    dispatch({
      type: GET_CERTIFICADOS,
      payload: data,
    });
  } catch (error) {
     ;
  }
};
export const getCotizaciones = () => async (dispatch) => {
  try {
    const response = await axios.get("/getCotizaciones");
    const data = response.data;
    dispatch({
      type: GET_COTIZACIONES,
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const consultRuc = (numeroRuc) => async (dispatch) => {
  try {
    const response = await axios.get(`/ruc?numeroRuc=${numeroRuc}`);
    const data = response.data;
    dispatch({
      type: GET_RUC,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get("/employee");
    const data = response.data;
    dispatch({
      type: GET_EMPLOYEES,
      payload: data,
    });
  } catch (error) {
     ;
  }
};
export const getClients = () => async (dispatch) => {
  try {
    const response = await axios.get("/getClients");
    const data = response.data;
    dispatch({
      type: GET_CLIENTS,
      payload: data,
    });
  } catch (error) {
     ;
  }
};
export const getBusiness = () => async (dispatch) => {
  try {
    const response = await axios.get("/getBusiness");
    const data = response.data;
    dispatch({
      type: GET_BUSINESS,
      payload: data,
    });
  } catch (error) {
     ;
  }
};
export const setModulesAndSubModules = (user) => async (dispatch) => {
  try {
    const modules = user ? user.modules : [];
    const grouped = modules.reduce((acc, mo) => {
      let moduleEntry = acc.find((entry) => entry.module === mo.name);
      if (!moduleEntry) {
        moduleEntry = { module: mo.name, submodule: [] };
        acc.push(moduleEntry);
      }
      if (mo.submodule && mo.submodule.name) {
        moduleEntry.submodule.push(mo.submodule.name);
      }
      return acc;
    }, []);

    dispatch({
      type: SET_MODULES_AND_SUBMODULES,
      payload: grouped,
    });
  } catch (error) {
     ;
  }
};

export const getContracts = () => async (dispatch) => {
  try {
    const response = await axios.get("/allContracts");
    const data = response.data;
    dispatch({
      type: GET_CONTRACTS,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getReprensentantes = () => async (dispatch) => {
  try {
    const response = await axios.get(`/getRepresentantes`);
    const data = response.data;
    dispatch({
      type: GET_REPRESENTANTES,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getPlantillasContrato = () => async (dispatch) => {
  try {
    const response = await axios.get("/getPlantillasDeContrato");
    const data = response.data;
    dispatch({
      type: GET_PLANTILLAS_CONTRATO,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getAsistenciaVisitantes = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllAsistenciaVisitante");
    const data = response.data;
    dispatch({
      type: GET_ASISTENCIA_VISITANTES,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getAsistenciaColaboradores = () => async (dispatch) => {
  try {
    const response = await axios.get("/getAllAsistenciaColaborador");
    const data = response.data;
    dispatch({
      type: GET_ASISTENCIA_COLABORADORES,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getBoletaDePagos = () => async (dispatch) => {
  try {
    const response = await axios.get("/getBoletaDePagos");
    const data = response.data;
    dispatch({
      type: GET_BOLETA_DE_PAGOS,
      payload: data,
    });
  } catch (error) {
     ;
  }
};

export const getDatosContables = () => async (dispatch) => {
  try {
    const response = await axios.get("/getDatosContables");
    const data = response.data;
    dispatch({
      type: GET_DATOS_CONTABLES,
      payload: data,
    });
  } catch (error) {
     ;
  }
};
