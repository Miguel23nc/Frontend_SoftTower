export const validateItem = (form) => {
  const {
    service,
    typeService,
    typeWaste,
    measure,
    quantity,
    priceWithoutIGV,
    priceWithIGV,
    subTotal,
  } = form;

  let errors = {};

  if (!service) errors.service = "El campo servicio es requerido";
  if (!typeService)
    errors.typeService = "El campo tipo de servicio es requerido";
  if (!typeWaste) errors.typeWaste = "El campo tipo de residuo es requerido";
  if (!measure) errors.measure = "Este campo es requerido";
  if (!quantity) errors.quantity = "El campo cantidad es requerido";
  if (!priceWithoutIGV)
    errors.priceWithoutIGV = "El campo precio sin IGV es requerido";
  if (!priceWithIGV)
    errors.priceWithIGV = "El campo precio con IGV es requerido";
  if (!subTotal) errors.subTotal = "El campo subtotal es requerido";

  return errors;
};

export const dateDocument = (form) => {
  const {
    cliente,
    ruc,
    direction,
    condition,
    oferta,
    fechaOperacion,
    fechaVencimiento,
    moneda,
  } = form;

  let errors = {};
  if (!cliente) errors.cliente = "El campo cliente es requerido";
  if (!ruc) errors.ruc = "El campo ruc es requerido";
  if (!direction) errors.direction = "El campo dirección es requerido";
  if (!condition) errors.condition = "El campo condición es requerido";
  if (!oferta) errors.oferta = "El campo oferta es requerido";
  if (!fechaOperacion) errors.fechaOperación = "El campo fecha es requerido";
  if (!fechaVencimiento)
    errors.fechaVencimiento = "El campo fecha es requerido";
  if (!moneda) errors.moneda = "El campo moneda es requerido";

  return errors;
};

export const dateContact = (form) => {
  const {
    name,
    charge,
    emailDirectory,
    phoneCodeDirectory,
    phoneNumberDirectory,
  } = form;

  let errors = {};
  if (!name) errors.name = "El campo nombre es requerido";
  if (!charge) errors.charge = "El campo cargo es requerido";
  if (!emailDirectory) errors.emailDirectory = "El campo email es requerido";
  if (!phoneCodeDirectory)
    errors.phoneCodeDirectory = "El campo código es requerido";
  if (!phoneNumberDirectory)
    errors.phoneNumberDirectory = "El campo teléfono es requerido";

  return errors;
};

export const montosFinales = (form) => {
  const { subTotal, igv, total } = form;

  let errors = {};
  if (!subTotal) errors.subTotal = "El campo es requerido";
  if (!igv) errors.igv = "El campo es requerido";
  if (!total) errors.total = "El campo es requerido";

  return errors;
};
