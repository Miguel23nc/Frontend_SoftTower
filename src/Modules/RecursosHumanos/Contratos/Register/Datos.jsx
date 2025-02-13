import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBusiness } from "../../../../redux/actions";
import Input from "../../../../recicle/Inputs/Inputs";

const DatosBasicos = ({ setForm, error, form }) => {
  const [formBusiness, setFormBusiness] = useState({
    ...form.empresa,
  });

  const business = useSelector((state) => state.business);
  const nameBusiness = business?.map((item) => item.razonSocial);
  const dispatch = useDispatch();
  useEffect(() => {
    if (business.length === 0) {
      dispatch(getBusiness());
    }
  }, [business]);
  const actualBusiness = business?.find(
    (item) => item.razonSocial === formBusiness.razonSocial
  );

  useEffect(() => {
    if (actualBusiness) {
      setFormBusiness({
        ...formBusiness,
        ruc: String(actualBusiness.ruc),
        razonSocial: actualBusiness.razonSocial,
        domicilioFiscal: actualBusiness.address,
        representative: actualBusiness.representative?.name,
        representativeDocumentType: actualBusiness.representative?.documentType,
        representativeDocumentNumber:
          actualBusiness.representative?.documentNumber,
      });
    }
  }, [actualBusiness]);
  useEffect(() => {
    setForm({ ...form, empresa: formBusiness });
  }, [formBusiness]);
  return (
    <div className="flex flex-wrap">
      <Input
        label="Razon social"
        type="select"
        name="razonSocial"
        options={nameBusiness}
        value={formBusiness.razonSocial}
        setForm={setFormBusiness}
        errorOnclick={error.empresa.razonSocial}
      />
      <Input
        label="RUC"
        name="ruc"
        disabled
        value={formBusiness.ruc}
        setForm={setFormBusiness}
        errorOnclick={error.empresa.ruc}
      />
      <Input
        label="Domicilio fiscal"
        name="domicilioFiscal"
        value={formBusiness.domicilioFiscal}
        setForm={setFormBusiness}
        errorOnclick={error.empresa.domicilioFiscal}
      />
      <Input
        label="Representante"
        name="representative"
        value={formBusiness.representative}
        ancho="w-96"
        setForm={setFormBusiness}
        errorOnclick={error.empresa.representative}
      />
      <Input
        label="Tipo de Documento"
        name="representativeDocumentType"
        value={formBusiness.representativeDocumentType}
        setForm={setFormBusiness}
        errorOnclick={error.empresa.representativeDocumentType}
      />
      <Input
        label="Documento del Representante"
        name="representativeDocumentNumber"
        value={formBusiness.representativeDocumentNumber}
        setForm={setFormBusiness}
        errorOnclick={error.empresa.representativeDocumentNumber}
      />
    </div>
  );
};

export default DatosBasicos;
