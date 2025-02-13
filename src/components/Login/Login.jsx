import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PopUp from "../../recicle/popUps";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/actions";
import useSendMessage from "../../recicle/senMessage";

const Login = () => {
  const navigate = useNavigate();
  const { signin, isAuthenticated, errors, setErrors } = useAuth();
  const sendMessage = useSendMessage();
  const errorForms = useSelector((state) => state.error);
  const dispatch = useDispatch();
  console.log(errorForms);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    sendMessage("Iniciando sesión...", "Info");
    try {
      await signin(data);
      if (errors) {
        dispatch(setMessage(errors, "Error"));
        return setErrors(null);
      }
    } catch (error) {
      dispatch(setMessage("Error al iniciar sesión", "Error"));
    } finally {
      sendMessage("", "");
    }
  };
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("Service Worker registrado", reg))
        .catch((err) => console.log("Error registrando SW:", err));
    }

    let deferredPrompt;
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPrompt = event;

      if (!document.getElementById("installButton")) {
        const installButton = document.createElement("button");
        installButton.id = "installButton";
        installButton.innerText = "Instalar App";
        installButton.style = `
          position: fixed;
          bottom: 30px;
          right: 30px;
          padding: 10px 20px;
          background-color: rgb(20 124 166 / 40%);
          color: white;
          border: none;
          border-radius: 5px;
          z-index: 1000;
          cursor: pointer;
        `;

        installButton.addEventListener("click", () => {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === "accepted") {
              console.log("Usuario instaló la app");
              installButton.remove();
            } else {
              console.log("Usuario canceló la instalación");
            }
          });
        });

        document.body.appendChild(installButton);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      const installButton = document.getElementById("installButton");
      if (installButton) installButton.remove();
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage: "url('SOFTOWER-LOGIN.jpg')",
        backgroundSize: "cover",
        backgroundPositionY: "center",
        backgroundPositionX: "center",
      }}
      className="flex flex-col justify-center items-center h-screen"
    >
      <PopUp />
      <div
        style={{
          backgroundImage: "url('SOFTOWER-LOGIN2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-center sm:w-3/5 2xl:w-2/5 sm:h-[900px] 2xl:h-[865px] lg:p-12 rounded-2xl"
      >
        <div className=" h-1/2"></div>
        <div className=" h-1/2 mt-4 flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl mb-8 mt-10  m-3 text-white text-center">
            INICIAR SESIÓN
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="relative">
              <span>
                <img
                  src="/ICON-LOGIN-1.png"
                  alt="Icon"
                  className="absolute m-2 inset-y-0 left-0 h-5 flex items-center pl-3"
                />
              </span>
              <input
                placeholder="USUARIO"
                type="email"
                style={{ backgroundColor: "#1f2937", borderColor: "#7f8c8d" }}
                className={`mt-1 pl-12 block text-white w-full px-3 py-2 border rounded-3xl shadow-sm sm:text-sm ${
                  formErrors.email ? "border-red-500" : "[]"
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                {...register("email", {
                  required: "El correo electrónico es requerido",
                })}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.email.message}
                </p>
              )}
            </div>
            <div className="relative !mt-4">
              <span>
                <img
                  src="/ICON-LOGIN-2.png"
                  alt="Icon"
                  className="absolute m-2 inset-y-0 left-0 h-5 flex items-center pl-3"
                />
              </span>
              <input
                placeholder="CONTRASEÑA"
                type="password"
                style={{
                  backgroundColor: "#1f2937",
                  borderColor: "#7f8c8d",
                }}
                className={`mt-1 pl-12 bg-slate-800 block w-full px-3 py-2 border rounded-3xl shadow-sm sm:text-sm ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none text-white focus:ring-indigo-500 focus:border-indigo-500`}
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" justify-center w-36 mt-4 h-12 rounded-3xl px-3 py-1.5 text-sm font-semibold leading-6  bg-gradient-to-r from-[#4392e1] to-[#00ffff] hover:scale-105 transition-all
                "
              >
                INICIAR SESIÓN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
