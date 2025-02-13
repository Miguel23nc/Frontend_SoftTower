import Register from "./Register/Register";
import List from "./List/List";
import ReadOrCreate from "../../../components/Principal/Principal";
import Report from "./Report/Report";

const Colaboradores = () => {
  return (
    <ReadOrCreate
      ItemReporte={Report}
      ItemRegister={Register}
      ItemList={List}
      submodule="COLABORADORES"
    />
  );
};

export default Colaboradores;
