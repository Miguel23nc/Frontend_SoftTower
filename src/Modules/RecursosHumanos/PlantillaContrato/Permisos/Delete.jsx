import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { getPlantillasContrato, setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";

const DeletePlantillaContrato = ({ setShowDelete, selected }) => {
  const { deletePlantillaContrato } = useAuth();
  const dispatch = useDispatch();

  const onclick = async () => {
    try {
      await deletePlantillaContrato(selected._id);
      dispatch(getPlantillasContrato());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={onclick} />;
};

export default DeletePlantillaContrato;
