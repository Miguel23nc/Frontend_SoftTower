import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import useSendMessage from "../../../recicle/senMessage";

const QRCodeScanner = ({ onScanResult, onClose }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sendMessage = useSendMessage();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      sendMessage(err.message, "Error");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const video = videoRef.current;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.scale(-1, 1); // Invierte horizontalmente
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
        if (qrCode) {
          onScanResult(qrCode.data);
          stopCamera();
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      stopCamera();
      sendMessage("No se pudo escanear el código", "Error");
      onClose(); // Cierra el escáner automáticamente
    }, 10000); // 10 segundos

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center text-white z-50">
      <button
        className="absolute z-50 top-4 right-4 bg-red-600 px-4 py-2 rounded"
        onClick={onClose}
      >
        Cerrar
      </button>
      {loading && <div className="fixed ">Cargando cámara...</div>}
      <video
        ref={videoRef}
        className="w-full h-full"
        onPlay={() => setLoading(false)}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QRCodeScanner;
