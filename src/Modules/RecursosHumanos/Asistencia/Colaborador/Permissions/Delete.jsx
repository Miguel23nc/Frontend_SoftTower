import { useDispatch } from "react-redux";
import Delete from "../../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../../context/AuthContext";
import {
  getAsistenciaColaboradores,
  setMessage,
} from "../../../../../redux/actions";

const DeleteAsistenciaColaborador = ({ setShowDelete, selected }) => {
  const id = selected._id;
  const { deleteAsistenciaColaborador } = useAuth();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await deleteAsistenciaColaborador(id);
      dispatch(getAsistenciaColaboradores());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };

  return <Delete setShowDelete={setShowDelete} onclick={handleDelete} />;
};

export default DeleteAsistenciaColaborador;
