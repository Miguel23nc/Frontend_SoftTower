import { useDispatch } from "react-redux";
import Details from "../../../../components/Principal/Permissions/View";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PDetail from "../../../../recicle/PDtail";
import { setMessage } from "../../../../redux/actions";
import PopUp from "../../../../recicle/popUps";

const ViewPlantillaContrato = ({ setShowDetail, selected }) => {
  const dispatch = useDispatch();
  const descarga = async () => {
    dispatch(setMessage("Descargando archivo...", "Espere"));
    try {
      const response = await fetch(selected.archivo);
      const blob = await response.blob(); // Convertir a blob

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selected.tipoContrato}.docx`; // Nombre personalizado
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      throw new Error("Error al descargar el archivo");
    } finally {
      dispatch(setMessage("", ""));
    }
  };

  return (
    <Details setShowDetail={setShowDetail}>
      <PopUp />
      <div className="flex flex-col h-full  justify-center">
        <PDetail content="Tipo de Contrato: " value={selected.tipoContrato} />
        <PDetail content="Estado: " value={selected.state} />
        <PDetail content="Fecha de Subida: " value={selected.createdAt} />
        <PDetail content="Archivo: " />
        <ButtonOk type="ok" onClick={descarga}>
          Descargar
        </ButtonOk>
      </div>
    </Details>
  );
};

export default ViewPlantillaContrato;
