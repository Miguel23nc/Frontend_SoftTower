import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
const contenido = [
  {
    producto: "Arroz",
    cantidad: "100",
    unidad: "Kg",
    ubicacion: "Estante 1",
    sku: "ARZ-001",
  },
  {
    producto: "Azúcar",
    cantidad: "50",
    unidad: "Kg",
    ubicacion: "Estante 2",
    sku: "AZC-002",
  },
];
const StockAlmacenLurin = ({
  permissionRead,
  permissionEdit,
  permissionDelete,
}) => {
  return (
    <ListPrincipal
      contenido={contenido}
      permissionRead={permissionRead}
      permissionEdit={permissionEdit}
    >
      <Column
        field="producto"
        header="Producto"
        style={{ paddingLeft: "4rem" }}
      ></Column>
      <Column field="cantidad" header="Cantidad"></Column>
      <Column field="unidad" header="Unidad"></Column>
      <Column field="ubicacion" header="Ubicación"></Column>
    </ListPrincipal>
  );
};

export default StockAlmacenLurin;
