import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllZonasAlmacen } from "../../../../redux/modules/Almacen/actions";
import DeleteZonaAlmacen from "../Permissions/Delete";

const ListZonas = ({ permissionRead, permissionEdit, permissionDelete }) => {
  const dispatch = useDispatch();
  const allZonas = useSelector((state) => state.almacen.allZonas);
  const recargar = () => {
    dispatch(getAllZonasAlmacen());
  };
  useEffect(() => {
    if (allZonas.length === 0) {
      recargar();
    }
  }, [allZonas.length, dispatch]);
  return (
    <ListPrincipal
      permissionRead={permissionRead}
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      DeleteItem={DeleteZonaAlmacen}
      content={allZonas}
      reload={recargar}
    >
      <Column
        field="nombre"
        header="Nombre"
        sortable
        style={{ paddingLeft: "60px" }}
      />
      <Column field="almacenId.nombre" header="Almacén" sortable />
      <Column field="orientacion" header="Orientación" sortable />
      <Column field="racks.length" header="Cantidad de Racks" sortable />
    </ListPrincipal>
  );
};

export default ListZonas;
