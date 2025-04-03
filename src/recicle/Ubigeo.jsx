import ubigeo_peru from "../ubigeo_peru.json"

export const getdepartamentos = () => {
  try {
    const departamentos = ubigeo_peru?.departamentos?.map(
      (departamento) => departamento.nombre
    );
    return departamentos;
  } catch (error) {
     ;
  }
};
export const getprovincias = (departamento) => {
  try {
    const provincias = ubigeo_peru?.departamentos
      ?.find((dep) => dep.nombre === departamento)
      ?.provincias.map((provincia) => provincia.nombre);
    return provincias;
  } catch (error) {
     ;
  }
};
export const getdistritos = (departamento, provincia) => {
  try {
    const distritos = ubigeo_peru.departamentos
      ?.find((dep) => dep.nombre === departamento)
      ?.provincias.find((prov) => prov.nombre === provincia)
      ?.distritos.map((distrito) => distrito);
    return distritos;
  } catch (error) {
     ;
  }
};
