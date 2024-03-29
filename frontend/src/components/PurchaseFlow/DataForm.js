import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { estadosBrasil } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

// Components
import Message from "../Message/Message";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { insertClient, reset } from "../../slices/clientSlice";

export const DataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = JSON.parse(localStorage.getItem("cartData"));

  const clientItem = JSON.parse(localStorage.getItem("client"));
  const clientId = clientItem ? clientItem.clientId : null;

  const { loading, error } = useSelector((state) => state.client);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState(cartData.logradouro);
  const [neighborhood, setNeighborhood] = useState(cartData.bairro);
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState(cartData.localidade);
  const [cep, setCep] = useState(cartData.cep);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nasc, setNasc] = useState("");
  const [gender, setGender] = useState("");
  const [uf, setUf] = useState(cartData.uf);

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const client = {
      name,
      email,
      street,
      neighborhood,
      houseNumber,
      city,
      cep,
      phoneNumber,
      nasc,
      gender,
      uf,
    };

    try {
      await dispatch(insertClient(client));

      const updatedClientItem = JSON.parse(localStorage.getItem("client"));
      const updatedClientId = updatedClientItem
        ? updatedClientItem.clientId
        : null;

      if (updatedClientId) {
        navigate(`/payment/${updatedClientId}`);
      } else {
        console.error("Erro ao obter o ID do cliente");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o cliente:", error);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (error && typeof error.msg === "string") {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        dispatch(reset());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={`mt-14`}>
      <form action="" onSubmit={handleSubmit}>
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 border">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Quase lá</p>
                  <p>Preencha todos os dados</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Nome completo</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder="email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Endereço/Rua</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="bairro">Bairro</label>
                      <input
                        type="text"
                        name="bairro"
                        id="bairro"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setNeighborhood(e.target.value)}
                        value={neighborhood}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="numero">Número da casa</label>
                      <input
                        type="text"
                        name="Numero"
                        id="Numero"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setHouseNumber(e.target.value)}
                        value={houseNumber}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="cep">CEP</label>
                      <input
                        type="text"
                        name="cep"
                        id="cep"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setCep(e.target.value)}
                        value={cep}
                        required
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="uf">Estado</label>
                      <select
                        name="uf"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        onChange={(e) => setUf(e.target.value)}
                        value={uf}
                        required
                      >
                        {estadosBrasil &&
                          estadosBrasil.map((estado) => {
                            return (
                              <option key={estado} value={estado}>
                                {estado}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="phone">Telefone</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="nasc">Data de nascimento</label>
                      <input
                        type="date"
                        name="nasc"
                        id="nasc"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        placeholder=""
                        onChange={(e) => setNasc(e.target.value)}
                        value={nasc}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="gender">Gênero</label>
                      <select
                        name="gender"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className={`bg-black hover:opacity-80 text-white font-bold py-2 px-4 rounded`}
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showError && typeof error.msg === "string" && (
        <Message msg={error.msg} type="error" />
      )}
    </div>
  );
};
