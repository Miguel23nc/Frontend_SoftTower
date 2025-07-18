import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({});
  const [firstInvalidPath, setFirstInvalidPath] = useState(null);

  // ✅ Modificado: ahora también valida arrays vacíos
  const isEmpty = (value) =>
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0);

  const validateRecursive = (data, path = "") => {
    if (Array.isArray(data)) {
      // ✅ Validar array vacío directamente
      if (data.length === 0) {
        if (!firstInvalidPathRef.current) {
          firstInvalidPathRef.current = path;
        }
        return true; // array vacío es inválido
      }

      const arrayErrors = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const itemError = validateRecursive(item, `${path}[${i}]`);
        arrayErrors.push(itemError);

        if (!firstInvalidPathRef.current && containsError(itemError)) {
          firstInvalidPathRef.current = `${path}[${i}]`;
        }
      }
      return arrayErrors;
    }

    if (typeof data === "object" && data !== null) {
      const objError = {};
      for (const key in data) {
        const value = data[key];
        const currentPath = path ? `${path}.${key}` : key;

        if (Array.isArray(value)) {
          objError[key] = validateRecursive(value, currentPath);
        } else if (typeof value === "object") {
          objError[key] = validateRecursive(value, currentPath);
        } else {
          const invalid = isEmpty(value);
          objError[key] = invalid;
          if (invalid && !firstInvalidPathRef.current) {
            firstInvalidPathRef.current = currentPath;
          }
        }
      }
      return objError;
    }

    const invalid = isEmpty(data);
    if (invalid && !firstInvalidPathRef.current) {
      firstInvalidPathRef.current = path;
    }
    return invalid;
  };

  const containsError = (obj) => {
    if (typeof obj === "boolean") return obj;
    if (Array.isArray(obj)) return obj.some(containsError);
    return Object.values(obj).some(containsError);
  };

  const firstInvalidPathRef = { current: null };

  const validateForm = (formData) => {
    firstInvalidPathRef.current = null;

    const validationResult = validateRecursive(formData);
    setError(validationResult);
    setFirstInvalidPath(firstInvalidPathRef.current);

    const isValid = !containsError(validationResult);

    return {
      isValid,
      errors: validationResult,
      firstInvalidPath: firstInvalidPathRef.current?.split(".")[0],
    };
  };

  return { error, validateForm, firstInvalidPath };
};

export default useValidation;
