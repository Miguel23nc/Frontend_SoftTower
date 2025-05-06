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

export const validateSubModules = (form) => {
  const error = {};

  form?.forEach((module, index) => {
    const submodules = module.submodules?.map((sub) => sub.name);
    const hasDuplicates = submodules?.some(
      (name, i) => submodules.indexOf(name) !== i
    );

    if (hasDuplicates) {
      if (!error.submodules) error.submodules = {};
      error.submodules[
        index
      ] = `Hay submódulos repetidos en el módulo "${module.name}"`;
    }
  });

  return error;
};
