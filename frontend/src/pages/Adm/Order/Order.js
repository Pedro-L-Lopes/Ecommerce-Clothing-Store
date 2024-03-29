// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { getOrderById, updateOrder, reset } from "../../../slices/orderSlice";
import { getProduct } from "../../../slices/productSlice";

// Components and functions
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReviseProductOrder from "../../../components/Revise/ReviseProductOrder";
import Message from "../../../components/Message/Message";
import { formattedDate } from "../../../components/AnotherComponentsAndFunctions/formattedDate";
import { formatPrice } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const Order = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user.token);
  const { order, loading, error, message } = useSelector(
    (state) => state.order
  );

  const [changeStatus, setChangeStatus] = useState(order.status ?? "");
  const [observation, setObservation] = useState("");
  const [productData, setProductData] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoadingUpdate(true);

    const updatedOrder = {
      status: changeStatus,
      observation,
      id: order._id,
    };

    try {
      await dispatch(updateOrder(updatedOrder));
      console.log("Pedido atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar o pedido:", error);
    }

    setLoadingUpdate(false);

    setTimeout(() => {
      dispatch(reset());
    }, 2000);
  };

  if (loading) {
    return <p>Carregando</p>;
  }

  console.log(changeStatus);

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />
      <div className="ml-20 flex gap-2">
        <div className="flex">
          <div className="font-bold">
            <h1 className="text-white text-2xl p-2">Dados</h1>

            <div>
              <Link to={`/client/${order.client}`}>
                <div className="flex text-xl bg-white  rounded mt-2">
                  <p className="flex items-center w-32 border-r-2 p-2">Nome</p>
                  <p className="flex items-center p-2">{order.clientName}</p>
                </div>
              </Link>

              {order.clientObservation ? (
                <div className="flex text-xl bg-white  rounded mt-2">
                  <p className="flex items-center w-32 border-r-2 p-2">
                    Observação do cliente
                  </p>
                  <textarea cols="40" rows="2" className="p-2">
                    {order.clientObservation}
                  </textarea>
                </div>
              ) : (
                ""
              )}

              <div className="flex text-xl bg-white rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">
                  Endereço
                </p>
                <p className="flex items-center p-2">{order.deliveryAddress}</p>
              </div>

              <div className="flex text-xl bg-white rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">
                  Tipo de envio
                </p>
                <p className="flex items-center p-2">{order.shippingType}</p>
              </div>

              <div className="flex flex-col text-xl bg-white rounded mt-2">
                <div className="flex">
                  <p className="flex items-center w-32 border-r-2 border-b p-2">
                    Pedido
                  </p>
                  <p className="flex items-center border-b p-2">
                    {formatPrice(order.total)}
                  </p>
                </div>

                <div className="flex">
                  <p className="flex items-center w-32 border-r-2 border-b  p-2">
                    Frete
                  </p>
                  <p className="flex items-center border-b p-2">
                    R$ {order.shippingCost}
                  </p>
                </div>

                <div className="flex">
                  <p className="flex items-center w-32 border-r-2 p-2">Total</p>
                  <p className="flex items-center  border-b p-2">
                    {formatPrice(order.total + parseInt(order.shippingCost))}
                  </p>
                </div>
              </div>
              <div className="flex text-xl bg-white  rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">Data/hr</p>
                <p className="flex items-center p-2">
                  {formattedDate(order.createdAt)}h
                </p>
              </div>

              <div className="flex text-xl bg-white  rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">
                  Método de pagamento
                </p>
                <p className="flex items-center p-2">{order.paymentMethod}</p>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="flex text-xl bg-white  rounded mt-2">
                  <p className="flex items-center w-32 border-r-2 p-2">
                    Status
                  </p>
                  <select
                    name="changeStatus"
                    id="changeStatus"
                    value={changeStatus}
                    onChange={(e) => setChangeStatus(e.target.value)}
                    className="flex items-center p-2 rounded"
                  >
                    <option value="Cancelado">Cancelado</option>
                    <option value="Pagamento Pendente">
                      Pagamento Pendente
                    </option>
                    <option value="Pagamento confirmado">
                      Pagamento confirmado
                    </option>
                    <option value="Preparando">Preparando</option>
                    <option value="A enviar">A enviar</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Devolução">Devolução</option>
                  </select>
                  <textarea
                    name="observation"
                    cols="30"
                    rows="2"
                    placeholder="Digite aqui a observação"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    className="flex border-l"
                  ></textarea>
                </div>
                <button
                  className="text-center text-lg bg-white mt-2 p-2 rounded"
                  type="submit"
                  disabled={loadingUpdate}
                >
                  {loadingUpdate ? "Atualizando..." : "Atualizar"}
                </button>
              </form>
            </div>
          </div>

          <section className="">
            <div className="flex"></div>
          </section>
        </div>
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
      </div>
      {message && <Message msg={message} type={"success"} />}
    </div>
  );
};

export default Order;
