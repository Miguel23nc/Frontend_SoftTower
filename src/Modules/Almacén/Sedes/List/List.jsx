import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSedesAlmacen } from "../../../../redux/modules/Almacen/actions";

const ListSedesAlmacen = ({
  permissionRead,
  permissionDelete,
  permissionEdit,
}) => {
  const allSedes = useSelector((state) => state.almacen.allSedes) || [];

  const dispatch = useDispatch();
  const actualizar = () => {
    dispatch(getAllSedesAlmacen());
  };
  useEffect(() => {
    if (allSedes.length === 0) {
      actualizar();
    }
  }, [allSedes, dispatch]);
  return (
    <ListPrincipal
      permissionRead={permissionRead}
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      content={allSedes}
      reload={actualizar}
    >
      <Column field="_id" header="ID" style={{ paddingLeft: "60px" }} />
      <Column field="nombre" header="Nombre" />
      <Column field="direccion" header="Dirección" />
      <Column field="estado" header="Estado" />
    </ListPrincipal>
  );
};

export default ListSedesAlmacen;
