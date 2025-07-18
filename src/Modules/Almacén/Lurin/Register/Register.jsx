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
        descripcion: "",
        unidadDeMedida: "UNIDAD",
        pesoNeto: "",
        pesoBruto: "",
        estadoEnvase: "",
        subItem: "",
        ubicacion: [],
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
      const descripcionBienes = [];
      for (const producto of form.productos) {
        const { ubicacion, ...restProducto } = producto;

        // 1. Crear producto
        const response = await axios.post("/postProductoAlmacen", restProducto);
        const data = response.data;
        const productoId = data.producto._id;

        // 2. Ubicación puede ser 1 o más
        for (const ubic of ubicacion) {
          //obtener el id de la ubicación
          const ubicacionBySection = await axios.get("/getUbicacionByParams", {
            params: {
              zonaId: ubic.zonaId,
              rack: ubic.rack,
              nivel: ubic.nivel,
              seccion: ubic.seccion,
            },
          });
          const ubicacionId = ubicacionBySection.data[0]._id;
          if (ubicacionId === undefined) {
            sendMessage("Ubicación no encontrada", "Error");
            return;
          }
          await patchUbicacionProducto({
            _id: ubicacionId,
            estado: "PARCIALMENTE OCUPADO",
            actualizadoPor: user._id,
          });

          descripcionBienes.push({
            productoId,
            cant: Number(ubic.cantidad),
            ubicacionId,
          });
        }
      }
      const movimientoRes = await axios.post("/postMovimientoAlmacen", {
        ...form,
        contratoId: findContrato._id,
        sedeId: findSede._id,
        descripcionBienes: descripcionBienes,
        creadoPor: user._id,
      });

      const movimientoId = movimientoRes.data.data._id;

      if (descripcionBienes.length === 0) {
        sendMessage("No hay productos para registrar", "Error");
        return;
      }

      for (const item of descripcionBienes) {
        try {
          await axios.post("/postStockAlmacen", {
            sedeId: findSede._id,
            productoId: item.productoId,
            ubicacionId: item.ubicacionId,
            movimientoId,
            contratoId: findContrato?._id,
            cantidad: Number(item.cantidad),
            creadoPor: user._id,
          });
        } catch (error) {
          return sendMessage(
            error?.response?.data?.message?._message ||
              error?.response?.data?.message,
            "Error"
          );
        }
      }
      sendMessage("Movimiento registrado correctamente", "Bien");
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
