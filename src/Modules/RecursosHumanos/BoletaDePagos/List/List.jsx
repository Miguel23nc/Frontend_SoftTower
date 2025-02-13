import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { getBoletaDePagos, getDatosContables } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ViewBoletaDePago from "../Permissions/View";
import EditBoletaDePagos from "../Permissions/Edit";
import DeleteBoletaDePagos from "../Permissions/Delete";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ApproveBoletaDePago from "../Permissions/Approve";
const ListBoletaDePagos = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
  permissionApprove,
}) => {
  const boletaDePagos = useSelector((state) => state.boletaDePagos);
  console.log("boletaDePagos", boletaDePagos);
  const datosContables = useSelector((state) => state.datosContables);
  console.log("datosContables", datosContables);
  useEffect(() => {
    if (datosContables.length === 0) dispatch(getDatosContables());
  }, [datosContables]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (boletaDePagos.length === 0) dispatch(getBoletaDePagos());
  }, [dispatch]);
  return (
    <ListPrincipal
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      permissionApprove={permissionApprove}
      EditItem={EditBoletaDePagos}
      DetailItem={ViewBoletaDePago}
      DeleteItem={DeleteBoletaDePagos}
      ApproveItem={ApproveBoletaDePago}
      content={boletaDePagos}
      sortField="correlativa"
      sortOrder={-1}
    >
      <Column field="correlativa" header="Correlativa" sortable />
      <Column
        body={(rowData) => {
          if (rowData.fechaBoletaDePago) {
            const [mes, año] = rowData.fechaBoletaDePago.split("/");
            const fechaFormateada = `${año}-${mes}`;
            dayjs.locale("es");
            const newFecha = dayjs(fechaFormateada).format("MMMM [de] YYYY");
            const newFechaCapitalizada =
              newFecha.charAt(0).toUpperCase() + newFecha.slice(1);
            return <span>{newFechaCapitalizada}</span>;
          }
        }}
        header="Fecha de la Boleta"
        sortable
      />
      <Column
        field="colaborador.lastname"
        header="Apellidos del Colaborador"
        sortable
      />
      <Column
        field="colaborador.name"
        header="Nombres del Colaborador"
        sortable
      />
      <Column field="colaborador.business" header="Empresa" sortable />
      <Column
        body={(rowData) => {
          return <span>{rowData.envio || "-----"}</span>;
        }}
        header="Enviado"
        sortable
      />
      <Column
        body={(rowData) => {
          return <span>{rowData.recepcion || "-----"}</span>;
        }}
        header="Recibido"
        sortable
      />
      <Column field="state" header="Estado" sortable />
    </ListPrincipal>
  );
};
export default ListBoletaDePagos;
