import { Column } from "primereact/column";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContracts } from "../../../../redux/actions";
import ListPrincipal from "../../../../components/Principal/List/List";
import ViewContract from "../permissions/View";
import EditContract from "../permissions/Edit";
import DeleteContract from "../permissions/Delete";
import ApproveContrato from "../permissions/Approve";

const List = ({ permissionEdit, permissionDelete, permissionRead, permissionApprove }) => {
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
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      permissionApprove={permissionApprove}
      EditItem={EditContract}
      DetailItem={ViewContract}
      DeleteItem={DeleteContract}
      ApproveItem={ApproveContrato}
      content={contratos}
    >
      <Column
        field="empresa.razonSocial"
        header="Empresa"
        sortable
        style={{ minWidth: "8rem", paddingLeft: "60px" }}
      />
      <Column
        field="colaborator.name"
        header="Colaborador"
        sortable
        style={{ minWidth: "8rem" }}
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
