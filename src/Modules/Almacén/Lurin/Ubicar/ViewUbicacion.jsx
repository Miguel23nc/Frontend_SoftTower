import { useEffect, useState } from "react";
import Directorio from "../../../../components/RemoveAdd/RemoveItemAdd";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import useSendMessage from "../../../../recicle/senMessage";
import axios from "../../../../api/axios";
import PDetail from "../../../../recicle/PDtail";
import ProgressCircle from "../../../../recicle/Otros/ProgressCircle";
import ProductosUbicacion from "./Productos";
import { deepDiff } from "../../../validateEdit";
import { useAuth } from "../../../../context/AuthContext";

const ViewUbicacion = ({ ubicacionSeleccionada, setViewUbicacion }) => {
  const sendMessage = useSendMessage();
  const form = {
    estado: ubicacionSeleccionada?.estado,
    porcentaje: ubicacionSeleccionada?.porcentaje || 0,
    productos:
      ubicacionSeleccionada?.productos?.map((prod) => ({
        productoId: prod.productoId._id,
        cantidad: prod.cantidad,
        descripcion: prod.productoId.descripcion,
      })) || [],
  };
  console.log("form", form);

  const { patchUbicacionProducto, user } = useAuth();
  const [edit, setEdit] = useState({
    estado: ubicacionSeleccionada?.estado || "",
    porcentaje: ubicacionSeleccionada?.porcentaje || 0,
    productos: ubicacionSeleccionada?.productos || [],
  });
  console.log("edit", edit);

  const editUbicacion = async () => {
    try {
      //poder guardar, quitar o añadir los PRODUCTOS que se movieron de/a la ubicacion
      // actualizar el estado y porcentaje de la ubicacion
      // en el edit en productos, solo debería enviarse el id del producto y su cantidad
      // tambien etidar el stock del almacen con las cantidades disponibles

      const diferencias = deepDiff(form, edit);
      if (!diferencias || Object.keys(diferencias).length === 0) {
        sendMessage("No hay cambios para guardar", "Info");
      }
      if (diferencias.productos || diferencias.productos?.length > 0) {
        const productosAñadidos = deepDiff(form.productos, edit.productos);
        const productosSacados = deepDiff(edit.productos, form.productos);
        console.log("productosAñadidos", productosAñadidos);
        console.log("productosSacados", productosSacados);

        for (const prod of Object.values(productosAñadidos)) {
          const cantidadDisponible = prod.cantidadDisponible
            ? Number(prod.cantidadDisponible)
            : 0;
          const cantidadASacar = Number(prod.cantidad);

          if (cantidadASacar > cantidadDisponible) {
            sendMessage(
              `La cantidad a sacar del producto "${prod.descripcion}" (${cantidadASacar}) supera la cantidad disponible (${cantidadDisponible}).`,
              "Error"
            );
            return;
          }
          if (cantidadASacar === 0) {
            sendMessage(
              `La cantidad a sacar del producto "${prod.descripcion}" no puede ser  0.`,
              "Error"
            );
            return;
          }
          await axios.patch("/patchStockAlmacen", {
            productoId: prod.productoId,
            cantidadDisponible: cantidadDisponible - cantidadASacar,
          });
        }
        for (const prod of Object.values(productosSacados)) {
          const cantidadDisponible = prod.cantidadDisponible
            ? Number(prod.cantidadDisponible)
            : 0;
          const cantidadADevolver = Number(prod.cantidad);

          await axios.patch("/patchStockAlmacen", {
            productoId: prod.productoId,
            cantidadDisponible: cantidadDisponible + cantidadADevolver,
          });
        }
      }
      await patchUbicacionProducto({
        _id: ubicacionSeleccionada._id,
        actualizadoPor: user._id,
        ...diferencias,
      });
    } catch (error) {
      sendMessage(error?.response?.data?.message, "Error");
    } finally {
      // setViewUbicacion(false);
    }
  };

  useEffect(() => {
    if (edit.porcentaje >= 100) {
      setEdit((prev) => ({ ...prev, estado: "OCUPADO" }));
    } else if (edit.porcentaje > 0 && edit.porcentaje < 100) {
      setEdit((prev) => ({ ...prev, estado: "PARCIALMENTE OCUPADO" }));
    } else if (edit.porcentaje === 0 && edit.estado === "LIBRE") {
      return;
    } else {
      setEdit((prev) => ({ ...prev, estado: "LIBRE" }));
    }
  }, [edit.porcentaje]);
  return (
    <div className="w-[90%] h-[89%] bg-white flex flex-col justify-between border-gray-100 border shadow-2xl fixed top-[5vh] z-50 rounded-xl">
      <div className="  flex justify-center items-start min-h-[85%]  max-h-[90%]">
        <div className="px-6 pt-4 overflow-y-auto mt-6 h-[97%] max-h-[97%] w-[95%] flex flex-col bg-gradient-to-tr from-slate-100 to-white rounded-lg shadow-lg ">
          <div className="  my-2 md:min-h-[60%] 2xl:min-h-[45%] flex justify-evenly w-full">
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
                percentage={edit.porcentaje}
                onEditChange={(value) =>
                  setEdit((prev) => ({ ...prev, porcentaje: value }))
                }
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
                directory={edit.productos}
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
