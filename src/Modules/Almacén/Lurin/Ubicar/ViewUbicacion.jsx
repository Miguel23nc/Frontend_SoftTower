import { useEffect, useState } from "react";
import Directorio from "../../../../components/RemoveAdd/RemoveItemAdd";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import useSendMessage from "../../../../recicle/senMessage";
import axios from "../../../../api/axios";
import PDetail from "../../../../recicle/PDtail";
import ProgressCircle from "../../../../recicle/Otros/ProgressCircle";
import ProductosUbicacion from "./Productos";

const ViewUbicacion = ({ ubicacionSeleccionada, setViewUbicacion }) => {
  const sendMessage = useSendMessage();
  const [edit, setEdit] = useState({
    productos: [],
  });
  // const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState({
    estado: "",
    porcentaje: 0,
    productos: [],
  });
  console.log("datos", datos);
  console.log("EDIT", edit);

  const editUbicacion = async () => {
    try {
      //poder guardar, quitar o añadir los PRODUCTOS que se movieron de/a la ubicacion
      await axios.patch("/patchStockAlmacen", {
        edit,
      });
    } catch (error) {
      sendMessage(error?.response?.data?.message, "Error");
    }
  };

  const [newPorcentaje, setNewPorcentaje] = useState(null);

  return (
    <div className="w-[90%] h-[89%] bg-white flex flex-col justify-between border-gray-100 border shadow-2xl fixed top-[5vh] z-50 rounded-xl">
      <div className="  flex justify-center items-start min-h-[85%]  max-h-[90%]">
        <div className="px-6 pt-4 overflow-y-auto mt-6 h-[97%] max-h-[97%] w-[95%] flex flex-col bg-gradient-to-tr from-slate-100 to-white rounded-lg shadow-lg ">
          <div className="  my-2 min-h-[40%] flex justify-evenly w-full">
            <div className=" flex flex-col justify-start content-center center w-[40%]">
              <p className="text-3xl mb-5 font-bold">Detalles de Ubicación</p>
              <div className="flex flex-wrap gap-x-6  ">
                <PDetail
                  content="ZONA: "
                  value={ubicacionSeleccionada?.zonaId.nombre}
                />
                <PDetail content="RACK: " value={ubicacionSeleccionada?.rack} />
                <PDetail
                  content="NIVEL: "
                  value={ubicacionSeleccionada?.nivel}
                />
                <PDetail
                  content="SECCIÓN: "
                  value={ubicacionSeleccionada?.seccion}
                />
                <PDetail
                  content="PRODUCTOS: "
                  value={ubicacionSeleccionada?.seccion}
                />
                <PDetail
                  content="SECCIÓN: "
                  value={ubicacionSeleccionada?.seccion}
                />
              </div>
            </div>
            <div className="sm:max-w-[40%] md:max-w-[50%] lg:max-w-[30%] xl:max-w-[20%] flex flex-wrap justify-center ">
              <p className="text-3xl mb-5 font-bold">Espacio Ocupado</p>
              <ProgressCircle
                percentage={newPorcentaje}
                onEditChange={setNewPorcentaje}
              />
            </div>
          </div>
          <div className="">
            <CardPlegable title="Productos en esta Ubicación">
              <Directorio
                ItemComponent={ProductosUbicacion}
                data="productos"
                estilos=" flex justify-center items-center"
                error={{
                  cantidad: false,
                  descripcion: false,
                  unidadDeMedida: false,
                  subItem: false,
                }}
                setForm={setEdit}
                directory={datos.productos}
              />
            </CardPlegable>
          </div>
        </div>
      </div>
      <div className="min-h-[10%] max-h-[12%] flex justify-end items-center m-2 ">
        <ButtonOk
          onClick={() => editUbicacion()}
          children="Guardar"
          type="ok"
        />
        <ButtonOk onClick={() => setViewUbicacion(false)} children="Cerrar" />
      </div>
    </div>
  );
};

export default ViewUbicacion;
