import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubModule } from "../../../../redux/actions";
import DeleteSubmodule from "../Permissions/DeleteSubmodule";

const List = ({ permissionEdit, permissionDelete }) => {
  const subModules = useSelector((state) => state.submodules);
  const dispatch = useDispatch();
  useEffect(() => {
    if (subModules.length === 0) {
      dispatch(getSubModule());
    }
  }, [dispatch, subModules.length]);
  return (
    <ListPrincipal
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      reload={() => dispatch(getSubModule())}
      DeleteItem={DeleteSubmodule}
      content={subModules}
    >
      <Column
        field="module"
        header="Modulo"
        sortable
        style={{ paddingLeft: "60px" }}
      />
      <Column field="name" header="Submodulo" sortable />
    </ListPrincipal>
  );
};

export default List;
