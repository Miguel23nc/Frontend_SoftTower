import { useEffect, useState } from "react";
import ListPrincipal from "../../../../../components/Principal/List/List";
import EditAsistenciaColaborador from "../Permissions/Edit";
import DeleteAsistenciaColaborador from "../Permissions/Delete";
import DetailAsistenciaColaborador from "../Permissions/Detail";
import { Column } from "primereact/column";
import useSendMessage from "../../../../../recicle/senMessage";
import axios from "../.././../../../api/axios";
import { useSearchParams } from "react-router-dom";

const ListAColaborador = ({
  permissionEdit,
  permissionDelete,
  permissionRead,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalLista, setTotalLista] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const initialPage = parseInt(searchParams.get("pagina")) || 0;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;
  const initialSearch = searchParams.get("search") || "";

  const [pagina, setPagina] = useState(initialPage);
  const [limite, setLimite] = useState(initialLimit);
  const sendMessage = useSendMessage();
  const [asistenciaColaboradores, setAsistenciaColaboradores] = useState([]);
console.log("asistenciaColaboradores", asistenciaColaboradores);

  const recargar = async (pagina = 0, limite = 10, search = "") => {
    try {
      const response = await axios.get("/getAsistenciaByParams", {
        params: {
          page: pagina,
          limit: limite,
          search: search,
        },
      });
      setAsistenciaColaboradores(response.data?.data || []); // o como venga tu lista
      setTotalLista(response.data?.total || 0);
    } catch (error) {
      sendMessage(
        error.message || "Error al recargar la lista de colaboradores",
        "Error"
      );
    }
  };
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
      permissionEdit={permissionEdit}
      permissionDelete={permissionDelete}
      permissionRead={permissionRead}
      DeleteItem={DeleteAsistenciaColaborador}
      EditItem={EditAsistenciaColaborador}
      DetailItem={DetailAsistenciaColaborador}
      content={asistenciaColaboradores}
      reload={recargar}
      totalRecords={totalLista}
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
      onSearch={handleSearch}
      searchTerm={searchTerm}
    >
      <Column
        field="colaborador.lastname"
        header="Apellidos del Colaborador"
        style={{ paddingLeft: "60px" }}
      />
      <Column field="colaborador.name" header="Nombres del Colaborador" />

      <Column field="fecha" header="Fecha" />
      <Column field="ingreso" header="Hora de Ingreso" />
      <Column field="inicioAlmuerzo" header="Inicio de Almuerzo" />
      <Column field="finAlmuerzo" header="Fin de Almuerzo" />
      <Column field="salida" header="Hora de Salida" />
      <Column
        field="state"
        header="Estado"
        style={{ justifyItems: "center" }}
        body={(rowData) => {
          let color;
          "PRESENTE", "FALTA", "TARDANZA", "PERMISO", "VACACIONES";
          switch (rowData.estado) {
            case "PRESENTE":
              color = " text-green-500 ";
              break;
            case "TARDANZA":
              color = " text-orange-500 ";
              break;
            case "FALTA":
              color = "text-red-500 ";
              break;
            case "PERMISO":
              color = " text-blue-500 ";
              break;
            case "VACACIONES":
              color = " text-yellow-500 ";
              break;
            default:
              color = " text-gray-500 ";
          }
          return (
            <div
              className={`text-center bg-gradient-to-tr from-white to-gray-100 
                shadow-inner rounded-xl font-semibold  px-5 py-1  ${color} `}
            >
              {rowData.estado}
            </div>
          );
        }}
      ></Column>
    </ListPrincipal>
  );
};

export default ListAColaborador;
