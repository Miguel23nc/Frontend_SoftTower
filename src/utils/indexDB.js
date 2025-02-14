export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AsistenciasDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("asistencias")) {
        db.createObjectStore("asistencias", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveAsistenciaOffline = async (data) => {
  try {
    const db = await openDB("asistenciasDB", 1);
    const tx = db.transaction("asistencias", "readwrite");
    const store = tx.objectStore("asistencias");
    await store.add(data);
  } catch (error) {
    console.error("Error al guardar asistencia offline:", error);
  }
};

export const getAllAsistencias = async () => {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("asistencias", "readonly");
    const store = tx.objectStore("asistencias");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

export const clearAsistencias = async () => {
  const db = await openDB();
  const tx = db.transaction("asistencias", "readwrite");
  tx.objectStore("asistencias").clear();
};

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
  