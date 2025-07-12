import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsistenciaColaboradores } from "../../../../../redux/actions";
import ListPrincipal from "../../../../../components/Principal/List/List";
import EditAsistenciaColaborador from "../Permissions/Edit";
import DeleteAsistenciaColaborador from "../Permissions/Delete";
import DetailAsistenciaColaborador from "../Permissions/Detail";
import { Column } from "primereact/column";

const ListAColaborador = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
}) => {
  const Colaboradores = useSelector((state) => state.recursosHumanos.asistenciaColaboradores);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Colaboradores.length === 0) dispatch(getAsistenciaColaboradores());
  }, [dispatch]);

  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      permissionRead={permissionRead}
      DeleteItem={DeleteAsistenciaColaborador}
      EditItem={EditAsistenciaColaborador}
      DetailItem={DetailAsistenciaColaborador}
      content={Colaboradores ? Colaboradores : []}
      sortField="createdAt"
      sortOrder={-1}
      reload={() => dispatch(getAsistenciaColaboradores())}
    >
      <Column
        field="colaborador.lastname"
        header="Apellidos del Colaborador"
        sortable
        style={{ paddingLeft: "60px" }}
      />
      <Column
        field="colaborador.name"
        header="Nombres del Colaborador"
        sortable
      />

      <Column field="fecha" header="Fecha" sortable />
      <Column field="ingreso" header="Hora de Ingreso" sortable />
      <Column field="inicioAlmuerzo" header="Inicio de Almuerzo" sortable />
      <Column field="finAlmuerzo" header="Fin de Almuerzo" sortable />
      <Column field="salida" header="Hora de Salida" sortable />
      <Column
        field="state"
        header="Estado"
        style={{ justifyItems: "center" }}
        body={(rowData) => {
          let color;
          "PRESENTE", "FALTA", "TARDANZA", "PERMISO", "VACACIONES";
          switch (rowData.estado) {
            case "PRESENTE":
              color = " text-green-500 ";
              break;
            case "TARDANZA":
              color = " text-orange-500 ";
              break;
            case "FALTA":
              color = "text-red-500 ";
              break;
            case "PERMISO":
              color = " text-blue-500 ";
              break;
            case "VACACIONES":
              color = " text-yellow-500 ";
              break;
            default:
              color = " text-gray-500 ";
          }
          return (
            <div
              className={`text-center bg-gradient-to-tr from-white to-gray-100 
                shadow-inner rounded-xl font-semibold  px-5 py-1  ${color} `}
            >
              {rowData.estado}
            </div>
          );
        }}
        sortable
      ></Column>
    </ListPrincipal>
  );
};

export default ListAColaborador;
