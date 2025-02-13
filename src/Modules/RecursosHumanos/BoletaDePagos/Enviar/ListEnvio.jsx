import ListPrincipal from "../../../../components/Principal/List/List";
import { Column } from "primereact/column";
import { Button } from "@mui/material";

const ListEnvio = ({ boletasFiltrado, enviarCorreo }) => {
  return (
    <ListPrincipal
      content={boletasFiltrado}
      sortField="correlativa"
      sortOrder={-1}
    >
      <Column field="correlativa" header="Correlativa" sortable />
      <Column
        field="colaborador.lastname"
        header="Apellidos del Colaborador"
        sortable
      />
      <Column
        field="colaborador.name"
        header="Nombres del Colaborador"
        sortable
      />
      <Column field="colaborador.business" header="Empresa" sortable />
      <Column field="colaborador.email" header="Correo Electrónico" sortable />

      <Column
        body={(rowData) => (
          <Button
            variant="contained"
            onClick={() => enviarCorreo([rowData])}
          >
            {rowData.envio ? "Reenviar" : "Enviar"}
          </Button>
        )}
        exportable={false}
      />
    </ListPrincipal>
  );
};

export default ListEnvio;
