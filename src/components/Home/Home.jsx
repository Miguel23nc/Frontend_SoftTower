import { useState } from "react";
import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";
import Widgets from "../Widgets/Widgets";

function Home() {
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    setShowWidget(!value);
  };
  return (
    <div className="flex flex-col h-screen overflow-auto relative">
      <SideBar />
      <Nav />
      <div className="ml-20 pl-2 space-x-10 overflow-auto flex justify-center m-2 h-full">
        {showWidget && <Widgets />}
        <div
          onClick={() => handleShowWidget(showWidget)}
          className="fixed bottom-10 right-10 w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition"
        >
          <span className="text-5xl font-bold leading-none relative -top-1">
            +
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
