import Reporte from "../../../components/Principal/Permissions/Reporte";
import ReadOrCreate from "../../../components/Principal/Principal";
import ListInventario from "./List/List";
import RegisterInventarioSistemas from "./Register/Register";

const Inventario = () => {
  return (
    <ReadOrCreate
      submodule="INVENTARIO"
      ItemList={ListInventario}
      ItemRegister={RegisterInventarioSistemas}
      ItemReporte={Reporte}
    />
  );
};

export default Inventario;
