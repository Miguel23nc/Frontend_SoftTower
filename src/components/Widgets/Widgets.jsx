import { useEffect, useState } from "react";
import WidgetStore from "./WitghetStore";

const Widgets = () => {
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    console.log(value);

    setShowWidget(!value);
  };
  return (
    <div className="ml-20 pl-2 space-x-10 flex justify-center m-2 h-full">
      {showWidget && <WidgetStore show={showWidget} />}
      <div
        onClick={() => handleShowWidget(showWidget)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-[#2b5993] to-[#418fda] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition"
      >
        <span className="text-5xl font-bold leading-none relative -top-1">
          +
        </span>
      </div>
    </div>
  );
};

export default Widgets;
