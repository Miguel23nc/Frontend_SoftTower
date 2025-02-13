import { useEffect, useState } from "react";
import FormMultiple from "./FormMultiple";

const Permissions = ({ setForm2, resetForm, directorio }) => {
  const [formInstances, setFormInstances] = useState([]);
  const [directorySelected, setDirectorySelected] = useState([]);

  // useEffect(() => {
  //   if (formDataList.length > 0) {
  //     setForm2(formDataList);
  //   }
  // }, [formDataList, setForm2]);

  // useEffect(() => {
  //   if (resetForm) {
  //     setFormInstances([{ id: 1 }]);
  //     setFormDataList([]);
  //   }
  // }, [resetForm]);

  return (
    <div className="overflow-y-auto flex py- content-center items-start">
      <div>
          <FormMultiple
            resetForm={resetForm}
            directorio={directorio}
            set={(data) => updateFormData(instance.id, data)}
          />
      </div>
    </div>
  );
};

export default Permissions;
