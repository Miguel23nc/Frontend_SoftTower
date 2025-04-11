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

const componentMap = {
  colaboradores: Colaboradores,
  clientes: Clientes,
  cotización: Cotizacion,
  empresas: Empresas,
  contratos: Contratos,
  "plantillas contrato": PlantillaContrato,
  asistencia: AsistenciaColaborador,
  "boleta de pagos": BoletaDePagos,
  cotizacion: Cotizacion,
  certificados: Certificados,
  inventario: Inventario,
  widgets: WidgetsSistemas,
};

const Title = () => {
  const { title } = useParams();

  const ComponentToRender = componentMap[title];
  return (
    <div className="pl-20 overflow-auto w-full">
      <ProtectedComponent allowedSubmodules={[title]}>
        {ComponentToRender ? <ComponentToRender /> : "Submódulo no encontrado"}
      </ProtectedComponent>
    </div>
  );
};

export default Title;
