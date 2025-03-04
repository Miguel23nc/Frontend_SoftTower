import { useEffect, useState, useMemo } from "react";
import { renderAsync } from "docx-preview";
import renderDoc from "../Enviar/renderDoc";
import { getBusiness, getDatosContables } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Details from "../../../../components/Principal/Permissions/View";
import useSendMessage from "../../../../recicle/senMessage";
import imageCloudinary from "../../../../api/cloudinaryImage";
import documentoCloudinary from "../../../../api/cloudinaryDocument";
import ButtonOk from "../../../../recicle/Buttons/Buttons";

const ViewBoletaDePago = ({ setShowDetail, selected }) => {
  const [showDoc, setShowDoc] = useState(false);
  const [docxContent, setDocxContent] = useState("");

  const dispatch = useDispatch();
  const sendMessage = useSendMessage();

  const business = useSelector((state) => state.business || []);
  const datosContables = useSelector((state) => state.datosContables || []);

  useEffect(() => {
    if (!business.length) dispatch(getBusiness());
    if (!datosContables.length) dispatch(getDatosContables());
  }, [dispatch, business.length, datosContables.length]);

  const findBusiness = useMemo(() => {
    if (!selected?.colaborador?.business) return null;
    return business.find(
      (empresa) => empresa?.razonSocial === selected?.colaborador?.business
    );
  }, [business, selected?.colaborador?.business]);

  useEffect(() => {
    const renderDocx = async () => {
      try {
        if (!selected || !findBusiness) return;
       
        const file = await renderDoc(
          {
            ...selected,
            situacion: "ACTIVO O SUBSIDIADO",
            tipoT: selected.colaborador.type,
          },
          findBusiness,
          datosContables
        );
        console.log("file", file);

        if (!file) {
          console.log("Error al cargar el archivo");

          sendMessage("Error al cargar el archivo", "Error");
          return;
        }

        const pathCloudinary = await documentoCloudinary(file);
        setDocxContent(pathCloudinary); // Guarda el archivo correctamente
        setShowDoc(true);

        console.log("showDoc", showDoc);
      } catch (error) {
        sendMessage("Ocurrió un error al procesar el archivo", "Error");
        console.error(error);
      }
    };
    console.log("showDoc", showDoc);

    renderDocx();
  }, [findBusiness, selected, datosContables]);

  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
    docxContent
  )}`;
  return (
    <Details setShowDetail={setShowDetail} title="Boleta de Pago">
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

export default ViewBoletaDePago;
