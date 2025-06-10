import ReadOrCreate from "../../../components/Principal/Principal";
import ListAsignaciones from "./List/List";

const Asignaciones = () => {
  return (
    <ReadOrCreate
      submodule="ASIGNACIONES"
      ItemList={ListAsignaciones}
      ItemRegister={null}
      ItemReporte={null}
    />
  );
};
export default Asignaciones;
