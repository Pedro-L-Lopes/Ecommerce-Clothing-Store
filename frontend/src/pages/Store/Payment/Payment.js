import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClientById } from "../../../slices/clientSlice";
import { useParams } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { client, error, loading } = useSelector((state) => state.client);

  console.log(client);

  useEffect(() => {
    dispatch(getClientById(id));
  }, [dispatch, id]);

  console.log(client);

  return (
    <div>
      {error ? (
        <p>Ocorreu um erro ao carregar os dados do cliente.</p>
      ) : client ? (
        <>
          <h1>Olá {client.name}</h1>
          <p>{client.email}</p>
          <p>{client._id}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Payment;
