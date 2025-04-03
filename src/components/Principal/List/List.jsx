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
  permissionDisapprove,
  ApproveItem,
  DisapproveItem,
  DeleteItem,
  EditItem,
  DetailItem,
  content,
  children,
  reload,
  ...OtheProps
}) => {
  const dt = useRef(null);
  const [selected, setSelected] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showDisapprove, setShowDisapprove] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const { setResponse, setErrors } = useAuth();
  const errorForms = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const handleShowEdit = (item) => {
    setSelected(item);
    setShowEdit(true);
  };
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleShowApprove = (item) => {
    setSelected(item);
    setShowApprove(true);
    setSelectedRowId(item._id);
  };
  const handleShowDisapprove = (item) => {
    setSelected(item);
    setShowDisapprove(true);
    setSelectedRowId(item._id);
  };
  const handleShowDelete = (item) => {
    setSelected(item);
    setShowDelete(true);
    setSelectedRowId(item._id);
  };
  const handleShowDetail = (item) => {
    setSelected(item);
    setShowDetail(true);
    setSelectedRowId(item._id);
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
    const isApproved =
      rowData.state === "APROBADO" || rowData.state === "ACTIVO";
    return (
      <React.Fragment>
        {permissionRead && (
          <Button
            icon="pi pi-eye"
            rounded
            outlined
            className={` text-black rounded-full mx-1 bg-[#f7f6f6bb]  transition-all duration-150 ease-in-out 
              ${
                selectedRowId === rowData._id && showDetail
                  ? "shadow-inner translate-y-[2px]"
                  : "shadow-xl"
              }
              `}
            onClick={() => handleShowDetail(rowData)}
          />
        )}
        {permissionApprove && (
          <Button
            icon={"pi pi-check"}
            rounded
            outlined
            className={` text-green-500 rounded-full
              ${isApproved ? "cursor-not-allowed opacity-30" : ""}
              mx-1 bg-[#f7f6f6bb] transition-all duration-150 ease-in-out 
              ${
                selectedRowId === rowData._id && showApprove
                  ? "shadow-inner translate-y-[2px]"
                  : "shadow-xl"
              }
              `}
            onClick={() => handleShowApprove(rowData)}
            disabled={isApproved}
          />
        )}
        {permissionApprove && (
          <Button
            icon={"pi pi-times"}
            rounded
            outlined
            className={`text-orange-600 rounded-full
              ${!isApproved ? "cursor-not-allowed opacity-30" : ""}
              mx-1 bg-[#f7f6f6bb] transition-all duration-150 ease-in-out 
              ${
                selectedRowId === rowData._id && showDisapprove
                  ? "shadow-inner translate-y-[2px]"
                  : "shadow-xl"
              }
              `}
            onClick={() => handleShowDisapprove(rowData)}
            disabled={!isApproved}
          />
        )}
        {permissionEdit && (
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className={` text-blue-500 rounded-full 
              ${isApproved ? "cursor-not-allowed opacity-30" : ""}
              mx-1 bg-[#f7f6f6bb]  transition-all duration-150 ease-in-out 
              ${
                selectedRowId === rowData._id && showEdit
                  ? "shadow-inner translate-y-[2px]"
                  : "shadow-xl"
              }
              `}
            onClick={() => handleShowEdit(rowData)}
            disabled={isApproved}
          />
        )}
        {permissionDelete && (
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            className={` text-red-600 rounded-full 
              ${isApproved ? "cursor-not-allowed opacity-30" : ""}
              mx-1 bg-[#f7f6f6bb]  transition-all duration-150 ease-in-out 
              ${
                selectedRowId === rowData._id && showDelete
                  ? "shadow-inner translate-y-[2px]"
                  : "shadow-xl"
              }
              `}
            severity="danger"
            onClick={() => handleShowDelete(rowData)}
            disabled={isApproved}
          />
        )}
      </React.Fragment>
    );
  };
  const [loading, setLoading] = useState(false);
  const useEffectAsync = async () => {
    setLoading(true);
    if (content.length === 0) {
      setLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };
  useEffect(() => {
    useEffectAsync();
  }, []);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap pr-20 justify-end gap-2 ">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search pl-2" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          className="p-2 rounded-xl pl-11 focus:shadow-inner focus:translate-x-[1px] ease-in-out  shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 "
        />
      </IconField>
      {reload ? (
        <div className="flex gap-2 p-2 rounded-xl  focus:shadow-inner focus:translate-x-[1px] ease-in-out  shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <Button
            icon="pi pi-refresh"
            className="p-button-outlined"
            onClick={() => {
              reload();
              useEffectAsync();
            }}
            tooltip="Recargar"
          />
        </div>
      ) : null}
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
      {showDisapprove && (
        <DisapproveItem
          setShowDisapprove={setShowDisapprove}
          selected={selected}
        />
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
      <div className="w-full border-2 m-2 mt-0 border-gray-100 rounded-xl shadow-lg bg-white">
        <DataTable
          ref={dt}
          value={content}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="_id"
          loading={loading}
          paginator
          // first={0}
          // rows={9}
          // totalRecords={0}
          // onPage={(e) => console.log(e)}
          rowsPerPageOptions={[5, 10, 20, 25]}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          {...OtheProps}
        >
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
