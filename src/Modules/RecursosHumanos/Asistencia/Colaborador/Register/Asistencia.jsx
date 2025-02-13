import InputDate from "../../../../../recicle/Inputs/tipos/InputDate";
import InputTime from "../../../../../recicle/Inputs/tipos/InputTime";

const DatosDeAsistencia = ({ setForm, error, form }) => {
  return (
    <div className="flex flex-wrap">
      <InputDate
        label="Fecha De Asistencia"
        name="fecha"
        value={form.fecha}
        setForm={setForm}
        errorOnclick={error.fecha}
      />
      <InputTime
        label="Hora de Entrada"
        name="ingreso"
        value={form.ingreso}
        setForm={setForm}
        errorOnclick={error.ingreso}
      />
      <InputTime
        label="Hora de Salida"
        name="salida"
        value={form.salida}
        setForm={setForm}
        errorOnclick={error.salida}
      />
      <InputTime
        label="inicio de Almuerzo"
        name="inicioAlmuerzo"
        value={form.inicioAlmuerzo}
        setForm={setForm}
        errorOnclick={error.inicioAlmuerzo}
      />
      <InputTime
        label="Fin de Almuerzo"
        name="finAlmuerzo"
        value={form.finAlmuerzo}
        setForm={setForm}
        errorOnclick={error.finAlmuerzo}
      />
    </div>
  );
};

export default DatosDeAsistencia;
