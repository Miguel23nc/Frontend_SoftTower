import { useEffect } from "react";
import { validateForm1 } from "../../../../../recicle/validate";
import { getBusiness } from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../../recicle/Inputs/tipos/Normal";
import InpuFiles from "../../../../../recicle/Inputs/tipos/InputFile";
import InputDate from "../../../../../recicle/Inputs/tipos/InputDate";
const FormOne = ({ setForm, error, form }) => {
  const business = useSelector((state) => state.business);
  const dispatch = useDispatch();
  useEffect(() => {
    if (business.length === 0) dispatch(getBusiness());
  }, [dispatch]);

  return (
    <form className="flex flex-wrap space py-8 p-12 items-center w-full">
      <Input
        label="Tipo de Documento"
        name="documentType"
        type="select"
        options={["DNI", "CARNET DE EXTRANJERÍA"]}
        value={form.documentType}
        setForm={setForm}
        errorOnclick={error.documentType}
      />
      <Input
        label="Número de Documento"
        name="documentNumber"
        inputMode="numeric"
        maxLength={8}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.documentNumber}
        setForm={setForm}
        errorOnclick={error.documentNumber}
      />
      <Input
        label="Nombres"
        name="name"
        value={form.name}
        setForm={setForm}
        errorOnclick={error.name}
      />
      <Input
        label="Apellidos"
        name="lastname"
        value={form.lastname}
        setForm={setForm}
        errorOnclick={error.lastname}
      />
      <Input
        label="Género"
        name="genre"
        type="select"
        options={["MASCULINO", "FEMENINO"]}
        value={form.genre}
        setForm={setForm}
        errorOnclick={error.genre}
      />
      <InputDate
        label="Fecha de Cumpleaños"
        name="dateOfBirth"
        setForm={setForm}
        value={form.dateOfBirth}
        errorOnclick={error.dateOfBirth}
      />
      <Input
        label="Estado Civil"
        name="civilStatus"
        type="select"
        options={["SOLTERO", "CASADO", "DIVORCIADO", "VIUDO"]}
        value={form.civilStatus}
        setForm={setForm}
        errorOnclick={error.civilStatus}
      />
      <Input
        label="Correo"
        name="email"
        value={form.email}
        setForm={setForm}
        errorOnclick={error.email}
      />
      <InputNormal
        label="Celular"
        name="phone"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.phone}
        setForm={setForm}
      />
      <InputNormal
        label="Telefono"
        name="telephone"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.telephone}
        setForm={setForm}
      />
      <Input
        label="Empresa"
        name="business"
        type="select"
        options={business.map((item) => item.razonSocial)}
        value={form.business}
        setForm={setForm}
        errorOnclick={error.business}
      />
      <Input
        label="Sede"
        name="sede"
        type="select"
        options={[
          "SAN ISIDRO",
          "CHINCHA",
          "LURIN",
          "MOQUEGUA",
          "TRUJILLO",
          "LA VICTORIA",
        ]}
        value={form.sede}
        setForm={setForm}
        errorOnclick={error.sede}
      />
      <Input
        label="Cargo"
        name="charge"
        value={form.charge}
        setForm={setForm}
        errorOnclick={error.charge}
      />
      <Input
        label="Sueldo"
        name="sueldo"
        onKeyPress={(e) => {
          if (!/[0-9/.]/.test(e.key)) e.preventDefault();
        }}
        value={form.sueldo}
        setForm={setForm}
        errorOnclick={error.sueldo}
      />
      <Input
        label="Usuario"
        name="user"
        value={form.user}
        setForm={setForm}
        errorOnclick={error.user}
      />
      <InpuFiles
        label="Foto"
        name="photo"
        setForm={setForm}
        errorOnclick={error.photo}
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        setForm={setForm}
        errorOnclick={error.password}
      />
      <Input
        label="Tipo de Colaborador"
        name="type"
        type="select"
        value={form.type}
        options={["VISITANTE", "COLABORADOR", "GERENTE"]}
        setForm={setForm}
        errorOnclick={error.type}
      />
    </form>
  );
};

export default FormOne;
