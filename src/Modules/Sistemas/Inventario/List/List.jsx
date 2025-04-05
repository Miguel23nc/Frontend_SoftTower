import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
const prueba = [
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " LAPTOP DELL",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: "DISCO DURO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
  {
    nombre: " PC LENOVO",
    cantidad: 1,
    encargado: "MIGUEL NICOLAS",
    sede: "SAN ISIDRO",
    area: "SISTEMAS",
    fecha: "2023-10-01",
    estado: "ACTIVO",
  },
];
const ListInventario = () => {
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
      EditItem={null}
      DetailItem={null}
      content={prueba}
    >
      <Column
        field="nombre"
        style={{ paddingLeft: "60px" }}
        header="Nombre"
        sortable
      />
      <Column field="cantidad" header="Cantidad" sortable />
      <Column field="area" header="Area" sortable />
      <Column field="encargado" header="Encargado" sortable />
      <Column field="sede" header="Sede" sortable />
      <Column field="fecha" header="Fecha" sortable />
      <Column field="estado" header="Estado" sortable />
    </ListPrincipal>
  );
};
export default ListInventario;
