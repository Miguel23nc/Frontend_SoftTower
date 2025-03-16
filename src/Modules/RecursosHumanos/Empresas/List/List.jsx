import { Column } from "primereact/column";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, setMessage } from "../../../../redux/actions";
import DeleteBusiness from "../Permissions/Delete";
import View from "../Permissions/View";
import EditBusiness from "../Permissions/Edit";
import ListPrincipal from "../../../../components/Principal/List/List";

const List = ({ permissionEdit, permissionDelete, permissionRead }) => {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.business);
  useEffect(() => {
    if (employees.length === 0) dispatch(getBusiness());
  }, [employees, dispatch]);

  return (
    <ListPrincipal
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      EditItem={EditBusiness}
      DetailItem={View}
      content={employees}
    >
      <Column
        field="ruc"
        header="RUC"
        sortable
        style={{ minWidth: "8rem", paddingLeft: "60px" }}
      ></Column>
      <Column
        field="razonSocial"
        header="Razón Social"
        sortable
        style={{ minWidth: "12rem" }}
      ></Column>

      <Column
        field="representative.name"
        header="Representante"
        sortable
        style={{ minWidth: "18rem" }}
      ></Column>
      <Column
        field="domicilioFiscal"
        header="Dirección"
        sortable
        style={{ minWidth: "8rem" }}
      ></Column>
    </ListPrincipal>
  );
};

export default List;
