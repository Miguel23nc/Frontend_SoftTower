import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { PrimeReactProvider } from 'primereact/api';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
