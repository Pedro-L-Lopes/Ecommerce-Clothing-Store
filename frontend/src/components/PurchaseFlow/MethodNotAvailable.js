import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";

const MethodNotAvailable = ({ setSorry }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-black p-2 rounded m-2 text-center shadow-md">
        <p className="text-white text-xl font-bold">
          Desculpe, este metodo de pagamento não está disponível no momento, por
          favor tente outro.
        </p>
        <p className="flex justify-center items-center gap-2 text-white text-xl font-bold">
          Qualquer duvida entre em contato (33) 991000000
        </p>
        <button
          className="bg-white font-bold m-2 p-2 rounded"
          onClick={() => setSorry(false)}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default MethodNotAvailable;
