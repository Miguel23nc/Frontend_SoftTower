import { Dropdown } from "primereact/dropdown";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovimientosBySede } from "../../../../redux/modules/Almacen/actions";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { useSearchParams } from "react-router-dom";
import DetailLurin from "../Permissions/Detail";
import DeleteMovimientoAlmacen from "../Permissions/DeleteMovimiento";
import EditMovimiento from "../Permissions/EditMovimiento";

const ListLurin = ({
  permissionEdit,
  permissionRead,
  permissionDelete,
  contratos,
  contratos_id,
  contratoSeleccionado,
  setContratoSeleccionado,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("pagina")) || 0;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [pagina, setPagina] = useState(initialPage);
  const [limite, setLimite] = useState(initialLimit);

  const dispatch = useDispatch();
  const allMovimientosBySede = useSelector(
    (state) => state.almacen.allMovimientosBySede
  );
  const initialMovimiento = searchParams.get("movimiento") || "TODOS";
  const initialContrato =
    contratoSeleccionado || searchParams.get("contrato") || contratos[0] || "";

  const [form, setForm] = useState({
    contrato: initialContrato,
    movimiento: initialMovimiento,
  });

  const contratoId = contratos_id.find(
    (contrato) => contrato.cliente === form.contrato
  );

  const recargar = (pagina = 0, limite = 10, movimiento = form.movimiento) => {
    if (contratoId?._id) {
      dispatch(
        getAllMovimientosBySede(contratoId._id, movimiento, pagina, limite)
      ).then((res) => {
        setTotalRegistros(res?.total || 0);
      });
    }
  };
  useEffect(() => {
    if (contratoSeleccionado) {
      setForm((prev) => ({ ...prev, contrato: contratoSeleccionado }));
    }
  }, [contratoSeleccionado]);

  useEffect(() => {
    if (contratoId && allMovimientosBySede?.length === 0) {
      recargar();
    }
  }, [contratoId]);

  const seleccionarContrato = (e) => {
    const selected = e.value;
    setForm((prev) => ({ ...prev, contrato: selected }));
    setContratoSeleccionado(selected);
    setSearchParams((prev) => {
      prev.set("select", "Listar");
      prev.set("contrato", selected);
      return prev;
    });
    const id = contratos_id.find((c) => c.cliente === selected)?._id;
    if (id) dispatch(getAllMovimientosBySede(id));
  };
  const seleccionarMovimiento = (e) => {
    const selected = e.value;
    setForm((prev) => ({ ...prev, movimiento: selected }));
    setSearchParams((prev) => {
      prev.set("select", "Listar");
      prev.set("movimiento", selected);
      return prev;
    });
    recargar(0, limite, selected);
  };

  if (!contratos.length)
    return <div className="p-6">Cargando contratos...</div>;
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const newPage = parseInt(sp.get("pagina")) || 0;
    const newLimit = parseInt(sp.get("limit")) || 10;
    setPagina(newPage);
    setLimite(newLimit);
    recargar(newPage, newLimit);
  }, [location.search]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full relative">
        <div className="flex flex-col gap-4 px-4">
          <Dropdown
            value={form.contrato}
            onChange={seleccionarContrato}
            options={contratos}
            placeholder="Seleccione contrato"
            dropdownIcon="pi pi-sort-down-fill"
            className="absolute top-4 h-11 w-44 mx-4 ml-7 text-center items-center text-base pl-6 z-10 rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-100"
          />
          <Dropdown
            value={form.movimiento}
            onChange={seleccionarMovimiento}
            options={["INGRESO", "SALIDA", "TODOS"]}
            placeholder="Seleccione Movimiento"
            dropdownIcon="pi pi-sort-down-fill"
            className="absolute top-4 h-11 w-44 mx-4  left-60 text-center items-center text-base pl-6 z-10 rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-100"
          />
          <ListPrincipal
            content={allMovimientosBySede}
            reload={recargar}
            DetailItem={DetailLurin}
            EditItem={EditMovimiento}
            DeleteItem={DeleteMovimientoAlmacen}
            permissionEdit={permissionEdit}
            permissionDelete={permissionDelete}
            permissionRead={permissionRead}
            totalRecords={totalRegistros}
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

              recargar(newPage, newLimit);
            }}
          >
            <Column
              field="correlativa"
              header="Código Interno"
              style={{ paddingLeft: "60px" }}
            />
            <Column field="movimiento" header="Movimiento" />
            <Column field="contribuyente" header="Contribuyente" />
            <Column field="datosGenerales.fecha" header="Fecha" />
            <Column field="datosGenerales.horaIngreso" header="Hora Ingreso" />
            <Column
              field="datosGenerales.recepcionadoPor"
              header="Recepcionado Por"
            />
            <Column field="numeroDeActa" header="Número de Acta" />
            <Column field="datosGenerales.estadoActa" header="Estado de Acta" />
          </ListPrincipal>
        </div>
      </div>
    </div>
  );
};

export default ListLurin;
