import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import EditInventario from "../Permissions/Edit";
import useSendMessage from "../../../../recicle/senMessage";
import axios from "../../../../api/axios";

const ListInventario = () => {
  const sendMessage = useSendMessage();
  const fetchData = async (page, limit, search) => {
    try {
      const response = await axios.get("/sistemas/getInventarioPaginacion", {
        params: { page, limit, search },
      });
      return {
        data: response.data?.data,
        total: response.data?.total,
      };
    } catch (error) {
      sendMessage(error.message || "Error ", "Error");
    }
  };

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
      fetchData={fetchData}
      reload={fetchData}
    >
      <Column
        field="codigo"
        style={{ paddingLeft: "60px" }}
        header="Código"
        sortable
      />
      <Column field="categoria" header="Categoría" sortable />
      <Column field="marca" header="Marca" sortable />
      <Column field="modelo" header="Modelo" sortable />
      <Column field="encargado.name" header="Encargado" sortable />
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
