import Ingresos from "./Ingreso";
import Movimientos from "./Movimientos";
import Salidas from "./Salida";
import Stock from "./Stock";

const Reporte = ({ contratos, contratos_id }) => {
  return (
    <div className="p-8">
      <Stock contratos={contratos} contradosId={contratos_id} />
      <Movimientos contratos={contratos} contradosId={contratos_id} />
      <Ingresos contratos={contratos} contradosId={contratos_id} />
      <Salidas contratos={contratos} contradosId={contratos_id} />
    </div>
  );
};

export default Reporte;
