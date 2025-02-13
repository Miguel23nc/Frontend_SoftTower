import ReadOrCreate from "../../../../components/Principal/Principal";
import ListAVisitante from "./List/List";
import RegisterAsistenciaVisitante from "./Register/REgister";
import ReporteAsistenciaVisistante from "./Reporte/Resport";

const AsistenciaVisitante = () => {
  return (
    <ReadOrCreate
      ItemReporte={ReporteAsistenciaVisistante}
      ItemList={ListAVisitante}
      ItemRegister={RegisterAsistenciaVisitante}
      submodule="ASISTENCIA"
    />
  );
};

export default AsistenciaVisitante;
