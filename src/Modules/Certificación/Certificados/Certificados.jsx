import ReadOrCreate from "../../../components/Principal/Principal";
import ListCertificados from "./List/List";
import RegisterCertificado from "./Register/Register";

const Certificados = () => {
  return (
    <ReadOrCreate
      ItemRegister={RegisterCertificado}
      ItemList={ListCertificados}
      submodule="CERTIFICADOS"
    />
  );
};

export default Certificados;
