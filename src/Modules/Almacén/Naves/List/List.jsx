import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNavesAlmacen,
  getAllSedesAlmacen,
} from "../../../../redux/modules/Almacen/actions";
import { useEffect } from "react";
import DeleteNaveAlmacen from "../Permissions/DeleteNave";

const ListNaves = ({ permissionRead, permissionEdit, permissionDelete }) => {
  const dispatch = useDispatch();
  const allNaves = useSelector((state) => state.almacen.allNaves);
  const recargar = () => {
    dispatch(getAllNavesAlmacen());
  };
  useEffect(() => {
    if (allNaves.length === 0) {
      recargar();
    }
  }, [allNaves, dispatch]);
  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      permissionRead={permissionRead}
      DeleteItem={DeleteNaveAlmacen}
      content={allNaves}
      reload={recargar}
    >
      <Column
        field="nombre"
        header="Nombre Nave"
        sortable
        style={{ paddingLeft: "5%" }}
      />
      <Column field="sedeId.nombre" header="Sede" sortable />
    </ListPrincipal>
  );
};

export default ListNaves;
