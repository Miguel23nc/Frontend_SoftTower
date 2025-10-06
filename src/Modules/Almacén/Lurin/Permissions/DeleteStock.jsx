import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteStock = ({ setShowDelete, selected, reload }) => {
  const { deleteStockAlmacen } = useAuth();
  const sendMessage = useSendMessage();
  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione un Stock para eliminar", "error");
        return;
      }
      await deleteStockAlmacen(selectId);
      reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar el stock", "Error");
    }
  };
  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};

export default DeleteStock;
