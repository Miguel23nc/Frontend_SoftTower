import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useRef, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getCotizaciones, setMessage } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import Detail from "../Permissions/Detail.jsx";
import Delete from "../Permissions/Delete";
import Edit from "../Permissions/Edit.jsx";
import PopUp from "../../../../recicle/popUps.jsx";
const List = ({ permissionEdit, permissionDelete, permissionRead }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedClient, setSelectedClient] = useState(false);
  const { setResponse, setErrors } = useAuth();
  const dispatch = useDispatch();
  const errorForms = useSelector((state) => state.error);
  const allCotizaciones = useSelector((state) => state.cotizaciones);
  const cotizaciones = allCotizaciones.map((cotizacion) => {
    return {
      ...cotizacion,
      fechaOperacion: new Date(cotizacion.fechaOperacion).toLocaleDateString(
        "es-PE",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      ),
      subTotal: Number(cotizacion.subTotal).toFixed(2),
      igv: Number(cotizacion.igv).toFixed(2),
      total: Number(cotizacion.total).toFixed(2),
    };
  });

  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    dispatch(getCotizaciones());
  }, [dispatch]);

  const handleClosePopUp = () => {
    dispatch(setMessage("", ""));
    setShowPopUp(false);
    setResponse(null);
    setErrors(null);
  };
  const dt = useRef(null);

  const handleShowEdit = (client) => {
    setSelectedClient(client);
    setShowEdit(true);
  };
  const handleShowDelete = (client) => {
    setSelectedClient(client);
    setShowDelete(true);
  };
  useEffect(() => {
    if (errorForms.message) {
      setShowPopUp(true);
    }
  }, [errorForms]);
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
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

  const handleShowDetail = (client) => {
    setSelectedClient(client);
    setShowDetail(true);
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
          placeholder="Search..."
          className="p-2 rounded-xl pl-11 border-blue-200 border-2"
        />
      </IconField>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      {showPopUp && <PopUp onClose={handleClosePopUp} message={errorForms} />}
      {showDetail && (
        <Detail setShowDetail={setShowDetail} client={selectedClient} />
      )}
      {showEdit && (
        <Edit
          setShowPopUp={setShowPopUp}
          setShowEdit={setShowEdit}
          client={selectedClient}
        />
      )}
      {showDelete && (
        <Delete setShowDelete={setShowDelete} cotizacion={selectedClient} />
      )}
      <div className="w-full px-2">
        <DataTable
          ref={dt}
          value={cotizaciones}
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
        >
          <Column
            field="correlativa"
            header="N° Cotización"
            sortable
            style={{ minWidth: "6rem", paddingLeft: "30px", maxWidth: "8rem" }}
          />
          <Column
            field="fechaOperacion"
            header="Fec. Emisión"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="ruc"
            header="RUC"
            sortable
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            field="cliente"
            header="Cliente"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="subTotal"
            header="SubTotal"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="igv"
            header="IGV"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="total"
            header="Total"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="state"
            header="Estado"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="contactDirectory"
            header="Registrado"
            sortable
            style={{ minWidth: "15rem" }}
          ></Column>
          {permissionRead && (
            <Column
              body={(rowData) => (
                <button onClick={() => handleShowDetail(rowData)}>Ver</button>
              )}
              exportable={false}
              style={{ minWidth: "3rem" }}
            ></Column>
          )}

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "7rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default List;
