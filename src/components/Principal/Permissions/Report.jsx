import { useDispatch, useSelector } from "react-redux";
import ButtonOk from "../../../recicle/Buttons/Buttons";
import CardPlegable from "../../../recicle/Divs/CardPlegable";
import Input from "../../../recicle/Inputs/Inputs";
import PopUp from "../../../recicle/popUps";
import { useEffect } from "react";
import { getBusiness } from "../../../redux/actions";

const Report = ({ descargar, form, setForm }) => {
  const dispatch = useDispatch();
  const allBusiness = useSelector((state) => state.business);

  useEffect(() => {
    if (allBusiness.length === 0) dispatch(getBusiness());
  }, [allBusiness]);
  const businessName = allBusiness.map((item) => item.razonSocial);

  return (
    <div>
      <PopUp />
      <CardPlegable title="Reporte de Boletas de Pago (Excel)">
        <div className="flex flex-wrap">
          <Input
            label="Empresa"
            name="empresa"
            type="select"
            options={businessName}
            value={form.empresa}
            setForm={setForm}
          />
          <Input
            label="Desde"
            name="desde"
            type="month"
            value={form.desde}
            setForm={setForm}
          />
          <Input
            label="Hasta"
            name="hasta"
            type="month"
            month="true"
            value={form.hasta}
            setForm={setForm}
          />
          <ButtonOk
            classe="mt-4"
            children="Generar Reporte"
            type="ok"
            onClick={descargar}
          />
        </div>
      </CardPlegable>
    </div>
  );
};
export default Report;
