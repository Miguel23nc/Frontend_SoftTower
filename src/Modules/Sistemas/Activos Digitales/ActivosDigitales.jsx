import ReadOrCreate from "../../../components/Principal/Principal";
import ListActivosDigitales from "./List/ListActivosDigitales";
import RegisterActivosDigitales from "./Register/Register";

const ActivosDigitales = () => {
  return (
    <ReadOrCreate
      ItemList={ListActivosDigitales}
      ItemRegister={RegisterActivosDigitales}
      submodule={"ACTIVOS DIGITALES"}
    />
  );
};

export default ActivosDigitales;
