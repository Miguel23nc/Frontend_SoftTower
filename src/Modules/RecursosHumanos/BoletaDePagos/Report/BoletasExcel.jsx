import Report from "../../../../components/Principal/Permissions/Report";
import useSendMessage from "../../../../recicle/senMessage";
import modificarPlantillaExcel from "../../../../utils/convertToExcel";
const plantilla = import.meta.env.VITE_REPORTE_BOLETA_EXCEL;

const BoletaExcel = ({
  form,
  setForm,
  allBoletas,
  parseDate,
  parseDateGuion,
  options,
}) => {
  const sendMessage = useSendMessage();
  const findBoletas = allBoletas?.filter((item) => {
    const date = parseDate(item.fechaBoletaDePago);
    const isSameEmpresa =
      form.empresa === "TODOS" || item.colaborador?.business === form.empresa;
    return (
      isSameEmpresa &&
      date >= parseDateGuion(form.desde) &&
      date <= parseDateGuion(form.hasta)
    );
  });
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
      if (respose) sendMessage("Archivo descargado con éxito", "Bien");
      else sendMessage("Error al descargar el archivo", "Error");
    } catch (error) {
      sendMessage(error?.message || error, "Error");
    }
  };

  return (
    <Report
      descargar={descargar}
      setForm={setForm}
      form={form}
      options={options}
      title="Reporte de Boletas de Pago (Excel)"
    />
  );
};

export default BoletaExcel;
