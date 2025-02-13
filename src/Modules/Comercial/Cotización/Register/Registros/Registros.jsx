import { useState } from "react";
import Item from "./Item";
import RemoveItemAdd from "../../../../../components/RemoveAdd/RemoveItemAdd";

const Registros = ({ setForm, setErrorForm }) => {
  return (
    <div className="ml-8">
      <RemoveItemAdd
        ItemComponent={Item}
        data="registros"
        estilos="border-none"
        setForm={setForm}
        setErrorForm={setErrorForm}
      />
    </div>
  );
};

export default Registros;
