import { useEffect, useState } from "react";
import Card from "../Card";
import QRCodeScanner from "../Escaneo/Escaneo.jsx";
import useSendMessage from "../../../recicle/senMessage";
import PopUp from "../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsistenciaColaboradores,
  getEmployees,
} from "../../../redux/actions.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import dayjs from "dayjs";

const RegisterAsistencia = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const asistencia = useSelector((state) => state.asistenciaColaboradores);
  const dispatch = useDispatch();
  useEffect(() => {
    if (asistencia.length === 0) {
      dispatch(getAsistenciaColaboradores());
    }
  }, [dispatch]);
  const sendMessage = useSendMessage();
  const [tipoAsistencia, setTipoAsistencia] = useState("");
  const colaboradores = useSelector((state) => state.employees);
  useEffect(() => {
    if (colaboradores.length === 0) {
      dispatch(getEmployees());
    }
  }, [dispatch]);

  const { createAsistenciaColaborador, updateAsistenciaColaborador } =
    useAuth();

  useEffect(() => {
    const img = new Image();
    img.src = "/FONDO-ASISTENCIAS.webp";
  }, []);

  const registrarAsistencia = async (documentType, tipo) => {
    sendMessage("Cargando...", "Espere");
    try {
      let findColaborador = colaboradores.find(
        (colaborador) => colaborador.documentNumber === documentType.toString()
      );
      if (!findColaborador) {
        sendMessage("Colaborador no encontrado", "Error");
        return;
      }

      const form = {
        colaborador: findColaborador._id,
        fecha: dayjs().format("DD/MM/YYYY"),
      };

      await createOrUpdateAsistencia(tipo, form, findColaborador);

      setScanResult(null);
    } catch (error) {
      console.error("Error al registrar asistencia", error);
      sendMessage(error.message, "Error");
    }
  };

  const createOrUpdateAsistencia = async (tipo, form, findColaborador) => {
    try {
      const hora = dayjs().format("hh:mm A");
      const findAsistencia = asistencia.find(
        (asistencia) =>
          asistencia.colaborador.documentNumber ===
            findColaborador.documentNumber?.toString() &&
          asistencia.fecha.toString() === form.fecha.toString()
      );

      if (tipo === "ingreso") {
        if (findAsistencia) {
          sendMessage("Ya marcó su Ingreso", "Error");
          return;
        } else {
          await createAsistenciaColaborador({
            ...form,
            ingreso: hora,
          });
        }
        dispatch(getAsistenciaColaboradores());
        sendMessage("Ingreso registrado", "Éxito");
      } else if (tipo === "inicioAlmuerzo") {
        if (!findAsistencia || !findAsistencia.ingreso) {
          sendMessage("Primero debe marcar su Ingreso", "Error");
          return;
        }
        if (findAsistencia.inicioAlmuerzo) {
          sendMessage("Ya marcó su Inicio de Almuerzo", "Error");
          return;
        }
        await updateAsistenciaColaborador({
          ...form,
          inicioAlmuerzo: hora,
        });
        dispatch(getAsistenciaColaboradores());
        sendMessage("Inicio del almuerzo registrado", "Éxito");
      } else if (tipo === "finAlmuerzo") {
        if (!findAsistencia || !findAsistencia.inicioAlmuerzo) {
          sendMessage("Primero debe marcar su Inicio de Almuerzo", "Error");
          return;
        }
        if (findAsistencia.finAlmuerzo) {
          sendMessage("Ya marcó su Fin de Almuerzo", "Error");
          return;
        }
        await updateAsistenciaColaborador({
          ...form,
          finAlmuerzo: hora,
        });
        dispatch(getAsistenciaColaboradores());
        sendMessage("Fin del almuerzo registrado", "Éxito");
      } else if (tipo === "salida") {
        if (!findAsistencia || !findAsistencia.ingreso) {
          sendMessage("Primero debe marcar su Ingreso", "Error");
          return;
        }
        if (findAsistencia.salida) {
          sendMessage("Ya marcó su Salida", "Error");
          return;
        }
        const ingresoTime = dayjs(findAsistencia.ingreso, "hh:mm A");
        const salidaTime = dayjs(hora, "hh:mm A");
        if (salidaTime.isBefore(ingresoTime)) {
          sendMessage("La salida no puede ser antes del ingreso", "Error");
          return;
        }

        await updateAsistenciaColaborador({ ...form, salida: hora });
        dispatch(getAsistenciaColaboradores());
        sendMessage("Salida registrada", "Éxito");
      }
    } catch (error) {
      console.error("Error al crear o actualizar asistencia", error);
      sendMessage(error.message, "Error");
    }
  };

  const handleButton = (tipo) => {
    if (scanResult !== null) setScanResult(null);
    setTipoAsistencia(tipo);
    setIsScanning(true);
  };

  const handleScanResult = (documentType) => {
    if (!documentType || !tipoAsistencia) return;

    setScanResult(documentType);
    setIsScanning(false);

    registrarAsistencia(documentType, tipoAsistencia); // Usamos el tipo almacenado
  };

  return (
    <div
      className="h-screen bg-cover px-10 bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url(/FONDO-ASISTENCIAS.webp)" }}
    >
      <PopUp />
      <div className="flex justify-center items-center h-full">
        {isScanning && (
          <QRCodeScanner
            onScanResult={handleScanResult}
            onClose={() => setIsScanning(false)}
          />
        )}
        <Card
          titulo="HORA DE INGRESO"
          imagen="/HORA DE INGRESO.webp"
          onclick={() => handleButton("ingreso")}
        />
        <Card
          titulo="INICIO ALMUERZO"
          imagen="/INICIO ALMUERZO.webp"
          onclick={() => handleButton("inicioAlmuerzo")}
        />
        <Card
          titulo="FIN ALMUERZO"
          imagen="/FIN ALMUERZO.webp"
          onclick={() => handleButton("finAlmuerzo")}
        />
        <Card
          titulo="HORA DE SALIDA"
          imagen="/HORA DE SALIDA.webp"
          onclick={() => handleButton("salida")}
        />
      </div>
    </div>
  );
};

export default RegisterAsistencia;
