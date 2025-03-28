import { useEffect } from "react";
import ListPrincipal from "../../../../components/Principal/List/List";
import DeletePlantillaContrato from "../Permisos/Delete";
import EditPlantillaContrato from "../Permisos/Edit";
import ViewPlantillaContrato from "../Permisos/View";
import { useDispatch, useSelector } from "react-redux";
import { getPlantillasContrato } from "../../../../redux/actions";
import { Column } from "primereact/column";
import dayjs from "dayjs";

const List = ({ permissionEdit, permissionDelete, permissionRead }) => {
  const plantillas = useSelector((state) => state.allPlantillasContrato);
  const dispatch = useDispatch();
  useEffect(() => {
    if (plantillas.length === 0) dispatch(getPlantillasContrato());
  }, [dispatch]);
  const formattedPlantillas = plantillas.map((plantilla) => ({
    ...plantilla,
    createdAt: dayjs(plantilla.createdAt).format("DD/MM/YYYY"),
  }));
  return (
    <ListPrincipal
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      DeleteItem={DeletePlantillaContrato}
      EditItem={EditPlantillaContrato}
      DetailItem={ViewPlantillaContrato}
      content={formattedPlantillas}
      reload={() => dispatch(getPlantillasContrato())}
    >
      <Column
        field="tipoContrato"
        header="Tipo de Contrato"
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="state"
        header="Estado"
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="createdAt"
        header="Fecha de Subida"
        sortable
        style={{ minWidth: "8rem" }}
      />
    </ListPrincipal>
  );
};

export default List;
