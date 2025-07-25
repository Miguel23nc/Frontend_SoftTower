import { useEffect, useState } from "react";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import DatosBasicos from "./DatosBasicos";
import DatosGenerales from "./DatosGenerales";
import DescripcionDeBienes from "./DescripcionDeBienes";
import Directorio from "../../../../components/RemoveAdd/RemoveItemAdd copy";
import Otros from "./Otros";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import { useAuth } from "../../../../context/AuthContext";
import UbicarProducto from "./Ubicar";
import useValidation from "./Validate";
import axios from "../../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const RegisterLurin = ({ contratos, contratos_id }) => {
  const sendMessage = useSendMessage();

  const [habilitar, setHabilitar] = useState(false);
  const { patchUbicacionProducto, user } = useAuth();
  const [form, setForm] = useState({
    movimiento: "INGRESO",
    contrato: "",
    numeroDeActa: "",
    contribuyente: "",
    numeroDocumento: "",
    productos: [
      {
        item: "",
        cantidad: "",
        descripcion: "",
        unidadDeMedida: "",
        pesoNeto: "",
        pesoBruto: "",
        estadoEnvase: "",
        subItem: "",
        ubicacion: null,
      },
    ],
    datosGenerales: {
      fecha: "",
      horaIngreso: "",
      recepcionadoPor: "",
      dniRecepcionadoPor: "",
      responsableEntrega: "",
      registroOCIP: "",
      estadoActa: "",
    },
    horaSalida: "",
    fechaSalida: "",
    detallesDePeso: "",
    referenciaImagen: "",
    observaciones: "",
    codigoIngreso: "",
  });

  const { error, validateForm } = useValidation(form);

  const contratoOptions = contratos || [];
  const register = async () => {
    setHabilitar(true);
    const erroresDeStock = []; // acumulador de errores

    try {
      const formAntesDeValidar = { ...form };
      delete formAntesDeValidar.horaSalida;
      delete formAntesDeValidar.fechaSalida;
      delete formAntesDeValidar.observaciones;
      delete formAntesDeValidar.detallesDePeso;
      delete formAntesDeValidar.referenciaImagen;
      delete formAntesDeValidar.codigoIngreso;

      const { isValid, firstInvalidPath } = validateForm(formAntesDeValidar);

      if (!isValid) {
        sendMessage(`Debes completar: ${firstInvalidPath}`, "Error");
        return;
      }

      const findSede = contratos_id[0].sedeId;
      const findContrato = contratos_id.find(
        (contrato) => contrato.cliente === form.contrato
      );

      if (!findContrato) {
        sendMessage("Contrato no encontrado", "Error");
        return;
      }

      const movimientoRes = await axios.post("/postMovimientoAlmacen", {
        ...form,
        contratoId: findContrato._id,
        sedeId: findSede._id,
        descripcionBienes: [],
        creadoPor: user._id,
      });

      const movimientoId = movimientoRes.data.data._id;

      const descripcionBienes = [];

      for (const producto of form.productos) {
        const { ubicacion, cantidad, ...restProducto } = producto;

        const responseProducto = await axios.get("/getProductoAlmacen", {
          params: {
            item: restProducto.item,
            subItem: restProducto.subItem,
            descripcion: restProducto.descripcion,
          },
        });

        let productoId;
        if (responseProducto.data?._id) {
          productoId = responseProducto.data._id;
        } else {
          const response = await axios.post("/postProductoAlmacen", {
            ...restProducto,
            cantidad,
          });
          productoId = response.data.producto._id;
        }

        const ubicacionBySection = await axios.get("/getUbicacionByParams", {
          params: {
            zonaId: ubicacion.zonaId,
            rack: ubicacion.rack,
            nivel: ubicacion.nivel,
            seccion: ubicacion.seccion,
          },
        });

        const ubicacionId = ubicacionBySection.data?.[0]?._id;
        if (!ubicacionId) {
          sendMessage("Ubicación no encontrada", "Error");
          return;
        }
        console.log("Ubicación encontrada:", ubicacionBySection.data[0]);

        await patchUbicacionProducto({
          _id: ubicacionId,
          estado: "PARCIALMENTE OCUPADO",
          actualizadoPor: user._id,
        });
        console.log("Se actualizó la ubicación:", ubicacionId);
        

        const responseStock = await axios.get("/getStockProductoUbicacion", {
          params: {
            productoId,
            ubicacionId,
          },
        });

        if (responseStock.data?._id) {
          const stockActual = Number(responseStock.data.cantidad);
          console.log("Stock actual:", stockActual);

          const cantidadSolicitada = Number(cantidad);
          const nuevaCantidad =
            form.movimiento === "SALIDA"
              ? stockActual - cantidadSolicitada
              : stockActual + cantidadSolicitada;

          if (form.movimiento === "SALIDA" && nuevaCantidad < 0) {
            erroresDeStock.push({
              descripcion: restProducto.descripcion,
              ubicacion,
              stockActual,
              cantidadSolicitada,
            });
            continue; // salta este producto
          }

          await axios.patch("/patchStockAlmacen", {
            _id: responseStock.data._id,
            cantidad: nuevaCantidad,
            actualizadoPor: user._id,
          });
        } else {
          if (form.movimiento === "SALIDA") {
            erroresDeStock.push({
              descripcion: restProducto.descripcion,
              ubicacion,
              motivo: "No hay stock en esa ubicación",
            });
            continue; // salta este producto
          }

          await axios.post("/postStockAlmacen", {
            sedeId: findSede._id,
            productoId,
            ubicacionId,
            movimientoId,
            contratoId: findContrato._id,
            cantidad: Number(cantidad),
            creadoPor: user._id,
          });
        }

        descripcionBienes.push({
          productoId,
          ubicacionId,
          cantidad: Number(cantidad),
        });
      }

      await axios.patch("/patchMovimientoAlmacen", {
        _id: movimientoId,
        descripcionBienes,
        actualizadoPor: user._id,
      });

      sendMessage("Movimiento registrado correctamente", "Bien");

      // Mostrar errores al final
      console.log("Errores de stock:", erroresDeStock);

      if (erroresDeStock.length > 0) {
        let mensaje =
          "Algunos productos no se pudieron registrar por falta de stock:\n\n";
        erroresDeStock.forEach((error, i) => {
          if (error.motivo) {
            mensaje += `${i + 1}. ${error.descripcion} - ${error.motivo}\n`;
          } else {
            mensaje += `${i + 1}. ${error.descripcion} - Solicitado: ${
              error.cantidadSolicitada
            }, Stock disponible: ${error.stockActual}\n`;
          }
        });
        sendMessage(mensaje, "Advertencia");
      }
    } catch (error) {
      console.log("Error al registrar movimiento:", error);
      return sendMessage(
        error?.response?.data?.message?._message ||
          error?.response?.data?.message ||
          error.message ||
          "Error al registrar el movimiento",
        "Error"
      );
    } finally {
      setHabilitar(false);
    }
  };

  const resetForm = () => {
    setForm({
      movimiento: "INGRESO",
      contrato: "",
      productos: [
        {
          item: "",
          cantidad: "",
          descripcion: "",
        },
      ],
      datosGenerales: {
        fecha: "",
        horaIngreso: "",
        recepcionadoPor: "",
        dniRecepcionadoPor: "",
        responsableEntrega: "",
        registroOCIP: "",
        estadoActa: "",
      },
    });
    setError({
      contrato: false,
    });
  };

  return (
    <div className="px-5">
      <PopUp deshabilitar={habilitar} />
      <CardPlegable title="Datos Básicos">
        <DatosBasicos
          form={form}
          setForm={setForm}
          contratoOptions={contratoOptions}
          error={error}
        />
      </CardPlegable>
      <CardPlegable title="Datos Generales">
        <DatosGenerales form={form} setForm={setForm} error={error} />
      </CardPlegable>
      <CardPlegable title="Descripción de los Bienes Involucrados (Productos)">
        <Directorio
          ItemComponent={DescripcionDeBienes}
          data="productos"
          estilos=" flex justify-center items-center"
          directory={form.productos}
          sendMessage={sendMessage}
          setForm={setForm}
          error={error}
        />
      </CardPlegable>

      <CardPlegable title="Otros">
        <Otros form={form} setForm={setForm} error={error} />
      </CardPlegable>
      <div className="flex justify-center m-10 ">
        <ButtonOk
          type="ok"
          onClick={register}
          classe="!w-32"
          children="Registrar"
        />
        <ButtonOk
          children="Cancelar"
          classe="!w-32"
          onClick={() => resetForm()}
        />
      </div>
    </div>
  );
};

export default RegisterLurin;
