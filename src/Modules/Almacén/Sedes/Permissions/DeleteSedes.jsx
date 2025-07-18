import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteSedeAlmacen = ({ setShowDelete, selected, reload }) => {
  const { deleteSedesAlmacen } = useAuth();
  const sendMessage = useSendMessage();

  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione una Sede para eliminar", "Error");
        return;
      }
      await deleteSedesAlmacen(selectId);
      reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar la Sede", "Error");
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};

export default DeleteSedeAlmacen;
