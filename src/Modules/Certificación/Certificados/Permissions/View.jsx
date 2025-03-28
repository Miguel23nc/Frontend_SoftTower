import { useDispatch } from "react-redux";
import axios from "../../../../api/axios";
import Details from "../../../../components/Principal/Permissions/View";
import { useEffect, useState } from "react";
import convertDocx from "../../../../utils/convertDocx";
import useSendMessage from "../../../../recicle/senMessage";
import documentoCloudinary from "../../../../api/cloudinaryDocument";
import QRCode from "qrcode";
import imageCloudinary from "../../../../api/cloudinaryImage";
import ButtonOk from "../../../../recicle/Buttons/Buttons";

const DetailCertificado = ({ setShowDetail, selected }) => {
  const [showDoc, setShowDoc] = useState(false);
  const [docxContent, setDocxContent] = useState("");
  const dispatch = useDispatch();
  const sendMessage = useSendMessage();
  useEffect(() => {
    const renderDocx = async () => {
      try {
        if (!selected) {
          sendMessage("Faltan Datos", "Error");
          return;
        }
        const qrDataUrl = await QRCode.toDataURL(selected.archivo);
        const res = await fetch(qrDataUrl);
        const blob = await res.blob();
        if (!blob) {
          sendMessage("Error al cargar la imagen", "Error");
          return;
        }
        const response = await imageCloudinary(blob);
        if (!response.url) {
          sendMessage("Error al cargar la imagen", "Error");
          return;
        }
        const pathQr = response.url;
        const predata = {
          imagen: pathQr,
        };
        const file = await convertDocx(
          predata,
          selected.archivo,
          selected.name + selected.fecha
        );
        console.log("file", file);
        if (!file) {
          console.log("Error al cargar el archivo");
          sendMessage("Error al cargar el archivo", "Error");
          return;
        }
        const pathCloudinary = await documentoCloudinary(file);
        setDocxContent(pathCloudinary.url);
        setShowDoc(true);
        await axios.delete("/deleteDocument", {
          data: { public_id: pathCloudinary.public_id },
        });
        console.log("showDoc", showDoc);
      } catch (error) {
        console.error(error);
        sendMessage(error, "Error");
      }
    };
    console.log("showDoc", showDoc);

    renderDocx();
  }, [selected]);

  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
    docxContent
  )}`;
  return (
    <Details setShowDetail={setShowDetail}>
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

export default DetailCertificado;
