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
import DisapproveBoletaDePago from "../Permissions/Disapprove";
const ListBoletaDePagos = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
  permissionApprove,
}) => {
  const boletaDePagos = useSelector((state) => state.recursosHumanos.boletaDePagos);
  const datosContables = useSelector((state) => state.recursosHumanos.datosContables);
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
      DisapproveItem={DisapproveBoletaDePago}
      content={boletaDePagos}
      sortField="correlativa"
      sortOrder={-1}
      reload={() => dispatch(getBoletaDePagos())}
    >
      <Column
        field="correlativa"
        header="Correlativa"
        style={{ paddingLeft: "60px" }}
        sortable
      />
      <Column
        field="fechaBoletaDePago"
        header="Fecha de la Boleta"
        sortable
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
        field="envio"
        body={(rowData) => {
          return <span>{rowData.envio || "-----"}</span>;
        }}
        header="Enviado"
        sortable
      />
      <Column
        field="recepcion"
        body={(rowData) => {
          return <span>{rowData.recepcion || "-----"}</span>;
        }}
        header="Recibido"
        sortable
      />
      <Column
        field="state"
        header="Estado"
        style={{
          justifyItems: "center",
          // display: window.innerWidth <= 1250 ? "none" : "table-cell",
        }}
        body={(rowData) => {
          const color =
            rowData.state === "APROBADO"
              ? " text-green-500 "
              : " text-red-500 ";

          return (
            <div
              className={`text-center bg-gradient-to-tr from-white to-gray-100 
                shadow-inner rounded-xl font-semibold  px-5 py-1  ${color} `}
            >
              {rowData.state}
            </div>
          );
        }}
        sortable
      />
    </ListPrincipal>
  );
};
export default ListBoletaDePagos;
