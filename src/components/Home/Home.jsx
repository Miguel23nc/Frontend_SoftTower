import { useState } from "react";
import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";
import Widgets from "../Widgets/Widgets";
import Contruction from "../../recicle/componentes ui/Construction";

function Home() {
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    console.log(value);

    setShowWidget(!value);
  };
  return (
    <div className="flex flex-col overflow-auto ">
      {/* <Contruction /> */}
      <Widgets />
    </div>
  );
}

export default Home;
