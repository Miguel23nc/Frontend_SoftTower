import ListPrincipal from "../../../../components/Principal/List/List";
import { Column } from "primereact/column";
import { Button } from "@mui/material";

const ListEnvio = ({ fetchData, enviarCorreo }) => {
  return (
    <ListPrincipal fetchData={fetchData} reload={fetchData}>
      <Column
        field="correlativa"
        header="Correlativa"
        style={{
          paddingLeft: "40px",
        }}
      />
      <Column field="colaborador.lastname" header="Apellidos del Colaborador" />
      <Column field="colaborador.name" header="Nombres del Colaborador" />
      <Column field="colaborador.business" header="Empresa" />
      <Column field="colaborador.email" header="Correo Electrónico" />

      <Column
        body={(rowData) => (
          <Button variant="contained" onClick={() => enviarCorreo([rowData])}>
            {rowData.envio ? "Reenviar" : "Enviar"}
          </Button>
        )}
        exportable={false}
      />
    </ListPrincipal>
  );
};

export default ListEnvio;
