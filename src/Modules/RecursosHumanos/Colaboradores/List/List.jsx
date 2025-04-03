import { Column } from "primereact/column";
import React, { useEffect } from "react";
import { getEmployees } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditEmployee from "../Permissions/EditEmployee";
import ListPrincipal from "../../../../components/Principal/List/List";
import DetailEmployee from "../Permissions/DetailEmployee";
import Inactive from "../Permissions/Inactive";
import Active from "../Permissions/Active";

const List = ({
  permissionEdit,
  permissionRead,
  permissionApprove,
  permissionDisapprove,
}) => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employees.length === 0) dispatch(getEmployees());
  }, [dispatch]);

  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      permissionApprove={permissionApprove}
      permissionDelete={permissionDisapprove}
      ApproveItem={Active}
      DisapproveItem={Inactive}
      EditItem={EditEmployee}
      DetailItem={DetailEmployee}
      content={employees}
      reload={() => dispatch(getEmployees())}
    >
      <Column
        field="lastname"
        header="Apellidos"
        sortable
        style={{ paddingLeft: "60px" }}
      ></Column>
      <Column field="name" header="Nombres" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="business" header="Empresa" sortable></Column>
      <Column field="state" header="Estado" sortable></Column>
    </ListPrincipal>
  );
};

export default List;
