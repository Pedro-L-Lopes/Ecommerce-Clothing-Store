import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getAllClients } from "../../../slices/clientSlice";
import Sidebar from "../../../components/Sidebar/Sidebar";

const Clients = () => {
  const dispatch = useDispatch();

  const { clients, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  console.log(clients);
  console.log(error);
  return (
    <div className="bg-slate-800">
      <Sidebar />
      <div className="ml-20">
        <h1 className="text-white text-2xl font-bold p-2">Clientes</h1>
        <nav className="text-white text-xl font-bold bg-slate-700 p-2 rounded max-w-6xl">
          <ul className="flex justify-between">
            <li className="w-12 text-center">Cod</li>
            <li className="w-80 text-center">Nome</li>
            <li className="w-80 text-center">Email</li>
            <li className="w-80 text-center">Cidade</li>
            <li className="w-52 text-center">Telefone</li>
            <li className="w-52 text-center">Detalhes</li>
          </ul>
        </nav>
        <section>
          {clients &&
            clients.map((client) => (
              <div
                key={client._id}
                className="flex justify-between text-white text-lg font-bold p-3 max-w-6xl"
              >
                <p className="w-12 text-center border border-slate-700 p-2 truncate">
                  {client.code}
                </p>
                <p className="w-80 text-center border border-slate-700 p-2 truncate">
                  {client.name}
                </p>
                <p className="w-80 text-center border border-slate-700 p-2 truncate">
                  {client.email}
                </p>
                <p className="w-80 text-center border border-slate-700 p-2 truncate">
                  {client.city}-{client.uf}
                </p>
                <p className="w-52 text-center border border-slate-700 p-2 truncate">
                  {client.phoneNumber}
                </p>
                <Link
                  to={`/client/${client._id}`}
                  className="w-52 text-center border border-slate-700 p-2 truncate"
                >
                  Ver detalhes
                </Link>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Clients;

{
  /* <p className="text-white">{client.street}</p>
<p className="text-white">{client.neighborhood}</p>
<p className="text-white">{client.houseNumber}</p>
<p className="text-white">{client.cep}</p>
<p className="text-white">{client.gender}</p>
<p className="text-white">{client.createdAt}</p> */
}
