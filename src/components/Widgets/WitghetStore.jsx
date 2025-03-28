import { useEffect, useState } from "react";

const WidgetStore = ({ show }) => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setMostrar(show);
  }, [show]);
  return (
    <div
      className={`border-2 p-3 absolute top-20 rounded-[60px] h-[85%] w-[90%] border-gray-100 bg-white shadow-lg flex transition-all duration-300 ${
        mostrar
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-5 "
      }`}
    >
      <div className="flex shadow-lg flex-col py-5 items-center bg-gradient-to-t from-[#ffffff] to-[#ececec3a] rounded-[60px] w-[10%]">
        <div className="rounded-xl my-4 h-12 w-32 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="rounded-xl my-4 h-12 w-32 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="rounded-xl my-4 h-12 w-32 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="rounded-xl my-4 h-12 w-32 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="rounded-xl my-4 h-12 w-32 border-gray-100 bg-gray-200 shadow-lg"></div>
      </div>
      <div className="flex flex-wrap w-[90%] shadow-lg bg-gradient-to-r from-[#ffffff] to-[#f1f1f181] p-12 rounded-[60px]">
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
        <div className="h-56 w-56 rounded-3xl mt-5 mr-10 border-gray-100 bg-gray-200 shadow-lg"></div>
      </div>
    </div>
  );
};

export default WidgetStore;
