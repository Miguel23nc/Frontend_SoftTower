import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts, setMessage } from "../../../../redux/actions";
import Disapprove from "../../../../components/Principal/Permissions/Disapprove";

const DisapproveContrato = ({ setShowDisapprove, selected }) => {
  const { updateContrato } = useAuth();
  const estado = "PENDIENTE";
  const dispatch = useDispatch();
  const id = selected._id;
  const handleDisapprove = async () => {
    try {
      await updateContrato({ _id: id, state: estado });
      dispatch(getContracts());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <Disapprove
      setShowDisapprove={setShowDisapprove}
      estado={selected.state}
      onclick={handleDisapprove}
    />
  );
};
export default DisapproveContrato ;
