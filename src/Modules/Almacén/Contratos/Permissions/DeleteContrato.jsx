import axios from "../../../../api/axios";
import Delete from "../../../../components/Principal/Permissions/Delete";
import useSendMessage from "../../../../recicle/senMessage";

const DeleteContratoAlmacen = ({ setShowDelete, selected, reload }) => {
  const sendMessage = useSendMessage();
  const eliminar = async () => {
    try {
      const selectId = selected._id;
      if (!selectId) {
        sendMessage("Seleccione un contrato para eliminar", "error");
        return;
      }
      await axios.delete(`/deleteContratoAlmacen`, {
        data: { _id: selectId },
      });
      return reload();
    } catch (error) {
      sendMessage(error.message || "Error al eliminar el contrato", "Error");
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={eliminar} />;
};
export default DeleteContratoAlmacen;
