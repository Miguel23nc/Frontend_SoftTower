import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../../recicle/Inputs/Inputs";
import { useEffect } from "react";
import { getEmployees } from "../../../../../redux/actions";

const DatoDeColaborador = ({ setForm, error, form }) => {
  const colaboradores = useSelector((state) => state.recursosHumanos.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [dispatch]);
  const colaboradoreNombres = colaboradores.map(
    (colaborador) => colaborador.lastname + " " + colaborador.name
  );
  return (
    <div className="flex flex-wrap">
      <Input
        label="Colaborador"
        type="select"
        name="colaborador"
        value={form.colaborador}
        options={colaboradoreNombres}
        setForm={setForm}
        errorOnclick={error.colaborador}
      />
    </div>
  );
};

export default DatoDeColaborador;
