import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";

function Home() {

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <SideBar />
      <Nav />
      <div className="pl-20 overflow-auto flex justify-center items-center h-full">
        <p>Dashboard</p>
      </div>
    </div>
  );
}

export default Home;
