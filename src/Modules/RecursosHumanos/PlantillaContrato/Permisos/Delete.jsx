import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import { getPlantillasContrato } from "../../../../redux/modules/Recursos Humanos/actions";
import useSendMessage from "../../../../recicle/senMessage";

const DeletePlantillaContrato = ({ setShowDelete, selected }) => {
  const { deletePlantillaContrato } = useAuth();
  const dispatch = useDispatch();
  const sendMessage = useSendMessage();
  const onclick = async () => {
    try {
      await deletePlantillaContrato(selected._id);
      dispatch(getPlantillasContrato());
    } catch (error) {
      sendMessage(error.message, "Error");
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={onclick} />;
};

export default DeletePlantillaContrato;
