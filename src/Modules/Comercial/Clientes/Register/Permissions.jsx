import { useEffect, useState } from "react";
import FormMultiple from "./FormMultiple";
import RemoveItemAdd from "../../../../components/RemoveAdd/RemoveItemAdd";
const Permissions = ({ setForm2, resetForm }) => {
  const [formDataList, setFormDataList] = useState([]);
const [form , setForm] = useState()
  useEffect(() => {
    if (formDataList.length > 0) {
      setForm2(formDataList);
    }
  }, [formDataList, setForm2]);
  useEffect(() => {
    if (resetForm) {
      setFormDataList([]);
    }
  }, [resetForm]);

  return (
    <div className=" flex flex-col px-12 pt-4 pb-10 content-center items-start">
      <RemoveItemAdd
        ItemComponent={FormMultiple}
        setForm={setForm}
        itemProps={{ resetForm }}
        estilos="w-full"
      />
    </div>
  );
};

export default Permissions;
