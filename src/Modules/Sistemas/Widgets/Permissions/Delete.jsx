import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";
import { getAllWidgets } from "../../../../redux/actions";

const DeleteWidget = ({ setShowDelete, selected }) => {
  const { deleteWidget } = useAuth();
  const sendMessage = useSendMessage();
  const _id = selected?._id;
  const dispatch = useDispatch();

  const eliminarWidget = async () => {
    sendMessage("Cargando...", "Espere");
    try {
      await deleteWidget(_id);
      dispatch(getAllWidgets());
    } catch (error) {
      sendMessage(error, "Error");
    }
  };
  return (
    <Delete setShowDelete={setShowDelete} onclick={() => eliminarWidget()} />
  );
};

export default DeleteWidget;
