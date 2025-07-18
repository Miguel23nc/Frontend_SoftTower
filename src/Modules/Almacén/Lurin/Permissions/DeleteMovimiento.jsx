import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteMovimientoAlmacen = ({ setShowDelete, selected, reload }) => {
  const { deleteMovimientoAlmacen } = useAuth();
  const sendMessage = useSendMessage();
  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione una Nave para eliminar", "error");
        return;
      }
      await deleteMovimientoAlmacen(selectId);
      reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar el movimiento", "Error");
    }
  };
  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};

export default DeleteMovimientoAlmacen;
