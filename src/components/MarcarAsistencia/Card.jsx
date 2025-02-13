import { memo, useEffect, useState } from "react";
const LoadingSpinner = () => (
  <div className="spinner">
    <style>
      {`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #000;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

const Card = memo(({ titulo, imagen, onclick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imagen;
    img.onload = () => setLoaded(true);
  }, [imagen]);

  return (
    <div
      className="flex text-center 
     flex-col justify-center hover:scale-110 scale-100 transition-all items-center sm:w-3/12 m-5 xl:w-2/12"
    >
      <button onClick={onclick}>
        {!loaded && <LoadingSpinner />}
        <img
          src={imagen || ""}
          alt={titulo || ""}
          loading="lazy"
          style={{ display: loaded ? "block" : "none" }}
        />
      </button>
    </div>
  );
});

export default Card;
