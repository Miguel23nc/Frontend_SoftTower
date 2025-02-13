import Details from "../../../../components/Principal/Permissions/View";
import PDetail from "../../../../recicle/PDtail";

const View = ({ setShowDetail, selected }) => {
  console.log("selected", selected);

  return (
    <Details setShowDetail={setShowDetail}>
      <h3 className="text-2xl font-bold ">Empresa</h3>
      <div className="border p-2 rounded-lg m-2">
        <PDetail content="Razón Social: " value={selected.razonSocial} />
        <PDetail content="RUC: " value={selected.ruc} />
        <PDetail content="Dirección: " value={selected.address} />
      </div>
      <h3 className="text-2xl font-bold ">Logo</h3>
      <div className="border p-2 rounded-lg m-2">
        <img src={selected.logo} height={500} width={500} />
      </div>
      <h3 className="text-2xl font-bold ">Representante</h3>
      <div className="border p-2 rounded-lg m-2">
        <PDetail
          content="Razón Social: "
          value={selected.representative.name}
        />
        <PDetail
          content="Dirección: "
          value={selected.representative.documentType}
        />
        <PDetail
          content="Dirección: "
          value={selected.representative.documentNumber}
        />
      </div>
      <div className="border p-2 rounded-lg m-2">
        <img
          src={selected.representative?.signature}
          height={500}
          width={500}
        />
      </div>
    </Details>
  );
};

export default View;
