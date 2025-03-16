import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { lazy, Suspense } from "react";
import store from "./redux/store";

import ProtectedRoute from "./ProtectedRoute";
import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";

const Home = lazy(() => import("./components/Home/Home"));
const SideBar = lazy(() => import("./components/SideBar/SideBar"));
const Nav = lazy(() => import("./components/Nav/Nav"));
const OtherProfiles = lazy(() => import("./components/Perfil/OtherProfiles"));
// const Settings = lazy(() => import("./components/Nav/Settings.Button"));
const Title = lazy(() => import("./components/Home/Title"));
const MarcarAsistencia = lazy(() =>
  import("./components/MarcarAsistencia/MarcarAsistencia")
);

function App() {
  const location = useLocation();
  const path = ["/asistencia", "/home", "/", "/profile"].includes(
    location.pathname
  );

  return (
    <AuthProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <div>
            {!path && <SideBar />}
            {!path && <Nav />}

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/*" element={<Error />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/home/:title" element={<Title />} />
                <Route path="/profile" element={<OtherProfiles />} />
                {/* <Route path="/settings" element={<Settings />} /> */}
                <Route path="/asistencia" element={<MarcarAsistencia />} />
              </Route>
            </Routes>
          </div>
        </Suspense>
      </Provider>
    </AuthProvider>
  );
}

export default App;
