import { useState } from "react";
import LeftSideBar from "../../recicle/LeftSideBar";
import useref from "../../recicle/useRef";
import styled from "styled-components";

const OptionSideBar = ({ icon, options, module }) => {
  const [mostrar, setMostrar] = useState(false);
  const ref = useref(setMostrar);

  const handleSubmit = () => {
    setMostrar(!mostrar);
  };

  return (
    <div
      ref={ref}
      className="w-16 flex justify-center  m-2 my-8 bg-white  rounded-full"
    >
      {mostrar && (
        <LeftSideBar
          show={mostrar}
          handleSubmit={handleSubmit}
          options={options}
        />
      )}
      <button
        className="p-[7px] boder  active:shadow-inner border-gray-200 shadow-lg shadow-gray-500 m-[5px]
        bg-gradient-to-tr from-white to-gray-300 rounded-full"
        title={module}
        onClick={handleSubmit}
      >
        {icon}
      </button>
    </div>
  );
};

export default OptionSideBar;
