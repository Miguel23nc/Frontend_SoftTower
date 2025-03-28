import { useState } from "react";

const CardPlegable = ({ title, children }) => {
  const [show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="ml-12 shadow-md bg-[#f3f3f3a1] rounded-lg mr-4 m-4">
      <button
        type="ok"
        className="my-2 bg-[#ffffff] text-start shadow-md p-4 mb-6 rounded-lg w-full font-semibold text-xl"
        onClick={() => handleShow()}
      >
        {title}
      </button>
      <div className="ml-10 pb-3">{show && children}</div>
    </div>
  );
};

export default CardPlegable;
