import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteZonaAlmacen = ({ setShowDelete, selected, reload }) => {
  const sendMessage = useSendMessage();
  const { deleteZonaAlmacen } = useAuth();

  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione una zona para eliminar", "error");
        return;
      }
      await deleteZonaAlmacen(selectId);
      reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar la zona", "Error");
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};
export default DeleteZonaAlmacen;
