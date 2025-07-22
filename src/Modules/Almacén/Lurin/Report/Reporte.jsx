import Ingresos from "./Ingreso";
import Movimientos from "./Movimientos";
import Salidas from "./Salida";
import Stock from "./Stock";

const Reporte = ({ contratos, contratos_id }) => {
  const plantillaSegura =
    "https://res.cloudinary.com/ddci9jvnh/raw/upload/v1753196301/REPORTE_STOCK_ALMACEN_wnwk1t.xlsx";
  const plantillaSimple =
    "http://res.cloudinary.com/ddci9jvnh/raw/upload/v1753196301/REPORTE_STOCK_ALMACEN_wnwk1t.xlsx";
  return (
    <div className="p-8">
      <Stock
        contratos={contratos}
        contratosId={contratos_id}
        plantilla={plantillaSegura}
      />
      <Movimientos contratos={contratos} contratosId={contratos_id} />
      <Ingresos contratos={contratos} contratosId={contratos_id} />
      <Salidas contratos={contratos} contratosId={contratos_id} />
    </div>
  );
};

export default Reporte;
