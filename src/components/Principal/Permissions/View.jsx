import React from "react";
import useref from "../../../recicle/useRef";
import ButtonOk from "../../../recicle/Buttons/Buttons";
const Details = (props) => {
  const { setShowDetail, children } = props;
  const detailsRef = useref(setShowDetail);
  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div
      ref={detailsRef}
      className={`w-[70%] h-[80%] bg-white flex flex-col justify-center
         border-stone-500 border shadow-lg fixed top-20 z-50 rounded-xl`}
    >
      <div className="flex justify-center h-[80%]">
        <div className="w-[90%] h-[97%]">
          <div className="p-10 m-5 h-full overflow-y-auto bg-slate-100 rounded-lg shadow-black shadow-sm">
            {children}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-3">
        <ButtonOk onClick={handleCloseDetail} children="Cerrar" />
      </div>
    </div>
  );
};

export default Details;
