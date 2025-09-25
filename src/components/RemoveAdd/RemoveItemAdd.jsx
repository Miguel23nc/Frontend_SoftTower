import { useEffect, useState } from "react";
import ButtonOk from "../../recicle/Buttons/Buttons";

const Directorio = (props) => {
  const { ItemComponent, setForm, directory, estilos, error, data } = props;
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
      form.id === id
        ? { ...form, initialData: { ...form.initialData, ...newData } }
        : form
    );
    setFormData(updatedForms);
    setForm((prevEdition) => ({
      ...prevEdition,
      [data]: updatedForms.map((form) => form.initialData),
    }));
  };

  useEffect(() => {
    setForm((prevEdition) => ({
      ...prevEdition,
      [data]: formData.map((form) => form.initialData),
    }));
  }, [formData, setForm]);

  return (
    <div className="w-full">
      {formData.map((form) => (
        <div
          key={form.id}
          className={` ${estilos} border mt-2 border-slate-300 rounded`}
        >
          <ItemComponent
            initialData={form.initialData}
            set={(newData) => handleUpdateFormData(form.id, newData)}
            error={error}
            {...props}
          />
          <ButtonOk
            classe="w-full"
            styles="my-7 px-6  mx-4"
            onClick={() => handleRemoveForm(form.id)}
            children="X"
          />
        </div>
      ))}
      <ButtonOk
        type="ok"
        children="+"
        classe="w-[95%]"
        styles="mt-8 !ml-10 px-8 mb-3 "
        onClick={handleAddForm}
      />
    </div>
  );
};

export default Directorio;
