import ReadOrCreate from "../../../components/Principal/Principal";
import ListZonas from "./List/List";
import RegisterZonas from "./Register/Register";

const ZonasAlmacen = () => {
  return (
    <ReadOrCreate
      submodule="ZONAS"
      ItemList={ListZonas}
      ItemRegister={RegisterZonas}
    />
  );
};

export default ZonasAlmacen;
