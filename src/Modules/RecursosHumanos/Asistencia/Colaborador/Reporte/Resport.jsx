import { useEffect, useState } from "react";
import CardPlegable from "../../../../../recicle/Divs/CardPlegable";
import Input from "../../../../../recicle/Inputs/Inputs";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../recicle/popUps";
import ButtonOk from "../../../../../recicle/Buttons/Buttons";
import {
  getAsistenciaColaboradores,
  getBusiness,
} from "../../../../../redux/actions";
import modificarPlantillaExcel from "../../../../../utils/convertToExcel";
import useSendMessage from "../../../../../recicle/senMessage";
import useValidation from "./validateReporte";
import convertDocx from "../../../../../utils/convertDocx";
import documentoCloudinary from "../../../../../api/cloudinaryDocument";
import axios from "../../../../../api/axios";
import dayjs from "dayjs";
const archivoExcel = import.meta.env.VITE_REPORTE_ASISTENCIA_EXCEL;
const archivoDocx = import.meta.env.VITE_REPORTE_ASISTENCIA_WORD;
console.log("archivoDocx", archivoDocx);

const ReporteAsistenciaColaborador = () => {
  const [deshabilitar, setDeshabilitar] = useState(false);
  const sendMessage = useSendMessage();
  const dispatch = useDispatch();
  const parseDateGuion = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
  const filtrarAsistencia = (data, form) => {
    const response = data?.filter((item) => {
      const date = parseDate(item.fecha);
      const empresaCoincide =
        form.empresa === "TODOS" || item.colaborador?.business === form.empresa;

      return (
        empresaCoincide &&
        date >= parseDateGuion(form.desde) &&
        date <= parseDateGuion(form.hasta)
      );
    });

    return response;
  };

  const allBusiness = useSelector((state) => state.business);
  useEffect(() => {
    if (allBusiness.length === 0) dispatch(getBusiness());
  }, [allBusiness]);
  const businessName = [
    ...allBusiness.map((item) => item.razonSocial),
    "TODOS",
  ];

  const [formExcel, setFormExcel] = useState({
    empresa: "TODOS",
    desde: "",
    hasta: dayjs().format("YYYY-MM-DD"),
  });
  const [formPdf, setFormPdf] = useState({
    empresa: "TODOS",
    desde: "",
    hasta: dayjs().format("YYYY-MM-DD"),
  });

  const allAsistencia = useSelector((state) => state.asistenciaColaboradores);
  useEffect(() => {
    if (allAsistencia.length === 0) {
      dispatch(getAsistenciaColaboradores());
    }
  }, [allAsistencia]);

  const descargar = async (findAsistencia) => {
    try {
      if (findAsistencia.length === 0)
        return sendMessage("No hay datos para descargar", "Error");
      const datos = findAsistencia?.map((item) => {
        console.log("item", item.minTarde);

        return {
          colaborador:
            item.colaborador?.lastname + " " + item.colaborador?.name,
          ndoc: item.colaborador?.documentNumber,
          tipo: item.colaborador?.type,
          empresa: item.colaborador?.business,
          fecha: item.fecha,
          ingreso: item.ingreso,
          iniAlmuerzo: item.inicioAlmuerzo,
          finAlmuerzo: item.finAlmuerzo,
          salida: item.salida,
          estado: item.estado,
          minTarde: item.minTarde > 10 ? item.minTarde - 10 : 0,
          minExtra: item.minExtras,
          observaciones: item.observaciones,
        };
      });
      const columnasMapeo = {
        1: (dato, index) => index + 1,
        2: "colaborador",
        3: "ndoc",
        4: "tipo",
        5: "empresa",
        6: "fecha",
        7: "ingreso",
        8: "iniAlmuerzo",
        9: "finAlmuerzo",
        10: "salida",
        11: "estado",
        12: "minTarde",
        13: "minExtra",
        14: "observaciones",
      };
      return { datos, columnasMapeo };
    } catch (error) {
      throw error;
    }
  };
  const { validateForm } = useValidation();

  const descargarReporte = async (form, tipo) => {
    setDeshabilitar(true);
    sendMessage("Cargando...", "Espere");

    try {
      if (!validateForm(form)) {
        return sendMessage("Complete los campos requeridos", "Error");
      }
      const findAsistencia = filtrarAsistencia(allAsistencia, form);
      console.log("findAsistencia", findAsistencia);

      if (findAsistencia?.length === 0) {
        return sendMessage("No hay datos para descargar", "Error");
      }

      const { datos, columnasMapeo } = await descargar(findAsistencia);
      if (tipo === "excel") {
        const response = await modificarPlantillaExcel(
          datos,
          columnasMapeo,
          archivoExcel,
          `${form.desde} - ${form.hasta} - Asistencia Colaborador ${form.empresa}`
        );
        if (response) sendMessage("Archivo descargado", "Exito");
      }
      if (tipo === "pdf") {
        const fullAsistencia = allAsistencia.map((item) => {
          return {
            fecha: item.fecha || " ",
            colaborador:
              item.colaborador?.lastname + " " + item.colaborador?.name || " ",
            numDocumento: item.colaborador?.documentNumber || " ",
            ingreso: item.ingreso || " ",
            iniAlmuerzo: item.inicioAlmuerzo || " ",
            finAlmuerzo: item.finAlmuerzo || " ",
            salida: item.salida || " ",
            observaciones: item.observaciones || " ",
          };
        });
        const predata = {
          asistencia: fullAsistencia,
        };
        const docxConvertido = await convertDocx(
          predata,
          archivoDocx,
          "ReporteAsistenciaColaborador"
        );
        const urlDocx = await documentoCloudinary(docxConvertido);

        const pdf = await axios.post(
          "/returnPdf",
          { archivoUrlDocx: urlDocx.secure_url },
          {
            responseType: "blob",
          }
        );
        const blob = new Blob([pdf.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte_Asistencia.pdf";
        link.click();
        sendMessage("Archivo PDF generado", "Éxito");
      }
    } catch (error) {
      console.error("Error al descargar reporte:", error);
      sendMessage(error.message, "Error");
    } finally {
      setDeshabilitar(false);
    }
  };

  return (
    <div>
      <PopUp deshabilitar={deshabilitar} />
      <CardPlegable title="Reporte Asistencia (Excel)">
        <div className="flex flex-wrap">
          <Input
            label="Empresa"
            name="empresa"
            type="select"
            options={businessName}
            value={formExcel.empresa}
            setForm={setFormExcel}
          />
          <Input
            label="Desde"
            name="desde"
            type="date"
            value={formExcel.desde}
            setForm={setFormExcel}
          />
          <Input
            label="Hasta"
            name="hasta"
            type="date"
            value={formExcel.hasta}
            setForm={setFormExcel}
          />
          <ButtonOk
            classe="mt-4"
            children="Generar Reporte"
            type="ok"
            onClick={() => descargarReporte(formExcel, "excel")}
          />
        </div>
      </CardPlegable>
      <CardPlegable title="Reporte Asistencia SIG (PDF)">
        <div className="flex flex-wrap">
          <Input
            label="Empresa"
            name="empresa"
            type="select"
            options={businessName}
            value={formPdf.empresa}
            setForm={setFormPdf}
          />
          <Input
            label="Desde"
            name="desde"
            type="date"
            value={formPdf.desde}
            setForm={setFormPdf}
          />
          <Input
            label="Hasta"
            name="hasta"
            type="date"
            value={formPdf.hasta}
            setForm={setFormPdf}
          />
          <ButtonOk
            classe="mt-4"
            children="Generar Reporte"
            type="ok"
            onClick={() => descargarReporte(formPdf, "pdf")}
          />
        </div>
      </CardPlegable>
    </div>
  );
};

export default ReporteAsistenciaColaborador;
