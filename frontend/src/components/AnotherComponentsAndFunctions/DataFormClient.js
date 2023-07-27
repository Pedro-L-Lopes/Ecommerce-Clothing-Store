import logo from "../../images/21store.png";

export const DataFormClient = ({ client }) => {
  return (
    <div className={`mt-10`}>
      <form>
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 border">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Dados do cliente</p>
                  <img src={logo} alt="Logo da loja" className="mt-14" />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Nome completo</label>
                      <input
                        type="text"
                        value={client.name}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.email}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Endereço/Rua</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.street}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>Bairro</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.neighborhood}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label>Número da casa</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.houseNumber}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>Cidade</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.city}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="cep">CEP</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.cep}
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label>Estado</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.uf}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Telefone</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.phoneNumber}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="nasc">Data de nascimento</label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.nasc}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="nasc">Gênero</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-black"
                        disabled
                        value={client.gender}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
