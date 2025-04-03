import { useEffect, useState } from "react";
import useModulesAndSubModules from "../SideBar/Links";

const WidgetStore = ({ show }) => {
  const [mostrar, setMostrar] = useState(false);
  const { links } = useModulesAndSubModules();

  useEffect(() => {
    setMostrar(show);
  }, [show]);
  const options = [
    ...links.map((option) => {
      return option.module;
    }), "OTROS"
  ];
  const [selectedOption, setSelectedOption] = useState("OTROS");
  const [selects, setSelects] = useState(["sncsj"]);

  const onClickOption = (option) => {
    setSelectedOption(option);
    const submodules = links.find((link) => link.module === option)?.submodule;
    setSelects([...submodules]);
  };

  return (
    <div
      className={`border-2 p-3 absolute top-[8%] rounded-[60px] items-center justify-center ite h-[85%] w-[90%] border-gray-100 bg-white shadow-lg flex transition-all duration-300 ${
        mostrar
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-5 "
      }`}
    >
      <div className="flex shadow-lg flex-col py-5 items-center bg-gradient-to-t from-[#ffffff] to-[#ececec3a] rounded-[60px] w-[13%] h-[97%]">
        <div className="flex items-center justify-center rounded-xl mt-10  w-[90%] border-gray-100  shadow-lg  py-4 bg-gray-100">
          <h2 className="text-center text-2xl font-bold">Store</h2>
        </div>
        <div className="flex py-5 flex-col overflow-y-auto items-center justify-start w-full h-full ">
          {options.map((option, index) => (
            <button
              onClick={() => onClickOption(option)}
              key={index}
              className={`transition-all duration-300 flex py-3 items-center justify-center text-gray-700 rounded-xl my-4 h-12 w-[88%] border-gray-100 shadow-lg ${
                selectedOption === option
                  ? "bg-gradient-to-r from-gray-400 to-gray-300 text-gray-100 scale-105"
                  : "bg-[#fffefe] hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-100 hover:scale-105"
              }`}
            >
              <span className="text-center text-md font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start overflow-y-auto w-[85%] shadow-lg bg-gradient-to-r from-[#ffffff] to-[#f1f1f181] rounded-[60px] h-[97%]">
        <div className="flex  p-12 flex-wrap gap-[5%] w-full h-full">
          {selects.map((option, index) => (
            <div
              key={index}
              className=" w-[30%] h-[50%] rounded-3xl my-5 border-gray-100 bg-gray-200 shadow-lg"
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetStore;
