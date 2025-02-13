import ReadOrCreate from "../../../components/Principal/Principal";
import List from "./List/List";
import Report from "./permissions/Report";
import Register from "./Register/Register";

const Contratos = () => {
  return (
    <ReadOrCreate
      ItemReporte={Report}
      ItemRegister={Register}
      ItemList={List}
      submodule="CONTRATOS"
    />
  );
};

export default Contratos;
