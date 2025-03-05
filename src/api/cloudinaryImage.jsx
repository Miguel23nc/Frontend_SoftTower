import axios from "axios";

const imageCloudinary = async (imagen) => {
  const formData = new FormData();
  formData.append("file", imagen);
  formData.append("upload_preset", "TOWER_IMAGES");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/ddci9jvnh/auto/upload`,
      formData
    );
    const url = response.data;
    return url;
  } catch (error) {
    console.log("Error al subir imagen", error);
    throw new Error("Error al subir imagen");
  }
};

export default imageCloudinary;
