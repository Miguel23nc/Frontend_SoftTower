import { useState } from "react";
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

const RegisterLurin = ({ contratos, contratos_id }) => {
  const sendMessage = useSendMessage();
  const [habilitar, setHabilitar] = useState(false);
  const { postMovimientoAlmacen, postProductosAlmacen } = useAuth();
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
    firmas: {
      horaSalida: "",
      fechaSalida: "",
    },
    detallesDePeso: "",
    referenciaImagen: "",
    observaciones: "",
    codigoIngreso: "",
  });
  const [error, setError] = useState({
    contrato: false,
  });
  const contratoOptions = contratos || [];
  const register = async () => {
    setHabilitar(true);
    try {
      if (form.contrato === "") {
        sendMessage("El campo contrato es obligatorio", "Error");
        return;
      }
      if (form.productos.length === 0) {
        sendMessage("Debe agregar al menos un producto", "Error");
        return;
      }
      const contratoId = contratos_id.find(
        (contrato) => contrato.cliente === form.contrato
      );
      if (!contratoId) {
        sendMessage("Contrato no encontrado", "Error");
        return;
      }
      // const response = await postProductosAlmacen(form.productos);
      // const productoId = response.data._id;
      // // await postMovimientoAlmacen({
      // //   ...form,
      // //   contratoId: contratoId._id,
      // //   descripcionBienes: [
      // //     response.data.map((producto) => ({
      // //       productoId: producto._id,
      // //     })),
      // //   ],
      // // });
    } catch (error) {
      sendMessage(error.message || "Error al registrar el movimiento", "Error");
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
  const [openUbicar, setOpenUbicar] = useState(false);
  const ubicar = () => {
    // if (form.productos.length === 0) {
    //   sendMessage("Debe agregar al menos un producto", "Error");
    //   return;
    // }
    // const producto = form.productos[0];
    // if (!producto.item || !producto.cantidad || !producto.descripcion) {
    //   sendMessage("Debe completar todos los campos del producto", "Error");
    //   return;
    // }
    setOpenUbicar(true);
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
      <CardPlegable title="Descripción de los Bienes Involucrados">
        <Directorio
          ItemComponent={DescripcionDeBienes}
          ubicar={() => ubicar()}
          data="productos"
          estilos=" flex justify-center items-center"
          directory={form.productos}
          setForm={setForm}
          error={error}
        />
      </CardPlegable>
      {openUbicar && <UbicarProducto setShowUbicar={setOpenUbicar} />}

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
