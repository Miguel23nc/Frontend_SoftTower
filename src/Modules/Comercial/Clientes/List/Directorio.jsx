import { useEffect, useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import FormMultiple from "../Register/FormMultiple";

const Directorio = ({ directory, setEdition }) => {
  const [formData, setFormData] = useState(
    directory?.map((dir, index) => ({
      id: index + 1,
      initialData: dir,
    })) || [{ id: 1, initialData: {} }]
  );
  const handleAddForm = () => {
    setFormData([...formData, { id: Date.now(), initialData: {} }]);
  };

  const handleRemoveForm = (id) => {
    setFormData(formData.filter((form) => form.id !== id));
  };

  const handleUpdateFormData = (id, newData) => {
    const updatedForms = formData.map((form) =>
      form.id === id ? { ...form, initialData: newData } : form
    );
    setFormData(updatedForms);
    setEdition((prevEdition) => ({
      ...prevEdition,
      directory: updatedForms.map((form) => form.initialData),
    }));
  };
  

  useEffect(() => {
    setEdition((prevEdition) => ({
      ...prevEdition,
      directory: formData.map((form) => form.initialData),
    }));
  }, [formData, setEdition]);

  return (
    <div>
      {formData.map((form) => (
        <div key={form.id} className="border mt-2 border-slate-300 rounded">
          <FormMultiple
            initialData={form.initialData}
            set={(newData) => handleUpdateFormData(form.id, newData)}
          />
          <ButtonOk
            classe="w-full"
            onClick={() => handleRemoveForm(form.id)}
            children="X"
          />
        </div>
      ))}
      <ButtonOk
        type="ok"
        children="+"
        classe="w-full"
        styles="mt-10 px-8 mx-4"
        onClick={handleAddForm}
      />
    </div>
  );
};

export default Directorio;
