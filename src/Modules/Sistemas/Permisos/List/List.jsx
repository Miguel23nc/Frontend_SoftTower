import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";

const ListPermisos = ({ permissionEdit, permissionRead }) => {
  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      content={[]}
      reload={() => {}}
      EditItem={null}
      DetailItem={null}
    >
      <Column />
    </ListPrincipal>
  );
};

export default ListPermisos;
