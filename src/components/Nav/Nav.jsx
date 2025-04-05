import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Options from "../../recicle/Option";
import Logout from "../Logout/Logout";
import SearchBar from "../Nav/SearchBar";
import Notificon from "../../recicle/Buttons/Notification";
const imagen = "https://cdn-icons-png.freepik.com/512/10975/10975953.png";

const Nav = () => {
  const { user } = useAuth();
  const notificaciones = ["notificaione 1"];
  return (
    <div className="flex justify-between ml-20 bg-white items-center px-12 h-20  border-b border-t-stone-400">
      <div className=" flex justify-around  items-center  m-2 rounded-lg h-14">
        {/* <img src={imagen} alt="buscador" className="w-10 bg-white h-200" />
        <SearchBar></SearchBar> */}
      </div>
      {user ? (
        <div className=" flex justify-around items-center m-2  h-1">
          <Link to="/notificaciones">
            <div className=" bg-slate-200 flex justify-center items-center w-16 m-4 h-16 rounded-full">
              <Notificon />
            </div>
          </Link>

          <Options
            content={
              <img
                className="rounded-full h-16 w-16 shadow-md shadow-gray-200 active:shadow-inner object-cover"
                src={user.photo}
                alt={user.name?.split(" ")[0] || "foto"}
              />
            }
            children={
              <div className="flex flex-col justify-center items-start">
                <a
                  className="m-2 w-full text-start"
                  href={`/profile?id=${user._id}`}
                >
                  <button>Perfil</button>
                </a>
                <a className="m-2 w-full text-start" href="/settings">
                  <button>Configuración</button>
                </a>
                <Logout></Logout>
              </div>
            }
            classname1="mr-0"
          />
        </div>
      ) : (
        <div>
          <Link to="/">Sign In</Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
