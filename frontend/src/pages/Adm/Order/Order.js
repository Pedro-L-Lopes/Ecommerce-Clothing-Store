// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { getOrderById } from "../../../slices/orderSlice";
import { getProduct } from "../../../slices/productSlice";

// Components and functions
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReviseProductOrder from "../../../components/Revise/ReviseProductOrder";
import { formattedDate } from "../../../components/AnotherComponentsAndFunctions/formattedDate";
import { formatPrice } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

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

              <div className="flex text-xl bg-white  rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">
                  Observação
                </p>
                <textarea cols="40" rows="3" className="p-2">
                  {order.clientObservation}
                </textarea>
              </div>

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

              <div className="flex text-xl bg-white  rounded mt-2">
                <p className="flex items-center w-32 border-r-2 p-2">Status</p>
                <select
                  name="changeStatus"
                  id="changeStatus"
                  value={changeStatus}
                  onChange={(e) => setChangeStatus(e.target.value)}
                  className="flex items-center p-2 rounded"
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
    </div>
  );
};

export default Order;
