import { useEffect, useState } from "react";
import Input from "../../../../../recicle/Inputs/Inputs";

const MontosFinales = ({ registro, set, cotizacion }) => {
  useEffect(() => {
    if (registro.length > 0) {
      const subTotal = registro?.reduce((acc, value) => {
        return acc + Number(value.subTotal);
      }, 0);
      const igv = subTotal * 0.18;
      const total = subTotal + igv;
      set((prevData) => ({
        ...prevData,
        subTotal: subTotal,
        igv: igv,
        total: total,
      }));
    }
  }, [registro]);

  return (
    <div className="flex mb-12 mt-8 justify-center ">
      <Input value={cotizacion.subTotal || ""} disabled label="Subtotal" />
      <Input value={cotizacion.igv || ""} disabled label="IGV" />
      <Input value={cotizacion.total || ""} disabled label="Total" />
      <div
        className="flex flex-col justify-center items-center px-12
       m-1 mx-8 border bg-white rounded-md"
      >
        <span className="text-lg font-medium">Incluye IGV</span>
      </div>
    </div>
  );
};

export default MontosFinales;
