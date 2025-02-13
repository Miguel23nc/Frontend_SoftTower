import Details from "../../../../components/Principal/Permissions/View";
import PDetail from "../../../../recicle/PDtail";

const ViewBoletaDePDetailago = ({ setShowDetail, selected }) => {
  const {
    colaborador,
    descuentosAlTrabajador,
    aportacionesDelEmpleador,
    remuneraciones,
    fechaBoletaDePago,
    envio,
    recepcion,
    horasTrabajadas,
    state,
    diasTrabajados,
    diasSubsidiados,
    diasNoLaborales,
  } = selected;
  console.log("selected", selected);

  return (
    <Details setShowDetail={setShowDetail}>
      <div className="flex flex-wrap justify-around">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold ">Datos del Colaborador</h3>
          <PDetail
            content="Colaborador: "
            value={colaborador.lastname + " " + colaborador.name}
          />
          <PDetail
            content="Numeor de documento: "
            value={colaborador.documentNumber}
          />
          <PDetail content="Empresa: " value={colaborador.business} />
          <PDetail content="Correo eléctronico: " value={colaborador.email} />
          <h3 className="text-2xl mt-3 font-bold ">Datos de la boleta </h3>
          <PDetail content="Fecha de la boleta: " value={fechaBoletaDePago} />
          <PDetail content="Horas trabajadas: " value={horasTrabajadas} />
          <PDetail content="Días trabajados: " value={diasTrabajados} />
          <PDetail content="Días subsidiados: " value={diasSubsidiados} />
          <PDetail content="Días no laborales: " value={diasNoLaborales} />
          <PDetail content="Estado: " value={state} />
          <PDetail content="Envio: " value={envio} />
          <PDetail content="Recepción: " value={recepcion} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold ">Remuneraciones</h3>
          {remuneraciones.map((remuneracion) => (
            <div key={remuneracion.id}>
              <PDetail
                content="Codigo Plame: "
                value={remuneracion.datosContables}
                z
              />
              <PDetail content="Monto: " value={remuneracion.monto} />
            </div>
          ))}
          <h3 className="text-2xl mt-3 font-bold ">Aportes del Empleador</h3>
          {aportacionesDelEmpleador.map((aportes) => (
            <div key={aportes.id}>
              <PDetail
                content="Codigo Plame: "
                value={aportes.datosContables}
              />
              <PDetail content="Monto: " value={aportes.monto} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold ">Descuentos al Trabajador</h3>
          {descuentosAlTrabajador.map((descuento) => (
            <div key={descuento.id}>
              <PDetail
                content="Codigo Plame: "
                value={descuento.datosContables}
              />
              <PDetail content="Monto: " value={descuento.monto} />
            </div>
          ))}
        </div>
      </div>
    </Details>
  );
};

export default ViewBoletaDePDetailago;
