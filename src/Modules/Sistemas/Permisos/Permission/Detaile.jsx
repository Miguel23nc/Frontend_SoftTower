import Edit from "../../../../components/Principal/Permissions/Edit";
import Details from "../../../../components/Principal/Permissions/View";

const DetailPermisos = ({ setShowDetail, selected }) => {
  const { modules } = selected;
  return (
    <Details setShowDetail={setShowDetail}>
      <div className="w-full h-[90%] flex flex-col text-start ">
        <span className="text-5xl  text-sky-600 ">Módulos</span>
        <br />
        {modules.length > 0 ? (
          <div className="overflow-y-auto">
            {modules?.map((module, index) => (
              <div
                key={index}
                className="mt-2 border-b border-gray-200 pb-4 shadow-sm"
              >
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
    </Details>
  );
};

export default DetailPermisos;
