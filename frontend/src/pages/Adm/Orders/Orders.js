import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "../../../slices/orderSlice";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { formattedDate } from "../../../components/AnotherComponentsAndFunctions/formattedDate";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Orders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const { orders, order, loading, error, message } = useSelector(
    (state) => state.order
  );
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pagamento pendente");

  useEffect(() => {
    dispatch(getAllOrders(token));
  }, [dispatch, token]);

  useEffect(() => {
    const filtered = orders.filter((order) => order.status === selectedStatus);
    setFilteredOrders(filtered);
  }, [orders, selectedStatus]);

  const isButtonSelected = (status) => {
    return status === selectedStatus ? "bg-slate-800 transition-all" : "";
  };

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />
      <main className="ml-16 p-2">
        <h2 className="text-white text-2xl text-center font-bold p-2">
          Pedidos
        </h2>

        <div className="flex justify-center gap-10 text-white font-bold bg-slate-700 rounded">
          <button
            onClick={() => setSelectedStatus("Cancelado")}
            className={`p-2 ${isButtonSelected("Cancelado")}`}
          >
            Cancelado
          </button>
          <button
            onClick={() => setSelectedStatus("Pagamento pendente")}
            className={`p-2 ${isButtonSelected("Pagamento pendente")}`}
          >
            Pagamento Pendente
          </button>
          <button
            onClick={() => setSelectedStatus("Pagamento confirmado")}
            className={`p-2 ${isButtonSelected("Pagamento confirmado")}`}
          >
            Pagamento confirmado
          </button>
          <button
            onClick={() => setSelectedStatus("Preparando")}
            className={`p-2 ${isButtonSelected("Preparando")}`}
          >
            Preparando
          </button>
          <button
            onClick={() => setSelectedStatus("A enviar")}
            className={`p-2 ${isButtonSelected("A enviar")}`}
          >
            A enviar
          </button>
          <button
            onClick={() => setSelectedStatus("Enviado")}
            className={`p-2 ${isButtonSelected("Enviado")}`}
          >
            Enviado
          </button>
          <button
            onClick={() => setSelectedStatus("Entregue")}
            className={`p-2 ${isButtonSelected("Entregue")}`}
          >
            Entregue
          </button>
          <button
            onClick={() => setSelectedStatus("Devolução")}
            className={`p-2 ${isButtonSelected("Devolução")}`}
          >
            Devolução
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-2xl text-white font-bold mt-10">
            Não há pedidos com o status selecionado.
          </p>
        ) : (
          <div>
            {filteredOrders.map((order) => (
              <div
                className="flex items-center justify-center gap-10 h-20 text-white p-2 bg-slate-700 mt-2 rounded"
                key={order._id}
              >
                <div className="flex items-center justify-center font-bold w-10">
                  <p>{order.code}</p>
                </div>
                <div className="w-96 p-2 font-bold">
                  <p>{order.clientName}</p>
                  <p>{order.deliveryAddress}</p>
                </div>
                <div className="w-40 p-2 font-bold">
                  <p>Total: R${order.total.toFixed(2)}</p>
                  <p>Frete: R${order.shippingCost}</p>
                </div>
                <div className="w-40 p-2 text-center font-bold">
                  <p>{formattedDate(order.createdAt)}</p>
                  <p>
                    {order.createdAt != order.updatedAt
                      ? formattedDate(order.updatedAt)
                      : ""}
                  </p>
                </div>

                <Link to={`/orders/${order._id}`}>
                  <div className="w-28 p-2 text-center font-bold">
                    <p>Ver detalhes</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
