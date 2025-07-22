import ReadOrCreate from "../../../components/Principal/Principal";
import ListContratosAlmacen from "./List/List";
import RegisterContractalmacen from "./Register/Register";

const ContratoAlmacen = () => {
  return (
    <ReadOrCreate
      ItemRegister={RegisterContractalmacen}
      ItemList={ListContratosAlmacen}
      submodule="CONTRATOS"
    />
  );
};

export default ContratoAlmacen;
