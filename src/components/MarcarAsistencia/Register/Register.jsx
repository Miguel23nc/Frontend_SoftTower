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
import {
  clearAsistencias,
  getAllAsistencias,
  getColaboradoresOffline,
  getOfflineAsistencias,
  saveAllAsistenciasColaboradoresOffline,
  saveAsistenciaOffline,
  saveColaboradoresOffline,
} from "../../../utils/indexDB.js";

const RegisterAsistencia = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const asistencia = useSelector((state) => state.asistenciaColaboradores);
  const dispatch = useDispatch();
  useEffect(() => {
    if (asistencia.length === 0) {
      dispatch(getAsistenciaColaboradores());
    } else {
      guardar("allAsistenciaColaboradores", asistencia);
    }
  }, [asistencia, dispatch]);
  const sendMessage = useSendMessage();
  const [tipoAsistencia, setTipoAsistencia] = useState("");
  const colaboradores = useSelector((state) => state.employees);
  useEffect(() => {
    if (colaboradores.length === 0) {
      dispatch(getEmployees());
    } else {
      guardar("colaboradores", colaboradores);
    }
  }, [colaboradores, dispatch]);
  const guardar = async (tipo, data) => {
    try {
      if (tipo === "colaboradores") await saveColaboradoresOffline(data);
      if (tipo === "allAsistenciaColaboradores")
        await saveAllAsistenciasColaboradoresOffline(data);
    } catch (error) {
      console.error("Error al guardar colaboradores offline:", error);
      sendMessage(error.message, "Error");
    }
  };
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
      if (!findColaborador && !navigator.onLine) {
        const offlineColaboradores = await getColaboradoresOffline();
        findColaborador = offlineColaboradores.find(
          (colaborador) =>
            colaborador.documentNumber === documentType.toString()
        );
      }
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
      let findAsistencia = asistencia.find(
        (asistencia) =>
          asistencia.colaborador.documentNumber ===
            findColaborador.documentNumber?.toString() &&
          asistencia.fecha.toString() === form.fecha.toString()
      );
      if (!findAsistencia && !navigator.onLine) {
        const offlineAsistencias = await getOfflineAsistencias();
        findAsistencia = offlineAsistencias.find(
          (asistencia) =>
            asistencia.colaborador.documentNumber ===
              findColaborador.documentNumber?.toString() &&
            asistencia.fecha.toString() === form.fecha.toString()
        );
      }
      let funciondeSubir = updateAsistenciaColaborador;
      if (!navigator.onLine) funciondeSubir = saveAsistenciaOffline;

      if (tipo === "ingreso") {
        if (findAsistencia) {
          sendMessage("Ya marcó su Ingreso", "Error");
          return;
        }
        if (!navigator.onLine)
          saveAsistenciaOffline({ ...form, ingreso: hora, tipo: "ingreso" });
        else await createAsistenciaColaborador({ ...form, ingreso: hora });
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
        await funciondeSubir({
          ...form,
          inicioAlmuerzo: hora,
          tipo: "inicioAlmuerzo",
        });
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
        await funciondeSubir({
          ...form,
          finAlmuerzo: hora,
          tipo: "finAlmuerzo",
        });
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

        await funciondeSubir({ ...form, salida: hora, tipo: "salida" });
        sendMessage("Salida registrada", "Éxito");
      }
    } catch (error) {
      console.error("Error al crear o actualizar asistencia", error);
      sendMessage(error.message, "Error");
    }
  };
  const syncOfflineAsistencias = async () => {
    const asistencias = await getAllAsistencias();
    if (asistencias.length === 0) return;

    for (const asistencia of asistencias) {
      if (!asistencia.tipo) {
        sendMessage(`No se sabe el tipo de asistencia`, "Error");
        continue; // Evita que falle si no tiene tipo
      }
      await createOrUpdateAsistencia(asistencia.tipo, asistencia);
    }

    await clearAsistencias();
    sendMessage("Asistencias offline sincronizadas", "Éxito");
  };

  useEffect(() => {
    const sync = async () => {
      try {
        const offlineData = await getOfflineAsistencias();
        if (navigator.onLine && offlineData.length > 0) {
          await syncOfflineAsistencias();
        }
      } catch (error) {
        console.error("Error en la sincronización:", error);
        sendMessage("Error al sincronizar asistencias", "Error");
      }
    };

    window.addEventListener("online", sync);
    return () => window.removeEventListener("online", sync);
  }, []);

  const handleButton = (tipo) => {
    setScanResult(null); // Resetear el resultado antes de escanear
    setTipoAsistencia(tipo);
    setIsScanning(true); // Iniciar el escaneo
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
