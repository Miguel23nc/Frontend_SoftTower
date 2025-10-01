import { useParams } from "react-router";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteNaveAlmacen = ({ setShowDelete, selected, reload }) => {
  console.log("selected en DeleteNaveAlmacen:", selected);
  
  const { deleteNavesAlmacen } = useAuth();
  const sendMessage = useSendMessage();

  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione una Nave para eliminar", "error");
        return;
      }
      await deleteNavesAlmacen(selectId);
      reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar la Nave", "Error");
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};

export default DeleteNaveAlmacen;
