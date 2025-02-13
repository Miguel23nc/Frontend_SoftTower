import Details from "../../../../components/Principal/Permissions/View";
import PDetail from "../../../../recicle/PDtail";

const DetailEmployee = ({ setShowDetail, selected }) => {
  const {
    name,
    lastname,
    email,
    documentType,
    documentNumber,
    state,
    dateOfBirth,
    genre,
    civilStatus,
    phone,
    telephone,
    charge,
    sueldo,
    user,
    photo,
    business,
    location,
    modules,
  } = selected;

  return (
    <Details setShowDetail={setShowDetail}>
      <div className="flex justify-around pt-3">
        <div>
          <h3 className="text-2xl font-bold">Datos básicos</h3>
          <div className="mt-2">
            <PDetail content="NOMBRES: " value={name} />
            <PDetail content="APELLIDOS: " value={lastname} />
            <PDetail content="CORREO: " value={email} />
            <PDetail content="TIPO DE DOCUMENTO: " value={documentType} />
            <PDetail content="NÚMERO DE DOCUMENTO: " value={documentNumber} />
            <PDetail content="ESTADO: " value={state} />
            <PDetail
              content="FECHA DE NACIMIENTO: "
              value={new Date(dateOfBirth).toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            />
            <PDetail content="GÉNERO: " value={genre} />
            <PDetail content="ESTADO CIVIL: " value={civilStatus} />
            <PDetail content="TELÉFONO: " value={phone} />
            <PDetail content="TELÉFONO FIJO: " value={telephone} />
            <PDetail content="CARGO: " value={charge} />
            <PDetail content="SUELDO: " value={sueldo} />
            <PDetail content="USUARIO: " value={user} />
            <PDetail content="EMPRESA: " value={business} />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold ">Módulos</h3>
          {modules?.map((module, index) => (
            <div key={index} className="mt-2">
              <PDetail content="Módulo: " value={module.name} />
              <PDetail content="Submódulo: " value={module.submodule.name} />
              <PDetail
                content="Permisos: "
                value={module.submodule.permissions.join(", ")}
              />
            </div>
          ))}
        </div>
        <div>
          {photo && (
            <p>
              <strong>FOTO:</strong>{" "}
              <img
                src={photo}
                alt={`${name} ${lastname}`}
                className="h-40 w-40 rounded-full"
              />
            </p>
          )}
          <h3 className="text-2xl font-bold mt-3">Ubicación</h3>
          <div className="mt-2">
            <PDetail content="Departamento: " value={location?.departamento} />
            <PDetail content="Provincia: " value={location?.provincia} />
            <PDetail content="Distrito: " value={location?.distrito} />
            <PDetail content="Dirección: " value={location?.direccion} />
          </div>
        </div>
      </div>
    </Details>
  );
};

export default DetailEmployee;
