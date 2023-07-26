import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getClientById } from "../../../slices/clientSlice";
import { createOrder } from "../../../slices/orderSlice";

import { BsCreditCard2Front } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import { MdPix } from "react-icons/md";

import ReviseProducts from "../../../components/Revise/ReviseProducts";
import ReviseData from "../../../components/Revise/ReviseData";
import Pix from "../../../components/PaymentMethods/Pix";
import MethodNotAvailable from "../../../components/PurchaseFlow/MethodNotAvailable";
import Footer from "../../../components/Footer/Footer";
import { formatPrice } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import Message from "../../../components/Message/Message";

const Payment = () => {
  const { id } = useParams();

  const pixRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = JSON.parse(localStorage.getItem("cartData"));

  if (cartData.PrazoEntrega === null) {
    navigate("/cart");
  }

  const { order, loading, error, message, success } = useSelector(
    (state) => state.order
  );
  const cart = useSelector((state) => state.cart);
  const { client } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClientById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      navigate("/thanks");
    }
  }, [success]);

  const [sorry, setSorry] = useState(false);
  const [products, setProducts] = useState([]);
  const [clientObservation, setClientObservation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingType, setShippingType] = useState(cartData.tipo);
  const [shippingCost, setShippingCost] = useState(
    cartData ? cartData.Valor : ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pixOpened, setPixOpened] = useState(false);

  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      setProducts(cart);
    }
  }, [cart]);

  useEffect(() => {
    if (client) {
      const address = `${client.street}, ${client.houseNumber}, ${client.neighborhood}, ${client.city}-${client.uf}, ${client.cep}`;
      setDeliveryAddress(address);
    }
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const shippingTypeUpperCase = shippingType.toUpperCase();

    const orderData = {
      clientId: id,
      products: products.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
        size: product.selectedSize,
        value: product.price,
        code: product.code,
      })),
      clientName: client.name,
      deliveryAddress,
      shippingType: shippingTypeUpperCase,
      shippingCost,
      paymentMethod,
      clientObservation,
    };

    dispatch(createOrder(orderData));
  };

  const scrollToPix = () => {
    if (pixRef.current) {
      pixRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (pixOpened) {
      scrollToPix();
    }
  }, [pixOpened]);

  const calculateTotalPrice = () => {
    return cart.reduce((totalPrice, product) => {
      const productPrice = product.onSale ? product.salePrice : product.price;
      const productAndQuantity = productPrice * product.quantity;
      return totalPrice + productAndQuantity;
    }, 0);
  };

  return (
    <div className="mt-10 flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="flex justify-center gap-2">
          <div className="flex flex-col justify-center items-center border-r">
            <h1 className="text-4xl font-bold">Pedido</h1>
            {cart.length === 0 ? (
              <p>Não há produtos</p>
            ) : (
              <>
                {cart.map((product) => (
                  <ReviseProducts
                    key={product._id}
                    product={product}
                    calculateTotalPrice={calculateTotalPrice}
                  />
                ))}
              </>
            )}
          </div>

          <div className="border-r p-2">
            <ReviseData
              client={client}
              setClientObservation={setClientObservation}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center mt-2 border-b">
              <h2 className="text-xl font-bold mr-4">Subtotal</h2>
              <p>{formatPrice(calculateTotalPrice())}</p>
            </div>
            <div className="flex justify-between items-center mt-2 border-b">
              <h2 className="text-xl font-bold mr-4">Frete</h2>
              <p>{formatPrice(parseFloat(cartData.Valor))}</p>
            </div>
            <div className="flex justify-between items-center mt-2 border-b">
              <h2 className="text-xl font-bold mr-4">Total do pedido</h2>
              <p>
                {formatPrice(
                  calculateTotalPrice() +
                    (cartData && cartData.Valor
                      ? parseFloat(cartData.Valor.replace(",", "."))
                      : 0)
                )}
              </p>
            </div>
            <p className="text-lg mt-2">Chegara em até {cartData.PrazoEntrega} dia(s) uteis após a confirmação do pagamento </p>
            <section className="flex flex-col justify-center items-center mt-5 gap-3">
              <h1 className="font-bold text-2xl">
                Selecione a forma de pagamento
              </h1>
              <div className="flex gap-3">
                <div
                  className="flex justify-center items-center text-white font-bold bg-black hover:opacity-90 cursor-not-allowed gap-1 h-14 w-40 rounded"
                  onClick={() => setSorry(true)}
                >
                  <FaBarcode />
                  <p>Boleto bancario</p>
                </div>

                <div
                  className="flex justify-center items-center text-white font-bold bg-black hover:opacity-90 cursor-not-allowed gap-1 h-14 w-40 rounded"
                  onClick={() => setSorry(true)}
                >
                  <BsCreditCard2Front className="text-sky-600" />
                  <p>Cartão de credito</p>
                </div>

                <div
                  className="flex justify-center items-center text-white font-bold bg-black hover:opacity-90 cursor-pointer gap-1 h-14 w-40 rounded"
                  onClick={() => {
                    setPaymentMethod("Pix");
                    setPixOpened(true);
                  }}
                >
                  <MdPix className="text-emerald-700" />
                  <p>Pix</p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {paymentMethod === "Pix" && pixOpened && (
            <div ref={pixRef} className="flex justify-center m-10">
              <Pix text={"Chave Pikix"} />
            </div>
          )}

          {sorry && <MethodNotAvailable setSorry={setSorry} />}

          {paymentMethod === "Pix" && (
            <button className="flex items-center text-white text-lg bg-black p-2 rounded hover:bg-green-500 hover:shadow-lg transition-all">
              Finalizar compra
            </button>
          )}
        </form>
      </main>
      <Footer className="fixed bottom-0 left-0 right-0" />
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default Payment;
