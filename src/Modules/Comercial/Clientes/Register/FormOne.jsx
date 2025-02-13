import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { consultarRuc } from "./Axios";
import { validateClient1 } from "../../../../recicle/validate";
import Input from "../../../../recicle/Inputs/Inputs";

const FormOne = ({ setForm1, resetForm }) => {
  const errors = useSelector((state) => state.error);
  const [formData, setFormData] = useState({
    ruc: "",
    razonSocial: "",
    direction: "",
    phoneCode: "+51",
    phoneNumber: "",
    email: "",
    password: "",
    economicSector: "",
    condition: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resetForm) {
      setFormData({
        ruc: "",
        razonSocial: "",
        direction: "",
        phoneCode: "+51",
        phoneNumber: "",
        email: "",
        password: "",
        economicSector: "",
        condition: "",
      });
    }
  }, [resetForm]);

  const dispatch = useDispatch();
  const form1 = validateClient1(formData);
  useEffect(() => {
    if (Object.keys(form1).length === 0) {
      setForm1(formData);
    }
  }, [formData]);

  useEffect(() => {
    const fetchRazonSocial = async () => {
      if (formData.ruc.length === 11) {
        setLoading(true);
        try {
          const razonSocial = await consultarRuc(formData.ruc, dispatch);
          setFormData((prevData) => ({
            ...prevData,
            razonSocial: razonSocial || "No se encontró razón social",
          }));
        } catch (error) {
          console.error("Error fetching Razon Social:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRazonSocial();
  }, [formData.ruc, dispatch]);
  const handleChangeCode = (e) => {
    setFormData((prevData) => {
      return { ...prevData, phoneCode: e };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-wrap py-8 p-12 items-center w-full">
      <Input
        label="RUC"
        inputMode="numeric"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        name="ruc"
        value={formData.ruc}
        onChange={handleChange}
        error={form1?.ruc}
      />
      {loading ? (
        <p>Cargando Razón Social...</p>
      ) : (
        <Input
          label="Razón Social"
          type="text"
          name="razonSocial"
          width="w-96 ml-8"
          value={formData.razonSocial}
          readOnly
        />
      )}
      <Input
        label="Dirección"
        type="direction"
        name="direction"
        value={formData.direction}
        onChange={handleChange}
        error={form1?.direction}
      />
      <div className="flex ml-8 ">
        <Input
          label="Pais"
          type="phoneCode"
          name="phoneCode"
          width="w-32 pt-3 py-2"
          value={formData.phoneCode}
          onChange={handleChangeCode}
        />
        <Input
          label="Telefono"
          type="text"
          width="mx-2"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={form1?.phoneNumber}
        />
      </div>
      <Input
        label="Dirección de correo electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={form1?.email}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        width="w-40 ml-8"
        value={formData.password}
        onChange={handleChange}
        error={form1?.password}
      />
      <Input
        label="Sector Económico"
        type="economicSector"
        name="economicSector"
        value={formData.economicSector}
        onChange={handleChange}
        error={form1?.economicSector}
      />
      <Input
        label="Condición de Pago"
        type="select"
        options={["Contado", "Crédito"]}
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        error={form1?.condition}
      />
    </form>
  );
};

export default FormOne;
