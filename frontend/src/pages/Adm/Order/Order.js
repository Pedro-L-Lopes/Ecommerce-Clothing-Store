import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderById } from "../../../slices/orderSlice";

const Order = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user.token);
  const { order, loading, error, message } = useSelector(
    (state) => state.order
  );

  const [changeStatus, setChangeStatus] = useState("");

  useEffect(() => {
    dispatch(getOrderById(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    // Atualizar o estado changeStatus quando o pedido for carregado do Redux
    if (order) {
      setChangeStatus(order.status);
    }
  }, [order]);

  if (loading) {
    return <p>Carregando</p>;
  }

  console.log(changeStatus);

  return (
    <div>
      <div>
        <p>{order.code}</p>
        <p>{order.clientName}</p>
        <p>{order.total}</p>
        <p>{order.deliveryAddress}</p>
        <p>{order.shippingType}</p>
        <p>{order.paymentMethod}</p>
        <p>{order.status}</p>
        <p>{order.clientObservation}</p>
        <p>{order.createdAt}</p>
        <p>{order.observation}</p>
      </div>
      <div>
        <select
          name="changeStatus"
          id="changeStatus"
          value={changeStatus}
          onChange={(e) => setChangeStatus(e.target.value)}
        >
          <option value="Cancelado">Cancelado</option>
          <option value="Pagamento Pendente">Pagamento Pendente</option>
          <option value="Pagamento confirmado">Pagamento confirmado</option>
          <option value="Preparando">Preparando</option>
          <option value="A enviar">A enviar</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregue">Entregue</option>
          <option value="Devolução">Devolução</option>
        </select>
      </div>
    </div>
  );
};

export default Order;
