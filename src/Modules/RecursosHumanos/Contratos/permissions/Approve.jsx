import { useDispatch } from "react-redux";
import Approve from "../../../../components/Principal/Permissions/Approve";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts, setMessage } from "../../../../redux/actions";

const ApproveContrato = ({ setShowApprove, selected }) => {
  
  const { updateContrato } = useAuth();
  const estado = selected.state === "APROBADO" ? "PENDIENTE" : "APROBADO";
  const dispatch = useDispatch();
  const id = selected._id;
  const handleApprove = async () => {
    try {
      await updateContrato({ _id: id, state: estado });
      dispatch(getContracts());
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <Approve
      setShowApprove={setShowApprove}
      estado={selected.state}
      onclick={handleApprove}
    />
  );
};
export default ApproveContrato;
