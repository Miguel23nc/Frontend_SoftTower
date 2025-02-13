import { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export const axiosOptions = () => {
  const [modules, setModules] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const modulesResponse = await axios.get("/getModules");
        const permissionsResponse = await axios.get("/getPermissions");
        const submodulesResponse = await axios.get("/getSubmodules");

        setModules(modulesResponse.data);
        setPermissions(permissionsResponse.data);
        setSubmodules(submodulesResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Error fetching options");
      }
    };

    fetchOptions();
  }, []);

  return { modules, submodules, permissions, error };
};
