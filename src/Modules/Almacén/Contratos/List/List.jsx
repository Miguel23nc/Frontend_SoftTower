import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllContratosAlmacen } from "../../../../redux/modules/Almacen/actions";

const ListContratosAlmacen = ({
  permissionRead,
  permissionEdit,
  permissionDelete,
}) => {
  const contratos = useSelector((state) => state.almacen.allContratos);
  const dispatch = useDispatch();
  const recargar = () => {
    dispatch(getAllContratosAlmacen());
  };
  useEffect(() => {
    if (contratos.length === 0) {
      recargar();
    }
  }, [contratos, dispatch]);
  return (
    <ListPrincipal
      permissionRead={permissionRead}
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      content={contratos || []}
      reload={recargar}
    >
      <Column field="_id" header="ID" style={{ paddingLeft: "60px" }} />
      <Column field="cliente" header="Cliente" />
      <Column field="fechaInicio" header="Fecha Inicio" />
      <Column field="fechaFin" header="Fecha Fin" />
      <Column field="sedeId.nombre" header="Sede" />
      <Column field="estado" header="Estado" />
    </ListPrincipal>
  );
};

export default ListContratosAlmacen;
