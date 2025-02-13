import { useDispatch } from "react-redux";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import { getClients } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import useref from "../../../../recicle/useRef";

const Delete = ({ setShowDelete, client }) => {
  const id = client._id;
  console.log(id);
  const ref = useref(setShowDelete);
  const dispatch = useDispatch();
  const { deleteClient } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await deleteClient(id);
      dispatch(getClients());
      console.log("Response: ", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      ref={ref}
      className="fixed flex   z-40 
         "
    >
      <div className="flex flex-col  bg-white p-8 border-2 rounded-lg border-red-300 shadow-lg ">
        <div className="">
          <h1 className="p-4 font-bold text-red-600 text-center text-5xl">
            ⚠ Alerta! ⚠
          </h1>
          <h1 className="p-4 text-center text-xl">
            ¿Está seguro que desea eliminarlo?
          </h1>
        </div>
        <div className="flex justify-center">
          <ButtonOk onClick={handleDelete} type="ok" children="SI" />
          <ButtonOk onClick={() => setShowDelete(false)} children="NO" />
        </div>
      </div>
    </div>
  );
};

export default Delete;
