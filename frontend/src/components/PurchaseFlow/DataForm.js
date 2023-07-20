import React from "react";
import logo from "../../images/21store.png";

export const DataForm = () => {
  return (
    <div className="mt-14">
      <div class="container max-w-screen-lg mx-auto -m-10">
        <div>
          <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 border border-black">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div class="text-gray-600">
                <p class="font-medium text-lg">Quase lá</p>
                <p>Preencha todos os dados</p>
                <img
                  src={logo}
                  alt="Logo da loja"
                  className="flex mt-5 ml-8 w-60"
                />
              </div>

              <div class="lg:col-span-2">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div class="md:col-span-5">
                    <label for="full_name">Nome completo</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div class="md:col-span-5">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@gmail.com"
                    />
                  </div>

                  <div class="md:col-span-3">
                    <label for="address">Endereço/Rua</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label for="bairro">Bairro</label>
                    <input
                      type="text"
                      name="bairro"
                      id="bairro"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div class="md:col-span-1">
                    <label for="numero">Número</label>
                    <input
                      type="text"
                      name="Numero"
                      id="Numero"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label for="city">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label for="cep">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      id="cep"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  {/* <div class="md:col-span-5 text-right">
                    <div class="inline-flex items-end">
                      <button class="bg-black hover:opacity-80 text-white font-bold py-2 px-4 rounded">
                        Enviar
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
