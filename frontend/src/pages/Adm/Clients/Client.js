import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getClientById } from "../../../slices/clientSlice";
import Sidebar from "../../../components/Sidebar/Sidebar";

const Client = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { client, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClientById(id));
  }, [dispatch, id]);

  console.log(client);

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />
      <div className="flex gap-20 ml-20">
        <div className="text-white font-bold">
          <h1 className="text-xl">Dados do Cliente</h1>
          <ul className="text-lg mt-5">
            <li>Nome: {client.name}</li>
            <li>Idade: {client.nasc}</li>
            <li>Genero: {client.gender}</li>
            <li>Email: {client.email}</li>
            <li>Telefone: {client.phoneNumber}</li>
          </ul>
          <ul className="text-lg mt-5">
            <li>
              Rua: {client.street}, nº{client.houseNumber}
            </li>
            <li>Bairro: {client.neighborhood}</li>
            <li>
              Cidade: {client.city}-{client.uf}
            </li>
            <li>CEP: {client.cep}</li>
          </ul>
          <ul className="text-lg mt-5">
            <li>Cadastro em: {client.createdAt}</li>
          </ul>
        </div>
        <div className="text-white font-bold">
          <h1 className="text-xl">Pedidos</h1>
        </div>
      </div>
    </div>
  );
};

export default Client;
