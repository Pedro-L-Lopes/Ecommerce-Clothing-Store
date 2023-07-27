import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { formattedDate } from "../../../components/AnotherComponentsAndFunctions/formattedDate";

import Sidebar from "../../../components/Sidebar/Sidebar";

import { getClientById } from "../../../slices/clientSlice";
import { getClientOrders } from "../../../slices/orderSlice";
import { DataFormClient } from "../../../components/AnotherComponentsAndFunctions/DataFormClient";

const Client = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { client, loading, error } = useSelector((state) => state.client);
  const {
    orders,
    loading: loadingOrder,
    error: errorOrder,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getClientById(id));
    dispatch(getClientOrders(id));
  }, [dispatch, id]);

  console.log(client);
  console.log(orders);

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />
      <div className="flex flex-col justify-center ml-20">
        <DataFormClient client={client} />
        <div className="text-white font-bold">
          <h1 className="text-xl -mt-28">Pedidos</h1>
          {orders &&
            orders.map((order) => (
              <Link to={`/orders/${order._id}`}>
                <div className="flex items-center gap-10 font-bold bg-slate-700 max-w-xl p-2 rounded mt-2">
                  <p className="ml-10">Data: {formattedDate(order.createdAt)}</p>
                  <p>Total de items: {order.products.length}</p>
                  <p>Valor: {order.total}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
