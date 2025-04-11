const Profile = ({ user }) => {
  const {
    name,
    lastname,
    business,
    documentNumber,
    documentType,
    state,
    dateStart,
    photo,
    charge,
    location,
    email,
    dateOfBirth,
    phone,
    sede,
    modules,
  } = user;

  return (
    <div
      className="flex ml-20 flex-col items-center  justify-center h-screen"
      style={{ fontFamily: "Roboto" }}
    >
      <div className=" overflow-y-auto border-2 rounded-xl h-[45%] bg-white w-[95%] m-3 flex items-center justify-center">
        <div className="flex border-2 m-4 items-center justify-center  rounded-full">
          <img
            src={photo}
            className=" rounded-full w-80 h-80 object-cover"
            alt="Profile"
          />
        </div>
        <div className="ml-32 h-[90%] w-[60%] flex flex-col justify-center">
          <span className="text-6xl font-semibold mb-2 text-sky-600 ">
            {lastname + " " + name}
          </span>
          <div className="flex flex-row ">
            <div className="flex flex-col h-52  overflow-x-auto overflow-y-auto ">
              <span className="text-2xl my-1 text-sky-600 ">
                Cargo : <span className="text-black">{charge}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Empresa : <span className="text-black">{business}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Fecha de inicio :{" "}
                <span className="text-black">{dateStart}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Fecha de cumpleaños :{" "}
                <span className="text-black">{dateOfBirth}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Estado : <span className="text-black">{state}</span>
              </span>
            </div>
            <div className="flex flex-col h-52 overflow-y-auto ml-9">
              <span className="text-2xl my-1 text-sky-600 ">
                Tipo de Documento :{" "}
                <span className="text-black">{documentType}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Número de Documento :{" "}
                <span className="text-black">{documentNumber}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Celular: <span className="text-black">{phone}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Sede: <span className="text-black">{sede}</span>
              </span>
              <span className="text-2xl my-1 text-sky-600 ">
                Email : <span className="text-black">{email}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 bg-white rounded-xl h-[45%] w-[95%] m-3 flex pt-10  justify-center">
        <div className="w-[20%]  h-[90%] overflow-y-auto flex flex-col text-start">
          <span className="text-5xl  text-sky-600 ">Dirección</span>
          <br />
          <span className="text-2xl my-1 text-sky-600 ">
            Departamento :{" "}
            <span className="text-black">{location.departamento}</span>
          </span>
          <span className="text-2xl my-1 text-sky-600 ">
            Provincia: <span className="text-black">{location.provincia}</span>
          </span>
          <span className="text-2xl my-1 text-sky-600 ">
            Distrito : <span className="text-black">{location.distrito}</span>
          </span>
          <span className="text-2xl my-1 text-sky-600 ">
            Ubicación : <span className="text-black">{location.direccion}</span>
          </span>
        </div>
        <div className="ml-32 w-[50%] h-[90%] flex flex-col text-start ">
          <span className="text-5xl  text-sky-600 ">Módulos</span>
          <br />
          {modules.length > 0 ? (
            <div className="overflow-y-auto">
              {modules?.map((module, index) => (
                <div key={index} className="mt-2 ">
                  <span className="text-2xl my-1 text-sky-600 ">
                    Módulo: <span className="text-black">{module.name}</span>
                  </span>
                  {"  "}
                  <span className="text-2xl my-1 text-sky-600 ">
                    Submódulo:{"  "}
                    <span className="text-black">{module.submodule.name}</span>
                  </span>{" "}
                  <span className="text-2xl my-1 text-sky-600 ">
                    Permisos:{" "}
                    <span className="text-black">
                      {module.submodule.permissions.join(", ")}
                    </span>
                  </span>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-2xl my-1 text-sky-600 ">
              No tiene módulos asignados
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
