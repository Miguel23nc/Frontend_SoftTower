import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Profile from "./Profile";
import axios from "../../api/axios";

const OtherProfiles = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Obtener el ID de la URL
  console.log("id", id);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/employee/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser(); // Solo ejecutar si hay un ID en la URL
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Error al cargar el perfil.</p>;

  return <Profile user={user} />;
};

export default OtherProfiles;
