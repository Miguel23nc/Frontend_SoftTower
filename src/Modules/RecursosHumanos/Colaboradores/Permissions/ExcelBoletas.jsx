import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import { useAuth } from "../../../../context/AuthContext";

const ExcelColaboradores = () => {
  const [file, setFile] = useState(null);
  const { signup } = useAuth();
  const [finalice, setFinalice] = useState(false);
  const sendMessage = useSendMessage();

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
        const mappedData = rows.map((row) => {
          return {
            colaborador: row["APELLIDOS Y NOMBRES"],
            dateStart: row["FECHA DE INGRESO"],
            regimenPension: row["REGIMEN DE PENSION"],
            genre: row["GÉNERO"],
            documentType: row["TIPO DE DOCUMENTO"],
            documentNumber: row["NÚMERO DE DOCUMENTO"]?.toString(),
            dateOfBirth: "01/01/2000",
            civilStatus: "SOLTERO",
            phone: row["NÚMERO PERRSONAL"]?.toString(),
            email: row["CORREO PERSONAL"],
            location: {
              departamento: row["DEPARTAMENTO"],
              provincia: row[" PROVINCIA"],
              distrito: row["DISTRITO"],
              direccion: row["DIRECCIÓN"],
            },
            charge: row["CARGO"],
            sueldo: row["SUELDO"],
            user: row["USUARIO"],
            password: "123456",
            photo: "foto.png",
            business: row["EMPRESA"],
            sede: row["SEDE"],
          };
        });

        let errores = [];

        for (const boleta of mappedData) {
          const newForm = {
            lastname: boleta.colaborador.split(" ").slice(0, 2).join(" "),
            name: boleta.colaborador.split(" ").slice(2).join(" "),
            ...boleta,
          };

          try {
            console.log("Registrando:", newForm);
            await signup(newForm);
          } catch (error) {
            console.error("Error al registrar boleta:", boleta, error);
            errores.push(boleta.documentNumber);
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        console.log("errores", errores);
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
      <CardPlegable title="Subir Archivo Excel para Registrar Colaboradores">
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

export default ExcelColaboradores;
