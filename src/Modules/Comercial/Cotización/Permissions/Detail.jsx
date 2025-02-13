import React from "react";
import moment from "moment";
import useref from "../../../../recicle/useRef";
import PDetail from "../../../../recicle/PDtail";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
const Details = (props) => {
  const { setShowDetail, buttonok, client } = props;
  const detailsRef = useref(setShowDetail);
  console.log(client);
  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div
      ref={detailsRef}
      className={`w-[70%] h-[80%] bg-white flex flex-col justify-center
         border-stone-500 border shadow-lg fixed top-20 z-50 rounded-xl`}
    >
      <div className="flex justify-center h-[80%]">
        <div className="w-[80%] h-[98%]">
          <div className="p-10 m-5 h-full overflow-y-auto bg-slate-100 rounded-lg shadow-black shadow-sm">
            <h3 className="text-2xl font-bold ">Datos de Documento</h3>
            <div className="border p-2 rounded-lg m-2">
              <PDetail content="Cliente: " value={client.cliente} />
              <PDetail content="RUC: " value={client.ruc} />
              <PDetail content="Dirección: " value={client.direction} />
              <PDetail content="Condición de Pago: " value={client.condition} />
              <PDetail content="Email: " value={client.emailDirectory} />
              <PDetail
                content="Fecha de Operación: "
                value={client.fechaOperacion}
              />
              <PDetail content="Oferta Válida: " value={client.oferta} />
              <PDetail
                content="Fecha de Vencimiento: "
                value={moment(client.fechaVencimiento).format("DD/MM/YYYY")}
              />
            </div>
            <h3 className="text-2xl font-bold ">Datos de Contacto</h3>
            <div className="border p-2 rounded-lg m-2">
              <PDetail content="Contacto: " value={client.contactDirectory} />
              <PDetail content="Cargo: " value={client.chargeDirectory} />
              <PDetail
                content="Teléfono: "
                value={
                  client.phoneCodeDirectory + " " + client.phoneNumberDirectory
                }
              />
              <PDetail content="Email: " value={client.emailDirectory} />
            </div>
            <h3 className="text-2xl font-bold mt-3">Registros</h3>
            {client.registros.map((direc, index) => (
              <div key={index} className="border p-2 rounded-lg m-2 ">
                <PDetail content="Servicio: " value={direc.service} />
                <PDetail
                  content="Tipo de Servicio: "
                  value={direc.typeService}
                />
                <PDetail content="Tipo de Residuo: " value={direc.typeWaste} />
                <PDetail content="Unidad de Medida: " value={direc.measure} />
                <PDetail content="Cantidad: " value={direc.quantity} />
                <PDetail
                  content="Precio sin IGV: "
                  value={direc.priceWithoutIGV}
                />
                <PDetail
                  content="Precio con IGV: "
                  value={direc.priceWithIGV}
                />
                <PDetail content="Subtotal: " value={direc.subTotal} />
              </div>
            ))}
            <h3 className="text-2xl font-bold ">Montos Finales</h3>
            <div className="border p-2 rounded-lg m-2">
              <PDetail content="SubTotal: " value={client.subTota} />
              <PDetail content="IGV: " value={client.igv} />
              <PDetail content="Total: " value={client.total} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-3">
        {buttonok}
        <ButtonOk onClick={handleCloseDetail} children="Cerrar" />
      </div>
    </div>
  );
};

export default Details;
