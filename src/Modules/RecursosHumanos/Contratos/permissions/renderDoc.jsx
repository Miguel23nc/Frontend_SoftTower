import convertDocx from "../../../../utils/convertDocx";
import numbers from "numeros_to_words";

const renderDoc = async (selected, empresa, archivo) => {
  const { typeContract, dateStart, colaborador } = selected;
  try {
    const predata = {
      empresa_razon_social: empresa.razonSocial,
      empresa_ruc: empresa.ruc,
      empresa_domicilio_fiscal: empresa.domicilioFiscal,
      representante_nombres: empresa.representative.name,
      representante_tipo_documento: empresa.representative.documentType,
      representante_numero_documento: empresa.representative.documentNumber,
      colaborador_nombres: colaborador.lastname + colaborador.name,
      colaborador_tipo_documento: colaborador.documentType,
      colaborador_numero_documento: colaborador.documentNumber,
      colaborador_domicilio: colaborador.location.direccion,
      colaborador_correo: colaborador.email,
      colaborador_ocupacion: colaborador.charge,
      sueldo: colaborador.sueldo,
      pago_texto: numbers(colaborador.sueldo).toString(),
    };
    console.log("typeContract", typeContract);

    const convertir = await convertDocx(
      predata,
      archivo,
      `${dateStart}-${colaborador.documentNumber}-${typeContract}`
    );
    if (!convertir)
      throw new Error(
        "No se pudo completar el proceso de renderizado de la boleta",
        "Error"
      );
    return convertir;
  } catch (error) {
    console.error("Error al renderizar la boleta:", error);
    throw new Error(error, "Error");
  }
};

export default renderDoc;
