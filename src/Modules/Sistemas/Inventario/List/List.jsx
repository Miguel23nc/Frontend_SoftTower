import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInventarioSistemas } from "../../../../redux/actions";
import EditInventario from "../Permissions/Edit";

const ListInventario = () => {
  const inventario = useSelector((state) => state.sistemas.inventarioSistemas);

  const dispatch = useDispatch();
  useEffect(() => {
    if (inventario.length === 0) {
      dispatch(getInventarioSistemas());
    }
  }, [inventario, dispatch]);
  return (
    <ListPrincipal
      permissionEdit={true}
      permissionDelete={true}
      permissionRead={true}
      permissionApprove={true}
      permissionDisapprove={true}
      ApproveItem={null}
      DisapproveItem={null}
      DeleteItem={null}
      EditItem={EditInventario}
      DetailItem={null}
      content={inventario}
      reload={() => dispatch(getInventarioSistemas())}
      sortField="createdAt"
      sortOrder={-1}
    >
      <Column
        field="codigo"
        style={{ paddingLeft: "60px" }}
        header="Código"
        sortable
      />
      <Column field="name" header="Nombre" sortable />
      <Column field="modelo" header="Modelo" sortable />
      <Column field="cantidad" header="Cantidad" sortable />
      <Column field="fecha" header="Fecha" sortable />
      <Column
        field="state"
        body={(rowData) => {
          const color =
            rowData.state === "ACTIVO" ? " text-green-500 " : " text-red-500 ";

          return (
            <div
              className={`text-center bg-gradient-to-tr from-white to-gray-100 
                shadow-inner rounded-xl font-semibold  px-5 py-1  ${color} `}
            >
              {rowData.state}
            </div>
          );
        }}
        header="Estado"
        sortable
      />
    </ListPrincipal>
  );
};
export default ListInventario;
