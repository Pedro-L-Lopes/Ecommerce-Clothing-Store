// ShippingSection.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTruck, BsCheckSquare } from "react-icons/bs";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import { Link, useNavigate } from "react-router-dom";

const ShippingSection = ({
  cep,
  setCep,
  handleSearchCep,
  loading,
  shippingData,
  selectedShipping,
  setSelectedShipping,
  calculateTotalPrice,
  to,
  textSize,
}) => {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  const handleContinue = () => {
    if (selectedShipping.tipo != null) {
      return navigate(to);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="flex mt-5">
      <div className="w-96 mr-20">
        <h2 className="font-bold text-xl mb-2">Frete</h2>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="cep" className="text-xs mb-1">
              CEP
            </label>
            <input
              id="cep"
              type="text"
              placeholder="CEP: 00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="p-2 border-b-2 border-black rounded bg-gray-100 opacity-70"
            />
          </div>
          <button
            onClick={handleSearchCep}
            className="text-white bg-black hover:opacity-80 border p-2 h-12 mt-4 ml-2 rounded"
          >
            Confirmar
          </button>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {shippingData && shippingData.localidade && (
              <div>
                <div>
                  <p className="font-bold text-lg mt-4">
                    {shippingData.localidade}-{shippingData.uf}
                  </p>
                </div>

                <p className="mt-2">Selecione o tipo de envio</p>
                <label
                  id="sedex"
                  className={`flex items-center justify-between ${textSize} hover:opacity-80 mt-2 p-2 rounded cursor-pointer ${
                    selectedShipping.tipo === "sedex"
                      ? "bg-green-500"
                      : "bg-black"
                  }`}
                >
                  <BsTruck size={20} className="text-white" />
                  <p className={`text-white`}>
                    Prazo: {shippingData.prazoEPreco?.[0]?.PrazoEntrega} dia(s)
                    úteis
                  </p>
                  <p className={`text-white ml-4`}>
                    {shippingData.localidade === "Governador Valadares" ? (
                      <p
                        className={`font-bold ${
                          selectedShipping.tipo === "sedex"
                            ? "text-black"
                            : "text-green-500"
                        }`}
                      >
                        Grátis
                      </p>
                    ) : (
                      <p>R$ {shippingData.prazoEPreco?.[0]?.Valor}</p>
                    )}
                  </p>
                  {selectedShipping === "sedex" ? "" : <BsCheckSquare />}
                  <input
                    type="radio"
                    name="shippingOption"
                    id="sedex"
                    className="hidden"
                    onClick={() =>
                      setSelectedShipping({
                        PrazoEntrega:
                          shippingData.prazoEPreco?.[0]?.PrazoEntrega,
                        Valor:
                          shippingData.localidade === "Governador Valadares"
                            ? 0
                            : shippingData.prazoEPreco?.[0]?.Valor,
                        localidade: shippingData.localidade,
                        uf: shippingData.uf,
                        tipo: "sedex",
                        cep: cep,
                        logradouro: shippingData.logradouro,
                        bairro: shippingData.bairro,
                      })
                    }
                  />
                </label>

                <label
                  id="pac"
                  className={`flex items-center justify-between ${to} hover:opacity-80 mt-2 p-2 rounded cursor-pointer ${
                    selectedShipping.tipo === "pac"
                      ? "bg-green-500"
                      : "bg-black"
                  }`}
                >
                  <BsTruck size={20} className="text-white" />
                  <p className={`text-white`}>
                    Prazo: {shippingData.prazoEPreco?.[1]?.PrazoEntrega} dia(s)
                    úteis
                  </p>
                  <p className={`text-white ml-4`}>
                    {shippingData.localidade === "Governador Valadares" ? (
                      <p
                        className={`font-bold ${
                          selectedShipping.tipo === "pac"
                            ? "text-black"
                            : "text-green-500"
                        }`}
                      >
                        Grátis
                      </p>
                    ) : (
                      <p>R$ {shippingData.prazoEPreco?.[1]?.Valor}</p>
                    )}
                  </p>
                  {selectedShipping === "pac" ? "" : <BsCheckSquare />}
                  <input
                    type="radio"
                    name="shippingOption"
                    id="pac"
                    className="hidden"
                    onClick={() =>
                      setSelectedShipping({
                        PrazoEntrega:
                          shippingData.prazoEPreco?.[1]?.PrazoEntrega,
                        Valor:
                          shippingData.localidade === "Governador Valadares"
                            ? 0
                            : shippingData.prazoEPreco?.[1]?.Valor,
                        localidade: shippingData.localidade,
                        uf: shippingData.uf,
                        tipo: "pac",
                        cep: cep,
                        logradouro: shippingData.logradouro,
                        bairro: shippingData.bairro,
                      })
                    }
                  />
                </label>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-96">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">Resumo do pedido</h2>
          <div className="flex justify-between mt-2 border-b">
            <p className="">Subtotal: </p>
            <p>{formatPrice(calculateTotalPrice())}</p>
          </div>
          <div className="flex justify-between mt-2 border-b">
            <p>Frete:</p>
            {shippingData.localidade === "Governador Valadares" ? (
              <p className="text-bold text-green-500">Grátis</p>
            ) : (
              <p>{formatPrice(selectedShipping && selectedShipping.Valor)}</p>
            )}
          </div>
          <div className="flex justify-between mt-2 border-b">
            <p className="">Total do pedido: </p>
            <p>
              {formatPrice(
                calculateTotalPrice() +
                  (selectedShipping && selectedShipping.Valor
                    ? parseFloat(selectedShipping.Valor.replace(",", "."))
                    : 0)
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="text-white bg-black hover:opacity-80 w-44 h-12 p-2 m-2 mt-5 rounded-md"
          >
            Continuar
          </button>
        </div>
        {showMessage && (
          <p className="text-white text-center bg-red-500 rounded animate-pulse">
            Selecione o tipo de envio antes de continuar.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShippingSection;
