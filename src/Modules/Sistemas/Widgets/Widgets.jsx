import ReadOrCreate from "../../../components/Principal/Principal";
import ListWidgets from "./List/ListWidgets";
import RegisterWidget from "./Register/Register";

const WidgetsSistemas = () => {
  return (
    <ReadOrCreate
      submodule="WIDGETS"
      ItemList={ListWidgets}
      ItemRegister={RegisterWidget}
    />
  );
};

export default WidgetsSistemas;
