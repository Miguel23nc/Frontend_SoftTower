import Details from "../../../../../components/Principal/Permissions/View";
import PDetail from "../../../../../recicle/PDtail";

const DetailAsistenciaColaborador = ({ setShowDetail, selected }) => {
  const {
    fecha,
    ingreso,
    salida,
    inicioAlmuerzo,
    finAlmuerzo,
    colaborador,
    minTarde,
    minExtras,
    estado,
  } = selected;
  const {
    name,
    lastname,
    photo,
    sede,
    documentType,
    documentNumber,
    state,
    charge,
    business,
  } = colaborador;
  return (
    <Details setShowDetail={setShowDetail}>
      <div className="flex justify-around">
        <div>
          <h3 className="text-3xl font-bold mb-5">DATOS DE LA ASISTENCIA</h3>
          <PDetail content="FECHA: " value={fecha} />
          <PDetail content="HORA DE INGRESO: " value={ingreso} />
          <PDetail content="HORA DE SALIDA: " value={salida} />
          <PDetail content="INICIO DE ALMUERZO: " value={inicioAlmuerzo} />
          <PDetail content="FIN DE ALMUERZO: " value={finAlmuerzo} />
          <PDetail content="ESTADO: " value={estado} />
          <PDetail content="MINUTOS DE TARDANZA: " value={minTarde} />
          <PDetail content="MINUTOS DE HORAS EXTRAS: " value={minExtras} />
        </div>

        <div>
          <h3 className="text-3xl mb-5 font-bold">DATOS DEL COLABORADOR</h3>
          <PDetail content="NOMBRES: " value={name} />
          <PDetail content="APELLIDOS: " value={lastname} />
          <PDetail content="TIPO DE DOCUMENTO: " value={documentType} />
          <PDetail content="NÚMERO DE DOCUMENTO: " value={documentNumber} />
          <PDetail content="ESTADO: " value={state} />
          <PDetail content="CARGO: " value={charge} />
          <PDetail content="EMPRESA: " value={business} />
          <PDetail content="SEDE: " value={sede} />
        </div>

        <div>
          <PDetail content="FOTO: " />
          <img
            src={photo}
            alt="Foto del colaborador"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      </div>
    </Details>
  );
};

export default DetailAsistenciaColaborador;
