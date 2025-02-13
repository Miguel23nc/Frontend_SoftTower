import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import { getEmployees } from "../../../../redux/actions";

const Colaborador = ({ setForm, error, form }) => {
  const [formColaborator, setFormColaborator] = useState({
    ...form.colaborator,
  });

  const allEmployees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    if (allEmployees.length === 0) {
      dispatch(getEmployees());
    }
  }, [allEmployees]);
  const employees = allEmployees?.map(
    (item) => item.lastname + " " + item.name
  );
  const findColaborator = allEmployees?.find(
    (item) => item.lastname + " " + item.name === formColaborator.name
  );

  useEffect(() => {
    if (findColaborator) {
      setFormColaborator({
        ...formColaborator,
        charge: findColaborator.charge,
        sueldo: findColaborator.sueldo,
        documentType: findColaborator.documentType,
        documentNumber: findColaborator.documentNumber,
        address: findColaborator.location.direccion,
        email: findColaborator.email,
      });
    }
  }, [findColaborator]);
  useEffect(() => {
    setForm({ ...form, colaborator: formColaborator });
  }, [formColaborator]);

  return (
    <div className="flex flex-wrap">
      <Input
        label="Razon social"
        name="name"
        type="select"
        options={employees}
        value={formColaborator.name}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.name}
      />
      <Input
        label="Cargo"
        name="charge"
        value={formColaborator?.charge}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.charge}
      />
      <Input
        label="Sueldo"
        name="sueldo"
        value={formColaborator?.sueldo}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.sueldo}
      />
      <Input
        label="Tipo de documento"
        name="documentType"
        value={formColaborator?.documentType}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.documentType}
      />
      <Input
        label="Número de documento"
        name="documentNumber"
        value={formColaborator?.documentNumber}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.documentNumber}
      />
      <Input
        label="Dirección"
        name="address"
        value={formColaborator?.address}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.address}
      />
      <Input
        label="Email"
        name="email"
        value={formColaborator?.email}
        setForm={setFormColaborator}
        errorOnclick={error.colaborator.email}
      />
    </div>
  );
};

export default Colaborador;
