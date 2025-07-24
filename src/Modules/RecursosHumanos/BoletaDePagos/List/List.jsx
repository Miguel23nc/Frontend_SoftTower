import { Column } from "primereact/column";
import ListPrincipal from "../../../../components/Principal/List/List";
import { getDatosContables } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ViewBoletaDePago from "../Permissions/View";
import EditBoletaDePagos from "../Permissions/Edit";
import DeleteBoletaDePagos from "../Permissions/Delete";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ApproveBoletaDePago from "../Permissions/Approve";
import DisapproveBoletaDePago from "../Permissions/Disapprove";
import useSendMessage from "../../../../recicle/senMessage";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../api/axios";
const ListBoletaDePagos = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
  permissionApprove,
}) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalColaboradores, setTotalColaboradores] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const initialPage = parseInt(searchParams.get("pagina")) || 0;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;
  const initialSearch = searchParams.get("search") || "";

  const [pagina, setPagina] = useState(initialPage);
  const [limite, setLimite] = useState(initialLimit);
  const sendMessage = useSendMessage();
  const [boletaDePagos, setBoletaDePagos] = useState([])
  
  const datosContables = useSelector(
    (state) => state.recursosHumanos.datosContables
  );
  const recargar = async (pagina = 0, limite = 10, search = "") => {
    try {
      const response = await axios.get("/getBoletaDePagoByParams", {
        params: {
          page: pagina,
          limit: limite,
          search: search,
        },
      });
      setBoletaDePagos(response.data?.data || []);
      setTotalColaboradores(response.data?.total || 0);
    } catch (error) {
      sendMessage(
        error.message || "Error al recargar la lista de colaboradores",
        "Error"
      );
    }
  };
  useEffect(() => {
    if (datosContables.length === 0) dispatch(getDatosContables());
  }, [datosContables]);
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPagina(0); // Resetear a la primera página al buscar

    setSearchParams((prev) => {
      prev.set("pagina", 0);
      prev.set("search", term);
      return prev;
    });

    recargar(0, limite, term);
  };

  useEffect(() => {
    if (datosContables.length === 0) dispatch(getDatosContables());
  }, [datosContables]);
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const newPage = parseInt(sp.get("pagina")) || 0;
    const newLimit = parseInt(sp.get("limit")) || 10;
    const newSearch = sp.get("search") || "";

    setPagina(newPage);
    setLimite(newLimit);
    setSearchTerm(newSearch);
    recargar(newPage, newLimit, newSearch);
  }, [location.search]);
  return (
    <ListPrincipal
      content={boletaDePagos}
      permissionDelete={permissionDelete}
      permissionEdit={permissionEdit}
      permissionRead={permissionRead}
      permissionApprove={permissionApprove}
      EditItem={EditBoletaDePagos}
      DetailItem={ViewBoletaDePago}
      DeleteItem={DeleteBoletaDePagos}
      ApproveItem={ApproveBoletaDePago}
      DisapproveItem={DisapproveBoletaDePago}
      totalRecords={totalColaboradores}
      first={pagina * limite}
      rows={limite}
      onPage={(e) => {
        const newPage = e.page;
        const newLimit = e.rows;

        setPagina(newPage);
        setLimite(newLimit);

        setSearchParams((prev) => {
          prev.set("pagina", newPage);
          prev.set("limit", newLimit);
          return prev;
        });

        recargar(newPage, newLimit, searchTerm);
      }}
      onSearch={handleSearch} // Pasar la función de búsqueda
      searchTerm={searchTerm} // Pasar el término de búsqueda actual
    >
      <Column
        field="correlativa"
        header="Correlativa"
        style={{ paddingLeft: "60px" }}
      />
      <Column
        field="fechaBoletaDePago"
        header="Fecha de la Boleta"
        body={(rowData) => {
          if (rowData.fechaBoletaDePago) {
            const [mes, año] = rowData.fechaBoletaDePago.split("/");
            const fechaFormateada = `${año}-${mes}`;
            dayjs.locale("es");
            const newFecha = dayjs(fechaFormateada).format("MMMM [de] YYYY");
            const newFechaCapitalizada =
              newFecha.charAt(0).toUpperCase() + newFecha.slice(1);
            return <span>{newFechaCapitalizada}</span>;
          }
        }}
      />

      <Column field="colaborador.lastname" header="Apellidos del Colaborador" />
      <Column field="colaborador.name" header="Nombres del Colaborador" />
      <Column field="colaborador.business" header="Empresa" />
      <Column
        field="envio"
        body={(rowData) => {
          return <span>{rowData.envio || "-----"}</span>;
        }}
        header="Enviado"
      />
      <Column
        field="recepcion"
        body={(rowData) => {
          return <span>{rowData.recepcion || "-----"}</span>;
        }}
        header="Recibido"
      />
      <Column
        field="state"
        header="Estado"
        style={{
          justifyItems: "center",
          // display: window.innerWidth <= 1250 ? "none" : "table-cell",
        }}
        body={(rowData) => {
          const color =
            rowData.state === "APROBADO"
              ? " text-green-500 "
              : " text-red-500 ";

          return (
            <div
              className={`text-center bg-gradient-to-tr from-white to-gray-100 
                shadow-inner rounded-xl font-semibold  px-5 py-1  ${color} `}
            >
              {rowData.state}
            </div>
          );
        }}
      />
    </ListPrincipal>
  );
};
export default ListBoletaDePagos;
