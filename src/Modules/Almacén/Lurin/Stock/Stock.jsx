import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import axios from "../../../../api/axios";
import DeleteStock from "../Permissions/DeleteStock";

const StockAlmacenLurin = ({
  permissionRead,
  permissionEdit,
  permissionDelete,
}) => {
  const fetchStock = async (page, limit, search) => {
    try {
      const response = await axios.get("/getStockAlmacen", {
        params: { page, limit, search },
      });

      return {
        data: response.data?.data,
        total: response.data?.total,
      };
    } catch (error) {
      sendMessage(error.message || "Error traer el stock del almacén", "Error");
    }
  };
  return (
    <ListPrincipal
      permissionRead={permissionRead}
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      DeleteItem={DeleteStock}
      fetchData={fetchStock}
      reload={fetchStock}
    >
      <Column
        field="movimientoId.codigoIngreso"
        header="Movimiento de creación"
        style={{ paddingLeft: "7vh", maxWidth: "20vh" }}
      ></Column>
      <Column field="productoId.descripcion" header="Producto"></Column>
      <Column field="productoId.unidadDeMedida" header="Unidad"></Column>
      <Column field="cantidadTotal" header="Cantidad Total"></Column>
      <Column field="contratoId.cliente" header="Contrato"></Column>
      <Column
        field="movimientoId.numeroDeActa"
        header="Numero de Acta"
      ></Column>
    </ListPrincipal>
  );
};

export default StockAlmacenLurin;
