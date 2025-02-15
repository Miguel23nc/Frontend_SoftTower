export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AsistenciasDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Crear tabla de asistencias si no existe
      if (!db.objectStoreNames.contains("asistencias")) {
        db.createObjectStore("asistencias", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      // Crear tabla de colaboradores si no existe
      if (!db.objectStoreNames.contains("colaboradores")) {
        db.createObjectStore("colaboradores", { keyPath: "documentNumber" });
      }

      // Crear tabla de allAsistenciasColaboradores si no existe
      if (!db.objectStoreNames.contains("allAsistenciasColaboradores")) {
        db.createObjectStore("allAsistenciasColaboradores", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// 📌 Guardar una asistencia offline
export const saveAsistenciaOffline = async (data) => {
  try {
    const db = await openDB();
    const tx = db.transaction("asistencias", "readwrite");
    const store = tx.objectStore("asistencias");
    await store.add(data);
  } catch (error) {
    console.error("Error al guardar asistencia offline:", error);
  }
};

// 📌 Obtener todas las asistencias guardadas offline
export const getAllAsistencias = async () => {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("asistencias", "readonly");
    const store = tx.objectStore("asistencias");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

// 📌 Limpiar asistencias sincronizadas
export const clearAsistencias = async () => {
  const db = await openDB();
  const tx = db.transaction("asistencias", "readwrite");
  tx.objectStore("asistencias").clear();
};

// 📌 Obtener asistencias pendientes de sincronizar
export const getOfflineAsistencias = async () => {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("asistencias", "readonly");
    const store = tx.objectStore("asistencias");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve([]);
  });
};

// 🔹 COLABORADORES 🔹

// 📌 Guardar colaboradores offline
export const saveColaboradoresOffline = async (colaboradores) => {
  try {
    const db = await openDB();
    const tx = db.transaction("colaboradores", "readwrite");
    const store = tx.objectStore("colaboradores");
    await Promise.all(
      colaboradores.map((colaborador) => store.put(colaborador))
    );
  } catch (error) {
    console.error("Error al guardar colaboradores offline:", error);
  }
};

// 📌 Obtener todos los colaboradores guardados offline
export const getColaboradoresOffline = async () => {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("colaboradores", "readonly");
    const store = tx.objectStore("colaboradores");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

// 📌 Limpiar colaboradores (opcional, si quieres borrar todo)
export const clearColaboradores = async () => {
  const db = await openDB();
  const tx = db.transaction("colaboradores", "readwrite");
  tx.objectStore("colaboradores").clear();
};

// 🔹 allAsistenciasColaboradores 🔹

// 📌 Guardar allAsistenciasColaboradores offline
export const saveAllAsistenciasColaboradoresOffline = async (data) => {
  try {
    const db = await openDB();
    const tx = db.transaction("allAsistenciasColaboradores", "readwrite");
    const store = tx.objectStore("allAsistenciasColaboradores");
    await store.add(data);
  } catch (error) {
    console.error(
      "Error al guardar allAsistenciasColaboradores offline:",
      error
    );
  }
};

// 📌 Obtener allAsistenciasColaboradores guardadas offline
export const getAllAsistenciasColaboradoresOffline = async () => {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("allAsistenciasColaboradores", "readonly");
    const store = tx.objectStore("allAsistenciasColaboradores");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

// 📌 Limpiar allAsistenciasColaboradores
export const clearAllAsistenciasColaboradores = async () => {
  const db = await openDB();
  const tx = db.transaction("allAsistenciasColaboradores", "readwrite");
  tx.objectStore("allAsistenciasColaboradores").clear();
};
