import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";

const ListCertificados = () => {
  return (
    <ListPrincipal content={[]}>
      <Column field="nombre" header="Nombre" sortable></Column>
    </ListPrincipal>
  );
};

export default ListCertificados;
