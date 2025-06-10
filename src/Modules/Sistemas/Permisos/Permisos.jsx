import ReadOrCreate from "../../../components/Principal/Principal";
import ListPermisos from "./List/List";

const Permissions = () => {
  return (
    <ReadOrCreate
      ItemReporte={null}
      ItemRegister={null}
      ItemList={ListPermisos}
      submodule="PERMISOS"
    />
  );
};

export default Permissions;
