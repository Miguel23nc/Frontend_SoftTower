import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts, setMessage } from "../../../../redux/actions";

const DeleteContrato = ({ setShowDelete, selected }) => {
  const id = selected._id;
  const dispatch = useDispatch();
  const { deleteContrato } = useAuth();
  const handleDelete = async () => {
    try {
      await deleteContrato(id);
      dispatch(getContracts());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  return <Delete setShowDelete={setShowDelete} onclick={handleDelete} />;
};

export default DeleteContrato;
