import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  const enviar = async () => {
    try {
      await logout();
    } catch (error) {
      throw new Error("Error al cerrar sesión : ", error);
    }
  };

  return (
    <button className="m-2" onClick={() => enviar()}>
      Salir
    </button>
  );
};

export default Logout;
