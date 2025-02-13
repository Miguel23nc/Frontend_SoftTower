import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts } from "../../../../redux/actions";

const DeleteContract = ({ setShowDelete, selected }) => {
  const { deleteContrato } = useAuth();
  const id = selected._id;
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await deleteContrato(id);
      dispatch(getContracts());
    } catch (error) {
      console.log(error);
    }
  };
  return <Delete setShowDelete={setShowDelete} onclick={handleDelete} />;
};

export default DeleteContract;
