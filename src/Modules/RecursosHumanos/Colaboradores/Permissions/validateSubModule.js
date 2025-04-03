export const validateSubModules = (form) => {
  //BUSCA SI HAY SUBMODULOS REPETIDOS
  const error = {};
  const submodule = form?.map((module) => module.submodule?.name);
  const comparation = submodule?.some(
    (module, index) => submodule?.indexOf(module) !== index
  );
  if (comparation) error.submodule = "No puede haber submodulos repetidos";
  return error;
};
export const validateModules = (modules1, modules2) => {

  const error = {};
  const modulesId = modules1.map((module) => module._id);
  const modulesId2 = modules2.map((module) => module._id);
  const comparation1 = modulesId.filter(
    (module) => !modulesId2.includes(module)
  );
  const comparation2 = modulesId2.filter(
    (module) => !modulesId.includes(module)
  );

  if (comparation1.length > 0 || comparation2.length > 0)
    error.modules = "Hay un nuevo Cambio en Modules";
  return error;
};
