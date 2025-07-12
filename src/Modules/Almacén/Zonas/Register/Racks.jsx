import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";

const RacksPorZona = ({ set, error, initialData, resetForm }) => {
  const [formRacks, setFormRacks] = useState({
    nombre: "",
    niveles: "",
    seccionesPorNivel: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormRacks((prevData) => ({
        ...prevData,
        nombre: initialData.nombre || "",
        niveles: initialData.niveles || "",
        seccionesPorNivel: initialData.seccionesPorNivel || "",
      }));
    }
  }, [initialData]);
  useEffect(() => {
    setFormRacks({
      nombre: "",
      niveles: "",
      seccionesPorNivel: "",
    });
  }, [resetForm]); // <- aquí se ejecuta cada vez que cambia el key

  useEffect(() => {
    if (!formRacks.nombre || !formRacks.niveles || !formRacks.seccionesPorNivel)
      return;
    else {
      set({
        nombre: formRacks.nombre,
        niveles: formRacks.niveles,
        seccionesPorNivel: formRacks.seccionesPorNivel,
      });
    }
  }, [formRacks.niveles, formRacks.nombre, formRacks.seccionesPorNivel]);
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        label="Nombre"
        name="nombre"
        value={formRacks.nombre}
        setForm={setFormRacks}
        // errorOnclick={error.nombre}
      />
      <Input
        label="Niveles"
        name="niveles"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={formRacks.niveles}
        setForm={setFormRacks}
        // errorOnclick={error.niveles}
      />
      <Input
        label="Secciones por Nivel"
        name="seccionesPorNivel"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={formRacks.seccionesPorNivel}
        setForm={setFormRacks}
        // errorOnclick={error.seccionesPorNivel}
      />
    </div>
  );
};

export default RacksPorZona;
