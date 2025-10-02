import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({ message, type = "info", duration = 4000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 50; // Atualiza a barra de progresso
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";

  return (
    <div className="fixed bottom-5 right-5 w-80 rounded-[5px] shadow-lg overflow-hidden bg-white animate-slide-in">
      <div className={`flex items-center justify-between !px-4 !py-3 ${bgColor} text-white`}>
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-1 bg-gray-200">
        <div
          className={`h-1 ${bgColor}`}
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  );
};

export default Alert;
