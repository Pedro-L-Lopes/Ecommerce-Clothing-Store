import React from "react";
import { Link } from "react-router-dom";

import thanks from "../../../images/8459746.jpg";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const Thanks = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center font-bold mt-14">
        <img src={thanks} alt="Obrigado" className="w-96" />
        <h1 className="text-4xl">Obrigado por comprar conosco</h1>
        <div className="text-xl mt-4 p-2 border">
          <p>
            Após a confirmação do pagamento seu Pedido será enviado dentro de
            24hrs.
          </p>
          <p>
            Seu pedido ficará reservado durante 24hrs, caso não haja a
            confirmação do pagamento dentro deste periodo ele será cancelado
            automaticamente.
          </p>
        </div>
        <p className="text-xl mt-5">
          Qualquer duvida entre em contato pelo whatsapp
        </p>
        <div className="flex">
          <button className="text-white w-24 m-2 p-2 bg-green-500 hover:bg-green-400 rounded">
            Whastapp
          </button>
          <Link to="/">
            <button className="text-white w-24 m-2 p-2 bg-black hover:opacity-90 rounded">
              Home
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thanks;
