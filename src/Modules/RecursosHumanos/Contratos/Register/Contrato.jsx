import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";
import { useEffect } from "react";
import { getPlantillasContrato } from "../../../../redux/actions";

const DateOfContract = ({ setFormData, formData, error }) => {
  const plantilla_contrato = useSelector(
    (state) => state.allPlantillasContrato
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (plantilla_contrato.length === 0) {
      dispatch(getPlantillasContrato());
    }
  }, [plantilla_contrato]);
  const tiposDeContratos = plantilla_contrato.map((item) => item.tipoContrato);

  return (
    <div className="flex ">
      <Input
        ancho="w-56"
        setForm={setFormData}
        value={formData.typeContract}
        name="typeContract"
        options={tiposDeContratos}
        label="Tipo del contrato"
        type="select"
        errorOnclick={error.typeContract}
      />
      <InputDate
        setForm={setFormData}
        name="dateStart"
        value={formData.dateStart}
        label="Fecha de inicio"
        errorOnclick={error.dateStart}
      />
      <InputDate
        setForm={setFormData}
        name="dateEnd"
        value={formData.dateEnd}
        label="Fecha de Finalización"
        errorOnclick={error.dateEnd}
      />
    </div>
  );
};

export default DateOfContract;
