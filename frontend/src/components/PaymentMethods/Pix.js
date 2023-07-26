import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

import qrCode from "../../images/qrcode.png";

const Pix = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-xl font-bold">
        Escaneie o QrCode ou copie a chave pix
      </h1>
      <div>
        <img src={qrCode} alt="qr code de pagamento" className="w-80 h-80" />
      </div>
      <div className="flex items-center border border-black rounded w-60 mt-2">
        <input
          type="text"
          value={text}
          readOnly
          className="flex-1 p-2 outline-none bg-transparent"
        />
        <button
          onClick={copyToClipboard}
          className="p-2 bg-transparent hover:bg-gray-200 focus:bg-gray-200 transition-all"
        >
          <MdContentCopy size={20} />
        </button>
        {isCopied && <span className="ml-2 text-green-600">Copiado!</span>}
      </div>
    </div>
  );
};

export default Pix;
