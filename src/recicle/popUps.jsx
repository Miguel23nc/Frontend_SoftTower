import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/actions";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const PopUp = ({ deshabilitar, ...OtherProps }) => {
  console.log("OtherProps", OtherProps);
  console.log("deshabilitar", deshabilitar);

  const { setResponse, setErrors } = useAuth();
  const [showPopUp, setShowPopUp] = useState(false);
  const errorForms = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const handleClosePopUp = () => {
    dispatch(setMessage("", ""));
    setShowPopUp(false);
    if (setResponse) setResponse(null);
    if (setErrors) setErrors(null);
  };

  useEffect(() => {
    if (errorForms.message) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
    }
  }, [errorForms]);
  console.log("errorForms", errorForms);

  return (
    showPopUp && (
      <div
        className="fixed top-0 z-50 left-0 right-0 bottom-0 flex 
    justify-center items-center bg-black bg-opacity-50 "
      >
        <div className="flex flex-col  bg-white p-8  rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-center font-medium text-red-500 p-5  pt-5 text-6xl">
            {errorForms.type}
          </h1>
          <p className="text-center mb-8  font-medium">
            {typeof errorForms.message === "string"
              ? errorForms.message
              : "Error desconocido"}
          </p>
          <div className="flex justify-center items-center w-full">
            {deshabilitar === true ? null : (
              <button
                onClick={handleClosePopUp}
                {...OtherProps}
                className="text-white font-medium bg-blue-500 w-10/12 rounded-lg p-3  "
              >
                Ok
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PopUp;
