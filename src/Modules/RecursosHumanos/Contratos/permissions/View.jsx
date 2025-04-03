import { useEffect, useMemo, useState } from "react";
import Details from "../../../../components/Principal/Permissions/View";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PDetail from "../../../../recicle/PDtail";
import PopUp from "../../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  getPlantillasContrato,
  setMessage,
} from "../../../../redux/actions";
import axios from "../../../../api/axios";
import renderDoc from "./renderDoc";
import useSendMessage from "../../../../recicle/senMessage";
import documentoCloudinary from "../../../../api/cloudinaryDocument";

const ViewContract = ({ setShowDetail, selected }) => {
  const [showDoc, setShowDoc] = useState(false);
  const dispatch = useDispatch();
  const [docxContent, setDocxContent] = useState("");
  const plantilla = useSelector((state) => state.allPlantillasContrato);
  const empresas = useSelector((state) => state.business);
  const sendMessage = useSendMessage();
  useEffect(() => {
    if (empresas.length === 0) {
      dispatch(getBusiness());
    }
  }, [dispatch, empresas]);

  useEffect(() => {
    if (plantilla.length === 0) {
      dispatch(getPlantillasContrato());
    }
  }, [dispatch, plantilla]);

  const findPlantilla = plantilla.find(
    (plantilla) => plantilla.tipoContrato === selected?.typeContract
  );


  const findBusiness = useMemo(() => {
    if (!selected?.colaborador?.business) return null;
    return empresas.find(
      (empresa) => empresa?.razonSocial === selected?.colaborador?.business
    );
  }, [empresas, selected?.colaborador?.business]);

  useEffect(() => {
    const renderDocx = async () => {
      try {
        if (!selected || !findBusiness || !findPlantilla) return;
        const file = await renderDoc(
          selected,
          findBusiness,
          findPlantilla?.archivo
        );
        if (!file) {
          sendMessage("Error al cargar el archivo", "Error");
          return;
        }
        const pathCloudinary = await documentoCloudinary(file);
        setDocxContent(pathCloudinary.secure_url);
        setShowDoc(true);
        await axios.delete("/deleteDocument", {
          data: { public_id: pathCloudinary.public_id },
        });
      } catch (error) {
        sendMessage(error, "Error");
      }
    };

    renderDocx();
  }, [findBusiness, findPlantilla, selected]);

  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
    docxContent
  )}`;
  return (
    <Details setShowDetail={setShowDetail} title="Contrato">
      {showDoc ? (
        <ButtonOk type="ok">
          <a href={officeViewerUrl} target="_blank" rel="noopener noreferrer">
            Abrir documento de Word en el visor de Office
          </a>
        </ButtonOk>
      ) : (
        <p>Cargando...</p>
      )}
    </Details>
  );
};

export default ViewContract;
