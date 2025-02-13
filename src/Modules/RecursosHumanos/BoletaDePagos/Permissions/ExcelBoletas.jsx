import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../redux/actions";
import axios from "../../../../api/axios";

const ExcelBoletas = () => {
  const [file, setFile] = useState(null);
  const [finalice, setFinalice] = useState(false);
  const sendMessage = useSendMessage();
  const dispatch = useDispatch();
  const colaboradores = useSelector((state) => state.employees);
  console.log("colaboradores", colaboradores);

  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [colaboradores, dispatch]);

  const handleUpload = async () => {
    sendMessage("Procesando archivo... no toque nada", "Info");
    setFinalice(true);

    if (!file || !file.archivo) {
      sendMessage("Debe seleccionar un archivo", "Error");
      setFinalice(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        const mappedData = rows.map((row) => ({
          documento: row["N° documento"],
          diasTrabajados: row["Dias Trabajados"],
          fechaBoleta: row["Fecha de Boleta"],
        }));

        let errores = [];

        // 🔄 Enviar de UNA en UNA en orden
        for (let boleta of mappedData) {
          console.log("boleta", boleta);

          const findColaborador = colaboradores.find(
            (colaborador) =>
              colaborador.documentNumber === boleta.documento.toString()
          );
          console.log("findColaborador", findColaborador);

          if (!findColaborador) {
            errores.push(boleta.documento);
            continue;
          }

          const newForm = {
            colaborador: findColaborador._id,
            diasTrabajados: boleta.diasTrabajados,
            fechaBoletaDePago: boleta.fechaBoleta,
            diasSubsidiados: "0",
            horasTrabajadas: "192",
            diasNoLaborales: "0",
            remuneraciones: [
              { datosContables: "0121", monto: "0" },
              { datosContables: "0201", monto: "0" }
            ],
            descuentosAlTrabajador: [
              { datosContables: "0701", monto: "0" },
              { datosContables: "0705", monto: "0" },
              { datosContables: "0601", monto: "0" },
              { datosContables: "0605", monto: "0" },
              { datosContables: "0606", monto: "0" },
              { datosContables: "0608", monto: "0" },
            ],
            aportacionesDelEmpleador: [
              { datosContables: "0803", monto: "0" },
              { datosContables: "0804", monto: "0" },
              { datosContables: "0810", monto: "0" },
              { datosContables: "0814", monto: "0" },
            ],
          };

          try {
            await axios.post("/postBoletaDePagos", newForm);
          } catch (error) {
            console.error("Error al registrar boleta:", boleta, error);
            errores.push(boleta.documento);
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        sendMessage(
          `Se creó con éxito ${mappedData.length - errores.length}. Hubo ${
            errores.length
          } error(es): ${errores.join(", ")}`,
          "Atención"
        );
      };
      reader.readAsArrayBuffer(file.archivo);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      sendMessage("Error al procesar el archivo", "Error");
    } finally {
      setFinalice(false);
    }
  };

  return (
    <div>
      <PopUp disabled={finalice} />
      <CardPlegable title="Subir Archivo Excel para Registrar Boletas de Pago">
        <div className="flex items-end">
          <InpuFiles
            label="Subir archivo"
            type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            name="archivo"
            setForm={setFile}
          />
          <ButtonOk onClick={handleUpload} disabled={finalice} type="ok">
            Subir Archivo
          </ButtonOk>
        </div>
      </CardPlegable>
    </div>
  );
};

export default ExcelBoletas;
