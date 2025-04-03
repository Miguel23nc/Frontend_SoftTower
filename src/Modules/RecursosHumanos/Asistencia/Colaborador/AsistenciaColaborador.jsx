import ReporteAsistenciaColaborador from "./Reporte/Resport";
import ListAColaborador from "./List/List";
import RegisterAsistenciaColaborador from "./Register/Register";
import ReadOrCreate from "../../../../components/Principal/Principal";

const AsistenciaColaborador = () => {
  return (
    <ReadOrCreate
      ItemList={ListAColaborador}
      ItemRegister={RegisterAsistenciaColaborador}
      ItemReporte={ReporteAsistenciaColaborador}
      submodule="ASISTENCIA"
    />
  );
};

export default AsistenciaColaborador;
