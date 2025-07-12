import { Dropdown } from "primereact/dropdown";
import ListPrincipal from "../../../../components/Principal/List/List";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovimientosBySede } from "../../../../redux/modules/Almacen/actions";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { useSearchParams } from "react-router-dom";
import DetailLurin from "../Permissions/Detail";

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
  const dispatch = useDispatch();
  const allMovimientosBySede = useSelector(
    (state) => state.almacen.allMovimientosBySede
  );

  const [form, setForm] = useState({
    contrato: contratoSeleccionado || contratos[0] || "",
  });

  const contratoId = contratos_id.find(
    (contrato) => contrato.cliente === form.contrato
  );

  const recargar = () => {
    if (contratoId?._id) {
      dispatch(getAllMovimientosBySede(contratoId._id));
    }
  };

  useEffect(() => {
    if (contratoSeleccionado) {
      setForm((prev) => ({ ...prev, contrato: contratoSeleccionado }));
    }
  }, [contratoSeleccionado]);

  useEffect(() => {
    if (contratoId && allMovimientosBySede.length === 0) {
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

  if (!contratos.length)
    return <div className="p-6">Cargando contratos...</div>;

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
          <ListPrincipal
            content={allMovimientosBySede}
            reload={recargar}
            DetailItem={DetailLurin}
            permissionEdit={permissionEdit}
            permissionDelete={permissionDelete}
            permissionRead={permissionRead}
          >
            <Column
              field="correlativa"
              header="Código Interno"
              sortable
              style={{ paddingLeft: "60px" }}
            />
            <Column field="movimiento" header="Movimiento" sortable />
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
