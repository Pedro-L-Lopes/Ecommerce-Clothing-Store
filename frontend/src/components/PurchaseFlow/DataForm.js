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

  const { loading, error } = useSelector((state) => state.client);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nasc, setNasc] = useState("");
  const [gender, setGender] = useState("");
  const [uf, setUf] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
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

    dispatch(insertClient(client));
    if (showError) {
      navigate("/pay");
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        dispatch(reset());
      }, 5000);

      return () => {
        clearTimeout(timer);
        dispatch(reset());
      };
    }
  }, [showError, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="mt-14">
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
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="uf">Estado</label>
                      <select
                        name="uf"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        onChange={(e) => setUf(e.target.value)}
                        value={uf}
                      >
                        {estadosBrasil &&
                          estadosBrasil.map((estado) => {
                            <option key={estado} value={estado}>
                              {estado}
                            </option>;
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
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="gender">Gênero</label>
                      <select
                        name="gender"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                      >
                        <option value="">Selecione</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-black hover:opacity-80 text-white font-bold py-2 px-4 rounded">
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
      {error && typeof error.msg === "string" && (
        <Message msg={error.msg} type="error" />
      )}

      {error && typeof error.msg === "string" && (
        <Message msg={error.msg} type="error" />
      )}
    </div>
  );
};
