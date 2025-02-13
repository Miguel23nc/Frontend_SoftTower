export const validateVacio = (form) => {
  const newError = {};
  form.forEach((obj) => {
    if (Object.keys(obj).length === 0) {
      newError.message = "No debe ir un campo vacio";
    }
  });
  return newError;
};
