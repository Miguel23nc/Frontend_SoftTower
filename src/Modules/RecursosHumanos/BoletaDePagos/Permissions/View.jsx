import { useEffect, useState, useMemo } from "react";
import renderDoc from "../Enviar/renderDoc";
import { getBusiness, getDatosContables } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Details from "../../../../components/Principal/Permissions/View";
import useSendMessage from "../../../../recicle/senMessage";
import documentoCloudinary from "../../../../api/cloudinaryDocument";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import axios from "../../../../api/axios";

const ViewBoletaDePago = ({ setShowDetail, selected }) => {
  const [showDoc, setShowDoc] = useState(false);
  const [docxContent, setDocxContent] = useState("");

  const dispatch = useDispatch();
  const sendMessage = useSendMessage();

  const business = useSelector((state) => state.business || []);
  const datosContables = useSelector((state) => state.datosContables || []);
  const fechaActual = new Date();

  const convertirDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    return date;
  };

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
  console.log("selected", selected);
  useEffect(() => {
    const renderDocx = async () => {
      try {
        if (!selected || !findBusiness) return;
        const response = await axios.get(
          `/contract/${selected.colaborador._id}`
        );
        const contratosColaborador = response.data;
        console.log("contratosColaborador", contratosColaborador);
        if (!contratosColaborador)
          return sendMessage("No se encontraron contratos", "Error");
        const findContrato = contratosColaborador?.find(
          (contrato) => fechaActual > convertirDate(contrato.dateEnd)
        );
        console.log("findContrato", findContrato);

        const file = await renderDoc(
          {
            ...selected,
            codigoSpp: findContrato?.codigoSpp,
            regimenPencion: findContrato?.regimenPencion,
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
        setDocxContent(pathCloudinary.secure_url);
        setShowDoc(true);
        await axios.delete("/deleteDocument", {
          data: { public_id: pathCloudinary.public_id },
        });
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
