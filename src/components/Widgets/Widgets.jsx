import { useEffect, useState } from "react";
import WidgetStore from "./store";

const Widgets = () => {
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    setShowWidget(!value);
  };
  return (
    <div className="ml-20 pl-2 space-x-10 flex justify-center m-2 h-full">
      {showWidget && <WidgetStore show={showWidget} />}
      <div
        onClick={() => handleShowWidget(showWidget)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-[#2b5993] to-[#418fda] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition"
      >
        <span
          className={`absolute w-10 h-1 bg-white text-5xl font-bold leading-none  transition-transform duration-300 ${
            showWidget ? "rotate-45" : ""
          }`}
        ></span>

        <span
          className={`absolute w-10 h-1 text-5xl font-bold leading-none  bg-white transition-transform duration-300 ${
            showWidget ? "-rotate-45" : "rotate-90"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default Widgets;
