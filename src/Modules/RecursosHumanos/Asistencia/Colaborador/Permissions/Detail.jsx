import Details from "../../../../../components/Principal/Permissions/View";
import PDetail from "../../../../../recicle/PDtail";

const DetailAsistenciaColaborador = ({ setShowDetail, selected }) => {
  const {
    fecha,
    ingreso,
    ingresoSede,
    salida,
    salidaSede,
    inicioAlmuerzo,
    finAlmuerzo,
    almuerzoSede,
    colaborador,
    minTarde,
    minExtras,
    observaciones,
    estado,
  } = selected;
  const {
    name,
    lastname,
    photo,
  } = colaborador;

  return (
    <Details setShowDetail={setShowDetail}>
      <div className="flex justify-around">
        <div>
          <h3 className="text-3xl font-bold mb-5">DATOS DE LA ASISTENCIA</h3>
          <PDetail content="FECHA: " value={fecha} />
          <PDetail content="HORA DE INGRESO: " value={ingreso} />
          <PDetail content="SEDE DE INGRESO: " value={ingresoSede} />
          <PDetail content="HORA DE SALIDA: " value={salida} />
          <PDetail content="SEDE DE SALIDA: " value={salidaSede} />
          <PDetail content="INICIO DE ALMUERZO: " value={inicioAlmuerzo} />
          <PDetail content="FIN DE ALMUERZO: " value={finAlmuerzo} />
          <PDetail content="SEDE DE ALMUERZO: " value={almuerzoSede} />
          <PDetail content="ESTADO: " value={estado} />
          <PDetail content="MINUTOS DE TARDANZA: " value={minTarde} />
          <PDetail content="MINUTOS DE HORAS EXTRAS: " value={minExtras} />
          <PDetail content="OBSERVACIONES: " value={observaciones} />
        </div>

        <div>
          <h3 className="text-3xl mb-5 font-bold">DATOS DEL COLABORADOR</h3>
          <PDetail content="NOMBRES: " value={name} />
          <PDetail content="APELLIDOS: " value={lastname} />
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
