import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../redux/actions";
import modificarPlantillaExcel from "../../../../utils/convertToExcel";
import { useState } from "react";
import Report from "../../../../components/Principal/Permissions/Report";
const plantilla = import.meta.env.VITE_REPORTE_BOLETA_EXCEL;

const ReporteBoletasDePago = () => {
  const [form, setForm] = useState({
    empresa: "",
    desde: "",
    hasta: "",
  });
  function parseDate(dateString) {
    const [month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1);
  }
  const parseDateGuion = (dateString) => {
    const [year, month] = dateString.split("-").map(Number);
    return new Date(year, month - 1);
  };
  const allBoletas = useSelector((state) => state.boletaDePagos);
  if (allBoletas.length === 0) return null;
  const findBoletas = allBoletas?.filter((item) => {
    const date = parseDate(item.fechaBoletaDePago);
    return (
      item.colaborador?.business === form.empresa &&
      date >= parseDateGuion(form.desde) &&
      date <= parseDateGuion(form.hasta)
    );
  });

  const dispatch = useDispatch();
  const sendMessage = (message, type) => {
    dispatch(setMessage(message, type));
  };
  //variabel de asistencia : estado (TARDANZA ASISTIO FALTA)
  const descargar = async () => {
    sendMessage("Descargando archivo...", "info");
    try {
      if (findBoletas.length === 0)
        return sendMessage("No hay datos para descargar", "Error");
      const archivo = plantilla;
      const datos = findBoletas?.map((item) => {
        return {
          colaborador:
            item.colaborador?.lastname + " " + item.colaborador?.name,
          ndoc: item.colaborador?.documentNumber,
          empresa: item.colaborador?.business,
          estado: item.state,
          fechaBoletaDePago: item.fechaBoletaDePago,
          envio: item.envio,
          recepcion: item.recepcion,
        };
      });
      const columnasMapeo = {
        1: (dato, index) => index + 1, // Número correlativo (valor dinámico)
        2: "colaborador",
        3: "ndoc",
        4: "empresa",
        5: "estado",
        6: "fechaBoletaDePago",
        7: "envio",
        8: "recepcion",
      };
      const respose = await modificarPlantillaExcel(
        datos,
        columnasMapeo,
        archivo,
        "Reporte de Boletas de Pago"
      );
      if (respose) sendMessage("Archivo descargado con éxito", "success");
      else sendMessage("Error al descargar el archivo", "Error");
    } catch (error) {
      sendMessage(error, "Error");
    }
  };
  return <Report descargar={descargar} setForm={setForm} form={form} />;
};

export default ReporteBoletasDePago;
