import { useDispatch } from "react-redux";
import Delete from "../../../../components/Principal/Permissions/Delete";
import { useAuth } from "../../../../context/AuthContext";
import { getBusiness } from "../../../../redux/modules/Recursos Humanos/actions";

const DeleteBusiness = ({ setShowDelete, selected }) => {
  const id = selected._id;
  const dispatch = useDispatch();
  const { deleteBusiness } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteBusiness(id);
      dispatch(getBusiness());
    } catch (error) {
       ;
    }
  };
  return <Delete onclick={handleDelete} setShowDelete={setShowDelete} />;
};

export default DeleteBusiness;
