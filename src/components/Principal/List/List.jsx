import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useRef, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./stylePrueba.css";
import PopUp from "../../../recicle/popUps";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/actions";
const ListPrincipal = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
  permissionApprove,
  ApproveItem,
  DeleteItem,
  EditItem,
  DetailItem,
  content,
  children,
  ...OtheProps
}) => {
  const dt = useRef(null);
  const [selected, setSelected] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const { setResponse, setErrors } = useAuth();
  const errorForms = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const handleShowEdit = (item) => {
    setSelected(item);
    setShowEdit(true);
  };
  const handleShowApprove = (item) => {
    setSelected(item);
    setShowApprove(true);
  };
  const handleShowDelete = (item) => {
    setSelected(item);
    setShowDelete(true);
  };
  const handleShowDetail = (item) => {
    setSelected(item);
    setShowDetail(true);
  };
  const handleClosePopUp = () => {
    dispatch(setMessage("", ""));
    setShowPopUp(false);
    setResponse(null);
    setErrors(null);
  };
  useEffect(() => {
    if (errorForms.message) {
      setShowPopUp(true);
    }
  }, [errorForms]);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {permissionRead && (
          <Button
            icon="pi pi-eye"
            rounded
            outlined
            className="mr-2"
            onClick={() => handleShowDetail(rowData)}
          />
        )}
        {permissionApprove && (
          <Button
            icon={
              rowData.state === "APROBADO" || rowData.state === "ACTIVO"
                ? "pi pi-times"
                : "pi pi-check"
            }
            rounded
            outlined
            className="mr-2"
            onClick={() => handleShowApprove(rowData)}
          />
        )}
        {permissionEdit && (
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => handleShowEdit(rowData)}
          />
        )}
        {permissionDelete && (
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => handleShowDelete(rowData)}
          />
        )}
      </React.Fragment>
    );
  };
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap pr-28 justify-end gap-2 ">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search pl-2" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          className="p-2 rounded-xl pl-11 border-blue-200 border-2"
        />
      </IconField>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      {showPopUp && <PopUp onClose={handleClosePopUp} message={errorForms} />}
      {showDetail && (
        <DetailItem setShowDetail={setShowDetail} selected={selected} />
      )}
      {showApprove && (
        <ApproveItem setShowApprove={setShowApprove} selected={selected} />
      )}
      {showEdit && (
        <EditItem
          setShowPopUp={setShowPopUp}
          setShowEdit={setShowEdit}
          selected={selected}
        />
      )}
      {showDelete && (
        <DeleteItem setShowDelete={setShowDelete} selected={selected} />
      )}
      <div className="w-full">
        <DataTable
          ref={dt}
          value={content}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="_id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          {...OtheProps}
        >
          <Column style={{ paddingLeft: "5px" }} />
          {children}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ListPrincipal;
