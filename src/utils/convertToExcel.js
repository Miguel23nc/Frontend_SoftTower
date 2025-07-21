import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const modificarPlantillaExcel = async (
  datos,
  columnasMapeo,
  archivo,
  nameDoc,
  variablesIndividuales = {},
  inicio = 2
) => {
  try {
    if (!archivo) {
      throw new Error("Archivo de plantilla no disponible");
    }

    // Descargar el archivo de plantilla de Excel
    const response = await axios.get(archivo, { responseType: "arraybuffer" });

    let content = response.data;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(content);

    const worksheet = workbook.getWorksheet(1); // Seleccionamos la primera hoja

    // Array de datos (esto puede venir de la variable que pases)

    // Buscar la fila inicial para insertar datos
    let filaInicial = inicio; // La fila 1 tiene los encabezados
    Object.entries(variablesIndividuales).forEach(([celda, valor]) => {
      const cell = worksheet.getCell(celda);
      cell.value = valor;
    });
    // Insertar datos dinámicamente
    datos.forEach((dato, index) => {
      const fila = worksheet.getRow(filaInicial + index); // Creamos o conseguimos la fila

      Object.entries(columnasMapeo).forEach(([columna, keyOrFunc]) => {
        fila.getCell(Number(columna)).value =
          typeof keyOrFunc === "function"
            ? keyOrFunc(dato, index)
            : dato[keyOrFunc];
      });

      // Aplicar estilos de la fila anterior (si necesitas que se copien los estilos)
      fila.eachCell((cell, colNumber) => {
        const style = worksheet.getRow(filaInicial).getCell(colNumber).style; // Obtenemos el estilo de la primera fila (encabezado)
        cell.style = style; // Asignamos el estilo
      });

      fila.commit(); // Guardamos la fila con los datos y estilos
    });

    // Descargar el archivo modificado
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${nameDoc}.xlsx`);
    const retornar = !blob ? false : true;
    return retornar;
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    throw error;
  }
};

export default modificarPlantillaExcel;
