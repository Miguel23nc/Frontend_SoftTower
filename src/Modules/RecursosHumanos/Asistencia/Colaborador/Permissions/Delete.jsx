import { useDispatch } from "react-redux";
import Delete from "../../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../../context/AuthContext";
import { getAsistenciaColaboradores } from "../../../../../redux/actions";

const DeleteAsistenciaColaborador = ({ setShowDelete, selected }) => {

  const id = selected._id;
  const { deleteAsistenciaColaborador } = useAuth();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteAsistenciaColaborador(id);
    dispatch(getAsistenciaColaboradores());
  };

  return <Delete setShowDelete={setShowDelete} onclick={handleDelete} />;
};

export default DeleteAsistenciaColaborador;
