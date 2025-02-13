import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions";

const useSendMessage = () => {
  const dispatch = useDispatch();

  return (message, type) => {
    dispatch(setMessage(message, type));
  };
};

export default useSendMessage;
