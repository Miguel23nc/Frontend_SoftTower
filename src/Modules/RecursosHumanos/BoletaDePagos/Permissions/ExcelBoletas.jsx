import * as XLSX from "xlsx";
import axios from "../../../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import useSendMessage from "../../../../recicle/senMessage";

const ExcelBoletas = () => {
  const [file, setFile] = useState(null);
  const colaboradores = useSelector(
    (state) => state.recursosHumanos.allEmployees
  );
  const sendMessage = useSendMessage();

  const handleUpload = async () => {
    if (!file || !file.archivo) {
      sendMessage("Debe seleccionar un archivo", "Error");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Hojas
        const sheetBoletas = XLSX.utils.sheet_to_json(
          workbook.Sheets["BOLETA DE PAGO"]
        );
        const sheetRem = XLSX.utils.sheet_to_json(
          workbook.Sheets["REMUNERACIONES"]
        );
        const sheetDesc = XLSX.utils.sheet_to_json(
          workbook.Sheets["DESCUENTOS AL TRABJADOR"]
        );
        const sheetApo = XLSX.utils.sheet_to_json(
          workbook.Sheets["APORTACIONES DEL EMPLEADOR"]
        );

        // 🔹 Función para agrupar por documento
        const agrupar = (rows, keyCodigo = "CodigoPlame") => {
          const map = {};
          rows.forEach((row) => {
            const doc = row["N° documento"].toString();
            if (!map[doc]) map[doc] = [];
            map[doc].push({
              datosContables: row[keyCodigo].toString(),
              monto: row["Monto"].toString(),
            });
          });
          return map;
        };

        const remuneracionesMap = agrupar(sheetRem);
        const descuentosMap = agrupar(sheetDesc);
        const aportacionesMap = agrupar(sheetApo);

        // 🔹 Construcción de objetos finales
        const mappedData = sheetBoletas
          .map((row) => {
            const documento = row["N° documento"].toString();
            const colaborador = colaboradores.find(
              (c) => c.documentNumber === documento
            );

            if (!colaborador) return null;

            return {
              colaborador: colaborador._id,
              diasTrabajados: row["Dias Trabajados"].toString(),
              fechaBoletaDePago: row["Fecha de Boleta"].toString(),
              diasSubsidiados: "0",
              horasTrabajadas: "192",
              diasNoLaborales: "0",
              remuneraciones: remuneracionesMap[documento] || [],
              descuentosAlTrabajador: descuentosMap[documento] || [],
              aportacionesDelEmpleador: aportacionesMap[documento] || [],
            };
          })
          .filter(Boolean);

        console.log("✅ Payload final:", mappedData);

        // 🔹 Enviar al backend (uno por uno)
        for (let boleta of mappedData) {
          try {
            await axios.post("/postBoletaDePagos", boleta);
            console.log("Boleta registrada:", boleta.colaborador);
          } catch (error) {
            console.error("❌ Error al registrar boleta:", boleta, error);
          }
        }

        sendMessage(`Se procesaron ${mappedData.length} boletas`, "Info");
      };

      reader.readAsArrayBuffer(file.archivo);
    } catch (error) {
      console.error("Error al procesar Excel:", error);
      sendMessage("Error al procesar archivo", "Error");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile({ archivo: e.target.files[0] })}
      />
      <button onClick={handleUpload}>Subir Excel</button>
    </div>
  );
};

export default ExcelBoletas;
