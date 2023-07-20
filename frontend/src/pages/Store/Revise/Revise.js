import { useState } from "react";

const Revise = () => {
  const cartData = JSON.parse(localStorage.getItem("cartData"));

  console.log(cartData);

  return (
    <div>
      <div>
        <h1>Detalhes da sua compra</h1>
        <p>{cartData.PrazoEntrega} dia(s) uteis</p>
        <p>{cartData.Valor}</p>
        <p>Tipo de envio: Correios {cartData.tipo}</p>
      </div>
    </div>
  );
};

export default Revise;
