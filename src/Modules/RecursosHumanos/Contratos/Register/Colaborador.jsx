import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import { getEmployees } from "../../../../redux/modules/Recursos Humanos/actions";

const Colaborador = ({ setForm, error, form }) => {
  const allEmployees = useSelector(
    (state) => state.recursosHumanos.allEmployees
  );

  let colaborador = form.colaborador._id
    ? form.colaborador
    : allEmployees.find((item) => item._id === form.colaborador);

  const [formColaborador, setFormColaborador] = useState({
    ...colaborador,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (allEmployees?.length === 0) {
      dispatch(getEmployees());
    }
  }, [allEmployees.length, dispatch]);
  const employees = allEmployees?.map(
    (item) => item.lastname + " " + item.name
  );
  const findColaborador = allEmployees?.find(
    (item) => item.lastname + " " + item.name === formColaborador.name
  );

  useEffect(() => {
    if (findColaborador) {
      setFormColaborador({
        ...formColaborador,
        _id: findColaborador._id,
        charge: findColaborador.charge,
        sueldo: findColaborador.sueldo,
        documentType: findColaborador.documentType,
        documentNumber: findColaborador.documentNumber,
        direccion: findColaborador.location.direccion,
        email: findColaborador.email,
        empresa: findColaborador.business,
      });
    }
  }, [findColaborador]);
  useEffect(() => {
    setForm({ ...form, colaborador: formColaborador });
  }, [formColaborador]);

  return (
    <div className="flex flex-wrap">
      <Input
        label="Razon social"
        name="name"
        type="select"
        options={employees}
        value={formColaborador.name}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.name}
      />
      <Input
        label="Empresa"
        name="empresa"
        value={formColaborador?.empresa}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.empresa}
      />
      <Input
        label="Tipo de documento"
        name="documentType"
        value={formColaborador?.documentType}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.documentType}
      />
      <Input
        label="Número de documento"
        name="documentNumber"
        value={formColaborador?.documentNumber}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.documentNumber}
      />
      <Input
        label="Dirección"
        name="direccion"
        value={formColaborador?.direccion}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.direccion}
      />
      <Input
        label="Email"
        name="email"
        value={formColaborador?.email}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.email}
      />
      <Input
        label="Cargo"
        name="charge"
        value={formColaborador?.charge}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.charge}
      />
      <Input
        label="Sueldo"
        name="sueldo"
        value={formColaborador?.sueldo}
        setForm={setFormColaborador}
        errorOnclick={error.colaborador?.sueldo}
      />
    </div>
  );
};

export default Colaborador;
