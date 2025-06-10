import ReadOrCreate from "../../../components/Principal/Principal";
import ListBackups from "./List/List";

const Backups = () => {
  return (
    <ReadOrCreate
      submodule="BACKUPS"
      ItemList={ListBackups}
      ItemRegister={null}
      ItemReporte={null}
    />
  );
};
export default Backups;
