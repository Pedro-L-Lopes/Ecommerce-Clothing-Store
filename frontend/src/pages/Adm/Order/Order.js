// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getOrderById } from "../../../slices/orderSlice";
import { getProduct } from "../../../slices/productSlice";

// Components and functions
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReviseProductOrder from "../../../components/Revise/ReviseProductOrder";
import { formattedDate } from "../../../components/AnotherComponentsAndFunctions/formattedDate";

const Order = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user.token);
  const { order, loading, error, message } = useSelector(
    (state) => state.order
  );

  const [changeStatus, setChangeStatus] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    dispatch(getOrderById(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (order && order.products) {
      const allProducts = order.products;

      allProducts.forEach((product) => {
        dispatch(getProduct(product.productId))
          .then((response) => {
            setProductData((prevProductData) => ({
              ...prevProductData,
              [product.productId]: response.payload,
            }));
          })
          .catch((error) => {
            console.log("Erro ao obter os dados do produto:", error);
          });
      });
    }
  }, [order, dispatch]);

  useEffect(() => {
    if (order) {
      setChangeStatus(order.status);
    }
  }, [order]);

  if (loading) {
    return <p>Carregando</p>;
  }

  console.log(changeStatus);

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />

      <div className="ml-20 flex gap-2">
        <section>
          <div>
            <h1 className="text-white text-2xl font-bold p-2 ml-10">
              Produtos
            </h1>
          </div>
          <section>
            {order &&
              order.products &&
              order.products.map((product) => (
                <div key={product.productId}>
                  {productData && productData[product.productId] && (
                    <ReviseProductOrder
                      key={product.productId}
                      product={product}
                    />
                  )}
                </div>
              ))}
          </section>
        </section>
        <div className="flex">
          <div className="text-white font-bold">
            <h1 className="text-2xl p-2">Dados</h1>
            <section className="text-xl mt-1 border-b">
              <p>Nome: {order.clientName}</p>
              {order.observation != "" ? (
                <p>Observação: {order.clientObservation}</p>
              ) : (
                <p>Observação: Vazio</p>
              )}
            </section>
            <section className="text-xl mt-2 border-b">
              <p>Endereço: {order.deliveryAddress}</p>
              <p>Tipo de envio: {order.shippingType}</p>
            </section>
            <section className="text-xl mt-2 border-b">
              <p>Pedido: {order.total}</p>
              <p>Frete: {order.shippingCost}</p>
              <p>Total: {order.total + parseInt(order.shippingCost)}</p>
            </section>

            <p>Data: {formattedDate(order.createdAt)}</p>
          </div>

          <section className="">
            <p className="text-white text-xl font-bold mt-2">
              Método de pagamento: {order.paymentMethod}
            </p>
            <div className="flex">
              <label
                htmlFor="changeStatus"
                className="text-white text-xl mr-2 font-bold"
              >
                Status
              </label>
              <select
                name="changeStatus"
                id="changeStatus"
                value={changeStatus}
                onChange={(e) => setChangeStatus(e.target.value)}
                className="rounded"
              >
                <option value="Cancelado">Cancelado</option>
                <option value="Pagamento Pendente">Pagamento Pendente</option>
                <option value="Pagamento confirmado">
                  Pagamento confirmado
                </option>
                <option value="Preparando">Preparando</option>
                <option value="A enviar">A enviar</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregue">Entregue</option>
                <option value="Devolução">Devolução</option>
              </select>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Order;
