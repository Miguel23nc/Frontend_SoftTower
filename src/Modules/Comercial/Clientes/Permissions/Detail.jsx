import React from "react";
import moment from "moment";
import useref from "../../../../recicle/useRef";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PDetail from "../../../../recicle/PDtail";
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
        <div className="w-[90%] h-[97%]">
          <div className="p-10 m-5 h-full overflow-y-auto bg-slate-100 rounded-lg shadow-black shadow-sm">
            <h3 className="text-2xl font-bold ">Cliente</h3>
            <div className="border p-2 rounded-lg m-2">
              <PDetail content="Razón Social: " value={client.razonSocial} />
              <PDetail content="RUC: " value={client.ruc} />
              <PDetail content="Dirección: " value={client.direction} />
              <PDetail content="Email: " value={client.email} />
              <PDetail
                content="Teléfono: "
                value={client.phoneCode + " " + client.phoneNumber}
              />
              <PDetail
                content="Sector Economico: "
                value={client.economicSector}
              />
              <PDetail content="Condición de Pago: " value={client.condition} />
              <PDetail
                content="Fecha de Registro: "
                value={moment(client.createdAt).format("DD/MM/YYYY HH:mm")}
              />
            </div>

            <h3 className="text-2xl font-bold mt-3">Directorio</h3>
            {client.directory.map((direc, index) => (
              <div key={index} className="border p-2 rounded-lg m-2 ">
                <PDetail content="Nombre: " value={direc.name} />
                <PDetail content="Cargo: " value={direc.charge} />
                <PDetail content="Email: " value={direc.emailDirectory} />
                <PDetail
                  content="Teléfono: "
                  value={
                    direc.phoneCodeDirectory + " " + direc.phoneNumberDirectory
                  }
                />
              </div>
            ))}
          </div>
        </div>


      </div>

      <div className="flex justify-end p-3">
        <ButtonOk onClick={handleCloseDetail} children="Cerrar" />
      </div>
    </div>
  );
};

export default Details;
