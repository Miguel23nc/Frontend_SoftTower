import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { getEmployees, setMessage } from "../../../../redux/actions";
import useref from "../../../../recicle/useRef";
import { useEffect, useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";

const ActiveInactive = ({ setShowApprove, selected }) => {
  const { updateEmployee } = useAuth();
  const estado = selected.state === "ACTIVO" ? "INACTIVO" : "ACTIVO";
  const dispatch = useDispatch();
  const id = selected._id;
  const handleApprove = async () => {
    try {
      await updateEmployee({ _id: id, state: estado });
      dispatch(getEmployees());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  console.log("estado", estado);

  const ref = useref(setShowApprove);
  const [activar, setActivar] = useState(false);
  useEffect(() => {
    if (estado === "ACTIVO") setActivar(true);
  }, [estado]);
  console.log("activar", activar);
  return (
    <div
      ref={ref}
      className="fixed top-0 z-40 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <div className="flex flex-col  bg-white p-8 border-2 rounded-lg shadow-lg ">
        <div className="">
          <h1 className="p-4 font-bold text-red-600 text-center text-5xl">
            Atención !
          </h1>
          <h1 className="p-4 text-center text-xl">
            ¿Estas seguro de cambiar a {activar ? "ACTIVO" : "INACTIVO"}?
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <ButtonOk
            onClick={handleApprove}
            type="ok"
            styles={"!w-full m-4 flex justify-center mx-4"}
            classe={"!w-24"}
            children="SI"
          />
          <ButtonOk
            onClick={() => setShowApprove(false)}
            styles={"!w-full m-4 flex justify-center mx-4"}
            classe={"!w-24"}
            children="NO"
          />
        </div>
      </div>
    </div>
  );
};
export default ActiveInactive;
