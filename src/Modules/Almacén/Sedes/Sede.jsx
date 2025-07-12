import ReadOrCreate from "../../../components/Principal/Principal";
import ListSedesAlmacen from "./List/List";
import RegisterSedesAlmacen from "./Register/Register";

const SedesAlamcen = () => {
  return (
    <ReadOrCreate
      submodule="SEDES"
      ItemList={ListSedesAlmacen}
      ItemRegister={RegisterSedesAlmacen}
      ItemReporte={null}
    />
  );
};

export default SedesAlamcen;
