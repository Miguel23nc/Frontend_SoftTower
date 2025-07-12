import InputDate from "../../../../recicle/Inputs/tipos/InputDate";
import InputTime from "../../../../recicle/Inputs/tipos/InputTime";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";

const Otros = ({ form, setForm, error }) => {
  return (
    <div className="w-full flex flex-wrap ">
      <div className="w-full flex flex-wrap p-2">
        <InputNormal
          label="Referencia Fotografica"
          name="referenciaImagen"
          type="file"
          value={form.referenciaImagen}
          setForm={setForm}
        />
        <InputTime
          label="Hora de Salida"
          name="horaSalida"
          type="time"
          value={form.horaSalida}
          setForm={setForm}
        />
        <InputDate
          label="Fecha de Salida"
          name="fechaSalida"
          type="date"
          value={form.fechaSalida}
          setForm={setForm}
        />
      </div>
      <div className=" flex flex-col mx-3 w-[90%] ">
        <label className={`text-base font-medium  "text-gray-700" `}>
          Opservaciones
        </label>
        <textarea
          label="Observaciones"
          className="mt-1 py-2 border px-3 w-[100%] !text-base rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          name="observaciones"
          value={form.observaciones}
          onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
        />
      </div>
      <div className=" flex flex-col mx-3 w-[90%] ">
        <label className={`text-base font-medium  "text-gray-700" `}>
          Detalles de Peso
        </label>
        <textarea
          label="Detalles de Peso"
          className="mt-1 py-2 border px-3 w-[100%] !text-base rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          name="detallesDePeso"
          value={form.detallesDePeso}
          onChange={(e) => setForm({ ...form, detallesDePeso: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Otros;
