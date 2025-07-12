import ReadOrCreate from "../../../components/Principal/Principal";
import ListNaves from "./List/List";
import RegisterNaves from "./Register/Register";

const Naves = () => {
  return (
    <ReadOrCreate
      submodule="ALMACEN"
      ItemList={ListNaves}
      ItemRegister={RegisterNaves}
    />
  );
};

export default Naves;
