import { useEffect, useState } from "react";
import Details from "../../../../components/Principal/Permissions/View";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PDetail from "../../../../recicle/PDtail";
import PopUp from "../../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import { getPlantillasContrato, setMessage } from "../../../../redux/actions";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import axios from "axios";
import numbers from "numeros_to_words";

const ViewContract = ({ setShowDetail, selected }) => {
  const { _id, typeContract, dateStart, dateEnd, empresa, state, colaborator } =
    selected;

  const dispatch = useDispatch();
  const [archivo, setArchivo] = useState(null);
  const plantilla = useSelector((state) => state.allPlantillasContrato);
  console.log("plantilla", plantilla);

  useEffect(() => {
    if (plantilla.length === 0) {
      dispatch(getPlantillasContrato());
    }
  }, [dispatch, plantilla]);
  console.log("selected", selected);

  useEffect(() => {
    const response = plantilla?.find(
      (item) => item.tipoContrato === typeContract
    );
    if (response) {
      setArchivo(response.archivo);
    }
  }, [plantilla, typeContract]);

  const redirigir = async () => {
    dispatch(setMessage("...Cargando", "Espere"));
    try {
      if (!archivo) {
        dispatch(setMessage("Archivo de plantilla no disponible", "Ups !"));
        return;
      }

      const predata = {
        empresa_razon_social: empresa.razonSocial,
        empresa_ruc: empresa.ruc,
        empresa_domicilio_fiscal: empresa.domicilioFiscal,
        representante_nombres: empresa.representative,
        representante_tipo_documento: empresa.representativeDocumentType,
        representante_numero_documento: empresa.representativeDocumentNumber,
        colaborador_nombres: colaborator.name,
        colaborador_tipo_documento: colaborator.documentType,
        colaborador_numero_documento: colaborator.documentNumber,
        colaborador_domicilio: colaborator.address,
        colaborador_correo: colaborator.email,
        colaborador_ocupacion: colaborator.charge,
        sueldo: colaborator.sueldo,
        pago_texto: numbers(colaborator.sueldo).toString(),
      };
      const data = {
        ...predata,
        missingKey: "N/A", // Valor predeterminado para campos faltantes.
      };

      console.log("Datos a insertar en la plantilla:", data);

      // Descargar el archivo .docx
      const response = await axios.get(archivo, {
        responseType: "arraybuffer",
      });

      let content = response.data;

      if (!content || !(content instanceof ArrayBuffer)) {
        throw new Error("El archivo descargado está vacío o no es válido");
      }

      content = new Uint8Array(content);

      const zip = new PizZip(content);
      if (!zip.file("word/document.xml")) {
        throw new Error(
          "El archivo no parece ser una plantilla válida de Word."
        );
      }

      // Probar si los marcadores están presentes
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" },
      });

      // Renderizar documento
      doc.render(data);

      const blob = doc.getZip().generate({ type: "blob" });
      saveAs(blob, `${colaborator?.name}_${typeContract}.docx`);
    } catch (error) {
      console.error("Error al descargar el contrato:", error);
      dispatch(
        setMessage(error.message || "Error al descargar el contrato", "Error")
      );
    } finally {
      dispatch(setMessage("", ""));
    }
  };

  return (
    <Details setShowDetail={setShowDetail}>
      <PopUp />
      <div className="flex justify-around pt-3">
        <div className="mx-16">
          <h3 className="text-2xl font-bold ">Datos del Colaborador</h3>
          <PDetail content="Nombre Completo: " value={colaborator.name} />
          <PDetail
            content="Tipo de documento: "
            value={colaborator.documentType}
          />
          <PDetail
            content="Número de documento: "
            value={colaborator.documentNumber}
          />
          <PDetail content="Correo: " value={colaborator.email} />
          <PDetail content="Cargo: " value={colaborator.charge} />
          <PDetail content="Sueldo: " value={colaborator.sueldo} />
          <PDetail content="Dirección: " value={colaborator.address} />

          <h3 className="text-2xl mt-4 font-bold ">Datos de la Empresa</h3>
          <PDetail content="Razón Social: " value={empresa.razonSocial} />
          <PDetail content="RUC: " value={empresa.ruc} />
          <PDetail
            content="Domicilio Fiscal: "
            value={empresa.domicilioFiscal}
          />
          <PDetail content="Representante: " value={empresa.representative} />
          <PDetail
            content="Documento del Representante: "
            value={empresa.representativeDocumentType}
          />
          <PDetail
            content="Número de documento del Representante: "
            value={empresa.representativeDocumentNumber}
          />
        </div>
        <div className="mx-16">
          <h3 className="text-2xl mt-4 font-bold ">Datos del Contrato</h3>
          <PDetail content="Tipo de Contrato: " value={typeContract} />
          <PDetail content="Estado del Contrato: " value={state} />
          <PDetail content="Fecha de Inicio: " value={dateStart} />
          <PDetail content="Fecha de Finalización: " value={dateEnd} />
          <h3 className="mt-4 text-2xl font-bold">Contrato PDF</h3>
          <ButtonOk onClick={redirigir} type="ok">
            Descargar
          </ButtonOk>
        </div>
      </div>
    </Details>
  );
};

export default ViewContract;
