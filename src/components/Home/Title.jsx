import { useParams } from "react-router";
import ProtectedComponent from "./ProtectedComponent";
import Colaboradores from "../../Modules/RecursosHumanos/Colaboradores/Colaboradores";
import Clientes from "../../Modules/Comercial/Clientes/Clientes";
import Cotizacion from "../../Modules/Comercial/Cotización/Cotización";
import Empresas from "../../Modules/RecursosHumanos/Empresas/Empresas";
import Contratos from "../../Modules/RecursosHumanos/Contratos/Contratos";
import PlantillaContrato from "../../Modules/RecursosHumanos/PlantillaContrato/PlantillasContrato";
import AsistenciaColaborador from "../../Modules/RecursosHumanos/Asistencia/Colaborador/AsistenciaColaborador";
import BoletaDePagos from "../../Modules/RecursosHumanos/BoletaDePagos/BoletaDePagos";
import Certificados from "../../Modules/Certificación/Certificados/Certificados";
import Inventario from "../../Modules/Sistemas/Inventario/Inventario";
import Novedades from "../Widgets/Novedades/Novedades";
import WidgetsSistemas from "../../Modules/Sistemas/Widgets/Widgets";
import ModulosYSubmodulos from "../../Modules/Herramientas/Modulos Y Submodulos/ModulosYSubmodulos";
import ActivosDigitales from "../../Modules/Sistemas/Activos Digitales/ActivosDigitales";
import Backups from "../../Modules/Sistemas/Backups/Backups";
import Asignaciones from "../../Modules/Sistemas/Asignaciones/Asignaciones";
import Permissions from "../../Modules/Sistemas/Permisos/Permisos";

//necesito sacar los modulos y sus submodulos para luego pasarlos

const componentMap = {
  "recursos humanos": {
    colaboradores: Colaboradores,
    empresas: Empresas,
    contratos: Contratos,
    "plantillas contrato": PlantillaContrato, //voy a volverlo solo plantillas y añadiré las plantillas de excel y word de asistencias boletas de pago y más
    asistencia: AsistenciaColaborador,
    "boleta de pagos": BoletaDePagos,
  },
  certificacion: {
    certificados: Certificados,
  },
  comercial: {
    certificados: Certificados,
    clientes: Clientes,
    cotización: Cotizacion,
    cotizacion: Cotizacion,
  },
  sistemas: {
    inventario: Inventario,
    asignaciones: Asignaciones,
    "activos digitales": ActivosDigitales,
    backups: Backups,
    permisos: Permissions,
  },
  herramientas: {
    novedades: Novedades,
    widgets: WidgetsSistemas,
    "modulos y submodulos": ModulosYSubmodulos,
  },
};

const Title = () => {
  const { module, submodule } = useParams();

  const moduleComponents = componentMap[module];
  const ComponentToRender = moduleComponents
    ? moduleComponents[submodule]
    : null;

  return (
    <div className="pl-20 overflow-auto w-full">
      <ProtectedComponent
        allowedSubmodules={[submodule]}
        allowedModules={[module]}
      >
        {ComponentToRender ? <ComponentToRender /> : "Submódulo no encontrado"}
      </ProtectedComponent>
    </div>
  );
};

export default Title;
