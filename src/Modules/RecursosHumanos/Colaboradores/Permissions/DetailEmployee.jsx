import { useEffect } from "react";

const DetailEmployee = ({ setShowDetail, selected }) => {
  const { _id } = selected;

  useEffect(() => {
    if (_id) {
      window.open(`/profile?id=${_id}`, '_blank');
      setShowDetail(false); // Volver a false después de redirigir
    }
  }, [_id, setShowDetail]);

  return null; // No necesitamos renderizar nada
};

export default DetailEmployee;
