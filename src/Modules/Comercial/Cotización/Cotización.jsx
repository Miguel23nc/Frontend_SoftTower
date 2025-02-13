import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Register from "./Register/Register";
import List from "./List/List";
import ReadOrCreate from "../../../components/Principal/Principal";

const Cotizacion = () => {
  return (
    <ReadOrCreate
      submodule="COTIZACION"
      ItemList={List}
      ItemRegister={Register}
    />
  );
};

export default Cotizacion;
