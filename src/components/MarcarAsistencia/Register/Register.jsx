import { useEffect, useState } from "react";
import Card from "../Card";
import QRCodeScanner from "../Escaneo/Escaneo.jsx";
import useSendMessage from "../../../recicle/senMessage";
import PopUp from "../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../redux/actions.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import dayjs from "dayjs";

const RegisterAsistencia = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const sendMessage = useSendMessage();
  const [tipoAsistencia, setTipoAsistencia] = useState("");
  const colaboradores = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const { createAsistenciaColaborador, updateAsistenciaColaborador } =
    useAuth();
  useEffect(() => {
    if (colaboradores.length === 0) {
      dispatch(getEmployees());
    }
  }, [colaboradores, dispatch]);

  useEffect(() => {
    const img = new Image();
    img.src = "/FONDO-ASISTENCIAS.webp";
  }, []);

  const registrarAsistencia = async (documentType, tipo) => {
    sendMessage("Cargando...", "Espere");

    try {
      const findColaborador = colaboradores.find(
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

      await createOrUpdateAsistencia(tipo, form);

      setScanResult(null);
    } catch (error) {
      console.error("Error al registrar asistencia", error);
      sendMessage(error.message, "Error");
    }
  };

  const createOrUpdateAsistencia = async (tipo, form) => {
    const hora = dayjs().format("hh:mm A");

    if (tipo === "ingreso") {
      await createAsistenciaColaborador({ ...form, ingreso: hora });
      sendMessage("Ingreso registrado", "Éxito");
    } else if (tipo === "inicioAlmuerzo") {
      await updateAsistenciaColaborador({ ...form, inicioAlmuerzo: hora });
      sendMessage("Inicio del almuerzo registrado", "Éxito");
    } else if (tipo === "finAlmuerzo") {
      await updateAsistenciaColaborador({ ...form, finAlmuerzo: hora });
      sendMessage("Fin del almuerzo registrado", "Éxito");
    } else if (tipo === "salida") {
      await updateAsistenciaColaborador({ ...form, salida: hora });
      sendMessage("Salida registrada", "Éxito");
    }
  };

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
