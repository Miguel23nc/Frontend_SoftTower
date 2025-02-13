export const validateForm1 = (formData1) => {
  const { dni, name, email, password, business, phoneNumber } = formData1;
  const newErrors = {};
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!dni) newErrors.dni = "Se requiere DNI";
  if (!name) newErrors.name = "Se requiere nombre y apellido";
  if (!email) newErrors.email = "Se requiere dirección de correo electrónico";
  if (email && !regexEmail.test(email)) newErrors.email = "Email invalido";
  if (!business) newErrors.business = "Se requiere empresa";
  if (!password) newErrors.password = "Se requiere contraseña";
  if (password && password.length < 6)
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  if (!phoneNumber) newErrors.phoneNumber = "Se requiere teléfono";
  if (dni && dni?.length !== 8) newErrors.dni = "DNI debe tener 8 dígitos";
  return newErrors;
};

export const validateForm2 = (
  selectedModule,
  selectedSubModule,
  selectedPermissions
) => {
  const errors = {};
  if (!selectedModule) errors.selectedModule = "Se requiere módulo";
  if (!selectedSubModule) errors.selectedSubModule = "Se requiere submódulo";
  if (selectedPermissions?.length === 0)
    errors.selectedPermissions = "Se requiere al menos un permiso";
  return errors;
};

export const validateRevomeAdd = (formData) => {};

export const validateClient1 = (clientData) => {
  const {
    ruc,
    razonSocial,
    direction,
    phoneNumber,
    email,
    password,
    economicSector,
    condition,
  } = clientData;
  const errors = {};

  if (!ruc) errors.ruc = "Ruc es obligatorio";
  if (!razonSocial) errors.razonSocial = "Razon social es obligatorio";
  if (!direction) errors.direction = "Direccion es obligatorio";
  if (!phoneNumber) errors.phoneNumber = "Telefono es obligatorio";
  if (!email) errors.email = "Email es obligatorio";
  if (!password) errors.password = "La contraseña es obligatoria";
  if (password && password.length < 6)
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  if (!economicSector)
    errors.economicSector = "Sector economico es obligatorio";
  if (!condition) errors.condition = "Condicion es obligatorio";

  return errors;
};
export const validateClient2 = (directory) => {
  const errors = {};
  const {
    name,
    charge,
    emailDirectory,
    phoneCodeDirectory,
    phoneNumberDirectory,
  } = directory;

  if (!name) errors.name = "Name is required";
  if (!charge) errors.charge = "Charge is required";
  if (!emailDirectory) errors.emailDirectory = "Email is required";
  if (!phoneCodeDirectory) errors.phoneCodeDirectory = "Phone code is required";
  if (!phoneNumberDirectory)
    errors.phoneNumberDirectory = "Phone number is required";

  return errors;
};
