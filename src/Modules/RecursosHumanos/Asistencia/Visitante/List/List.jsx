import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListPrincipal from "../../../../../components/Principal/List/List";
import { Column } from "primereact/column";
import { getAsistenciaVisitantes } from "../../../../../redux/actions";
import EditAsistenciaVisitante from "../Permissions/Edit";
import DeleteAsistenciaVisitante from "../Permissions/Delete";
import DetailAsistenciaVisitante from "../Permissions/Detail";

const ListAVisitante = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
}) => {
  const Visitantes = useSelector((state) => state.recursosHumanos.asistenciaVisitantes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Visitantes.length === 0) dispatch(getAsistenciaVisitantes());
  }, [dispatch]);

  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      permissionRead={permissionRead}
      DeleteItem={DeleteAsistenciaVisitante}
      EditItem={EditAsistenciaVisitante}
      DetailItem={DetailAsistenciaVisitante}
      content={Visitantes ? Visitantes : []}
    >
      <Column field="fecha" header="Fecha" sortable />
      <Column field="ingreso" header="Hora de Entrada" sortable />
      <Column field="salida" header="Hora de Salida" sortable />
      <Column field="inicioAlmuerzo" header="Inicio de Almuerzo" sortable />
      <Column field="finAlmuerzo" header="Fin de Almuerzo" sortable />
      <Column
        field="colaborador.lastname"
        header="Apellidos del Visitante"
        sortable
      />
      <Column
        field="colaborador.name"
        header="Nombres del Visitante"
        sortable
      />
    </ListPrincipal>
  );
};

export default ListAVisitante;
