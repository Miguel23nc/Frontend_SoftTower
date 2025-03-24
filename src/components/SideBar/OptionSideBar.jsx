import { useEffect, useRef, useState } from "react";
import LeftSideBar from "../../recicle/LeftSideBar";
import useref from "../../recicle/useRef";

const OptionSideBar = ({ icon, options }) => {
  const [mostrar, setMostrar] = useState(false);
  const ref = useref(setMostrar);

  const handleSubmit = () => {
    setMostrar(!mostrar);
  };

  return (
    <div
      ref={ref}
      className="w-14 flex justify-center  h-14 m-2 my-8 bg-slate-100  rounded-full"
    >
      {mostrar && (
        <LeftSideBar
          show={mostrar}
          handleSubmit={handleSubmit}
          options={options}
        />
      )}
      <button className="p-2" onClick={handleSubmit}>
        {icon}
      </button>
    </div>
  );
};

export default OptionSideBar;
