import ReadOrCreate from "../../../components/Principal/Principal";
import List from "./List/List";
import Register from "./Register/Register";

const Empresas = () => {
  return (
    <ReadOrCreate
      ItemRegister={Register}
      ItemList={List}
      submodule="EMPRESAS"
    />
  );
};

export default Empresas;
