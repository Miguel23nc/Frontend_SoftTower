import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";

function Home() {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <SideBar />
      <Nav />
      <div className="p-20 space-x-10 overflow-auto flex justify-center h-full">
        <button className="h-28 content-center w-60 rounded-lg border-2 border-black">
          NOTIFICACIONES
        </button>
        <button className="h-28 content-center w-60 rounded-lg border-2 border-black">
          TAREAS
        </button>
        <button className="h-28 content-center w-60 rounded-lg border-2 border-black">
          NOTIFICACIONES
        </button>
        <button className="h-28 content-center w-60 rounded-lg border-2 border-black">
          NOTIFICACIONES
        </button>
      </div>
    </div>
  );
}

export default Home;
