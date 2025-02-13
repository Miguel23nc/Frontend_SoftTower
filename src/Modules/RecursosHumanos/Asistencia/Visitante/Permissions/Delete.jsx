import { useDispatch } from "react-redux";
import Delete from "../../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../../context/AuthContext";
import { getAsistenciaVisitantes } from "../../../../../redux/actions";

const DeleteAsistenciaVisitante = ({ setShowDelete, selected }) => {
  const id = selected._id;
  const { deleteAsistenciaVisitante } = useAuth();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteAsistenciaVisitante(id);
    dispatch(getAsistenciaVisitantes());
  };

  return <Delete setShowDelete={setShowDelete} onclick={handleDelete} />;
};

export default DeleteAsistenciaVisitante;
