import { useState } from "react";

const CardPlegable = ({ title, children }) => {
  const [show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="ml-12 mr-4 m-4">
      <button
        type="ok"
        className="my-2 font-semibold text-xl"
        onClick={() => handleShow()}
      >
        {title}
      </button>
      <div className="bg-slate-400 w-full h-[1px] mb-4"></div>
      {show && children}
    </div>
  );
};

export default CardPlegable;
