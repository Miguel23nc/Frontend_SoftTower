import { Column } from "primereact/column";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContracts } from "../../../../redux/actions";
import ListPrincipal from "../../../../components/Principal/List/List";
import ViewContract from "../permissions/View";
import EditContract from "../permissions/Edit";
import ApproveContrato from "../permissions/Approve";
import DisapproveContrato from "../permissions/Disapprove";
import DeleteContrato from "../permissions/Delete";

const List = ({
  permissionEdit,
  permissionRead,
  permissionApprove,
  permissionDisapprove,
  permissionDelete,
}) => {
  const contratos = useSelector((state) => state.contracts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contratos.length === 0) dispatch(getContracts());
  }, [dispatch]);

  const fechaActual = new Date();

  const convertirDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    return date;
  };

  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      permissionApprove={permissionApprove}
      permissionDisapprove={permissionDisapprove}
      permissionDelete={permissionDelete}
      DeleteItem={DeleteContrato}
      EditItem={EditContract}
      DetailItem={ViewContract}
      ApproveItem={ApproveContrato}
      DisapproveItem={DisapproveContrato}
      content={contratos}
      sortField="createdAt"
      sortOrder={-1}
      reload={() => dispatch(getContracts())}
    >
      <Column
        field="colaborador.business"
        header="Empresa"
        sortable
        style={{ minWidth: "8rem", paddingLeft: "60px" }}
      />
      <Column
        field="colaborador.lastname"
        header="Apellidos"
        sortable
        style={{ minWidth: "5rem" }}
      />
      <Column
        field="colaborador.name"
        header="Nombres"
        sortable
        style={{ minWidth: "5rem" }}
      />
      <Column
        field="dateStart"
        header="Fecha de Inicio"
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="dateEnd"
        header="Fecha de Finalización"
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
        body={(rowData) => (
          <span>
            {fechaActual > convertirDate(rowData.dateEnd)
              ? "VENCIDO"
              : "VIGENTE"}
          </span>
        )}
        header="Vigencia"
        sortable
        style={{ minWidth: "8rem" }}
      />
    </ListPrincipal>
  );
};

export default List;
