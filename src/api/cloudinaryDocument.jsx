import axios from "axios";

const documentoCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TOWER_DOCUMENTS");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddci9jvnh/raw/upload",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error en la subida:", error);
    throw new Error("Error al subir el documento");
  }
};

export default documentoCloudinary;
