import axios from "../api/axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { verifyToken } from "../api/verifyToken";
import { setMessage } from "../redux/actions";
import { useDispatch } from "react-redux";
import {
  create_Contrato,
  delete_Contrato,
  update_Contrato,
} from "./CRUD/Recursos Humanos/Contratos";
import {
  create_Employee,
  update_Employee,
} from "./CRUD/Recursos Humanos/Colaboradores";
import {
  create_plantilla_contrato,
  delete_plantilla_contrato,
  update_plantilla_contrato,
} from "./CRUD/Recursos Humanos/PlantillasContrato";
import {
  create_AsistenciaColaborador,
  delete_AsistenciaColaborador,
  update_AsistenciaColaborador,
} from "./CRUD/Recursos Humanos/AsistenciaColaborador";
import {
  create_AsistenciaVisitante,
  delete_AsistenciaVisitante,
  update_AsistenciaVisitante,
} from "./CRUD/Recursos Humanos/AsistenciaVisitante";
import {
  delete_BoletasDePago,
  enviar_BoletasDePago,
  post_BoletasDePago,
  update_BoletasDePago,
} from "./CRUD/Recursos Humanos/BoletasDePago";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [response, setResponse] = useState(null);

  const signin = async (user) => {
    try {
      const response = await axios.post("/login", user);
      const data = response.data;
      console.log("data", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token_expiry", Date.now() + 24 * 60 * 60 * 1000);
        setUser(data.data);
        setIsAuthenticated(true);
      } else {
        throw new Error("Token no recibido");
      }
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const signup = async (employee) => {
    await create_Employee(employee, setResponse, setErrors);
  };
  const updateEmployee = async (employee) => {
    await update_Employee(employee, setResponse, setErrors);
  };

  const createClient = async (user) => {
    try {
      const response = await axios.post("/createClient", user);
      const data = response.data;
      setResponse(data.message);
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const updateClient = async (user) => {
    try {
      const response = await axios.patch("/patchClient", user);
      const data = response.data;
      setResponse(data.message);
      return data;
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete("/deleteClient", {
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

  const createCotizacion = async (user) => {
    try {
      const response = await axios.post("/createCotizacion", user);
      const data = response.data;
      setResponse(data.cotizacion.correlativa);
    } catch (error) {
      console.log(error);
      setErrors(
        error?.response?.data?.message?._message ||
          error?.response?.data?.message
      );
    }
  };

  const deleteCotizacion = async (id) => {
    try {
      const response = await axios.delete("/deleteCotizacion", {
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
  const patchCotizacion = async (user) => {
    try {
      const response = await axios.patch("/patchCotizacion", user);
      const data = response.data;
      setResponse(data.message);
      return data;
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const postBusiness = async (user) => {
    try {
      const response = await axios.post("/createBusiness", user);
      const data = response.data;
      setResponse(data.message);
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const deleteBusiness = async (id) => {
    try {
      const response = await axios.delete("/deleteBusiness", {
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

  const updateBusiness = async (user) => {
    try {
      const response = await axios.patch("/patchBusiness", user);
      const data = response.data;
      setResponse(data.message);
      return data;
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.message);
    }
  };
  const createContrato = async (contract) => {
    await create_Contrato(contract, setErrors, setResponse);
  };
  const updateContrato = async (contract) => {
    await update_Contrato(contract, setErrors, setResponse);
  };
  const deleteContrato = async (id) => {
    await delete_Contrato(id, setErrors, setResponse);
  };

  const createPlantillaContrato = async (plantilla_contrato) => {
    await create_plantilla_contrato(plantilla_contrato, setResponse, setErrors);
  };
  const updatePlantillaContrato = async (plantilla_contrato) => {
    await update_plantilla_contrato(plantilla_contrato, setResponse, setErrors);
  };
  const deletePlantillaContrato = async (id) => {
    await delete_plantilla_contrato(id, setResponse, setErrors);
  };

  const createAsistenciaColaborador = async (AsistenciaColaborador) => {
    await create_AsistenciaColaborador(
      AsistenciaColaborador,
      setResponse,
      setErrors
    );
  };
  const updateAsistenciaColaborador = async (AsistenciaColaborador) => {
    await update_AsistenciaColaborador(
      AsistenciaColaborador,
      setResponse,
      
      setErrors
    );
  };
  const deleteAsistenciaColaborador = async (id) => {
    await delete_AsistenciaColaborador(id, setResponse, setErrors);
  };

  const createAsistenciaVisitante = async (AsistenciaVisitante) => {
    await create_AsistenciaVisitante(
      AsistenciaVisitante,
      setResponse,
      setErrors
    );
  };
  const updateAsistenciaVisitante = async (AsistenciaVisitante) => {
    await update_AsistenciaVisitante(
      AsistenciaVisitante,
      setResponse,
      setErrors
    );
  };
  const deleteAsistenciaVisitante = async (id) => {
    await delete_AsistenciaVisitante(id, setResponse, setErrors);
  };

  const postBoletasDePago = async (BoletasDePago) => {
    await post_BoletasDePago(BoletasDePago, setResponse, setErrors);
  };
  const updateBoletasDePago = async (BoletasDePago) => {
    await update_BoletasDePago(BoletasDePago, setResponse, setErrors);
  };
  const deleteBoletasDePago = async (id) => {
    await delete_BoletasDePago(id, setResponse, setErrors);
  };
  const enviarBoletasDePago = async (BoletasDePago) => {
    await enviar_BoletasDePago(BoletasDePago, setResponse, setErrors);
  };

  useEffect(() => {
    if (errors) {
      dispatch(setMessage(errors, "Error"));
    }
    if (response) {
      dispatch(setMessage(response, "Bien"));
    }
  }, [errors, response]);

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      console.log("token", token);

      const expiry = localStorage.getItem("token_expiry");
      if (expiry && Date.now() > expiry) {
        logout();
      }
      if (token) {
        try {
          const response = await verifyToken(token);
          console.log("response", response);
          if (
            response?.response?.data?.message === "No se encuentra este usuario"
          ) {
            console.log("no se encuentra este usuario");
            await logout();
          }
          if (response?.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          if (error?.response?.data?.message === "Token expirado") {
            console.log("expirado");
            await logout();
          }
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        updateEmployee,
        signin,
        isAuthenticated,
        isLoading,
        logout,
        errors,
        setErrors,
        response,
        setResponse,
        createClient,
        updateClient,
        deleteClient,
        createCotizacion,
        deleteCotizacion,
        patchCotizacion,
        postBusiness,
        deleteBusiness,
        updateBusiness,
        createContrato,
        updateContrato,
        deleteContrato,
        createPlantillaContrato,
        updatePlantillaContrato,
        deletePlantillaContrato,
        createAsistenciaColaborador,
        updateAsistenciaColaborador,
        deleteAsistenciaColaborador,
        createAsistenciaVisitante,
        updateAsistenciaVisitante,
        deleteAsistenciaVisitante,
        postBoletasDePago,
        updateBoletasDePago,
        deleteBoletasDePago,
        enviarBoletasDePago,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
