import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";

const ListAsignaciones = ({
  permissionRead,
  permissionEdit,
  permissionApprove,
  permissionDisapprove,
}) => {
  return (
    <ListPrincipal
      permissionApprove={permissionApprove}
      permissionDisapprove={permissionDisapprove}
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      content={[]}
    >
      <Column field="name" header="Nombre" sortable />
    </ListPrincipal>
  );
};

export default ListAsignaciones;
