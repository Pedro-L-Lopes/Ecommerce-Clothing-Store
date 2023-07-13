import { useEffect } from "react";

const DeleteConfirmation = ({ title, close, remove }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-center">{title}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded mr-2"
            onClick={remove}
          >
            Excluir
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            onClick={close}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
