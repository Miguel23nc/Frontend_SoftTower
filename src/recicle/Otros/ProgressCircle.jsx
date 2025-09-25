import { useEffect, useState, useRef } from "react";

const DEFAULT_COLORS = [
  { color: "#E0F7FA", stop: 0 },
  { color: "#4CAF50", stop: 20 },
  { color: "#FFEB3B", stop: 40 },
  { color: "#7B1FA2", stop: 65 },
  { color: "#D32F2F", stop: 100 },
];

const ProgressCircle = ({
  percentage,
  size = 240,
  colors = DEFAULT_COLORS,
  onEditChange,
}) => {
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!isEditing) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start > percentage) {
          clearInterval(interval);
        } else {
          setProgress(start);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [percentage, isEditing]);

  const handleMouseDown = (e) => {
    if (onEditChange) {
      setIsEditing(true);
      e.preventDefault();
      handleMouseMove(e);
    }
  };

  const handleMouseMove = (e) => {
    if (!isEditing || !circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    let newPercentage = ((angle * 180) / Math.PI + 90) / 3.6;

    if (newPercentage < 0) {
      newPercentage += 100;
    }

    const finalPercentage = Math.min(
      100,
      Math.max(0, Math.round(newPercentage))
    );

    setProgress(finalPercentage);
    onEditChange(finalPercentage);
  };

  const handleMouseUp = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isEditing]);

  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const rotationAngle = (progress / 100) * 360;
  const gradientStops = colors.map((c) => `${c.color} ${c.stop}%`).join(", ");

  return (
    <div
      ref={circleRef}
      className="relative flex justify-center items-center"
      style={{ width: size, height: size }}
    >
      {/* Fondo con gradiente circular */}
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradientStops})`,
        }}
      ></div>

      {/* Círculo que TAPA */}
      <div
        className="absolute rounded-full shadow-inner"
        style={{
          width: size + 2,
          height: size + 2,
          background: `conic-gradient(transparent 0% ${progress}%, white ${progress}% 100%)`,
        }}
      ></div>

      {/* Nuevo contenedor para el puntero */}
      <div
        className="absolute z-20"
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          transform: `rotate(${rotationAngle}deg)`,
        }}
      >
        {/* Puntero centrado en el anillo */}
        <div
          className="absolute rounded-full flex justify-center items-center  border p-1 border-gray-400 bg-white shadow-lg transition-all duration-100"
          style={{
            width: 40,
            height: 40,
            left: "50%",
            top: 15, // Posiciona en la parte superior del círculo
            transform: "translate(-50%, -50%)", // Centra el puntero en su posición
            cursor: isEditing ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className=" bg-gradient-to-br from-sky-600 to-teal-300 rounded-full w-[80%] h-[80%] "></div>
        </div>
      </div>

      {/* Círculo interior con el porcentaje */}
      <div
        className="absolute bg-white z-10 rounded-full flex items-center justify-center shadow-md"
        style={{ width: size - 50, height: size - 50 }}
      >
        <span className="text-3xl font-bold">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
