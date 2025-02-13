import axios from "axios";

const imageCloudinary = async (logo) => {
  const formData = new FormData();
  formData.append("file", logo);
  formData.append("upload_preset", "TOWERANDTOWER");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/ddci9jvnh/auto/upload`,
      formData
    );
    const url = response.data.secure_url;
    return url;
  } catch (error) {
    console.log("Error al subir logo", error);
    throw new Error("Error al subir logo");
  }
};

export default imageCloudinary;
