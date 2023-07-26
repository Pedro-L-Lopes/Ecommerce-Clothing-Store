import React from "react";

const ReviseData = ({ client, setClientObservation,  }) => {
  return (
    <main className="mt-4">
      <div className="flex flex-col gap-1">
        <section>
          <h2 className="text-xl font-bold">Cliente</h2>
          <p>NOME: {client.name}</p>
          <p>TELEFONE: {client.phoneNumber}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Endereço de entrega</h2>
          <p>
            {client.street}, {client.houseNumber}
          </p>
          <p>
            {client.neighborhood}, {client.city}-{client.uf}
          </p>
          <p>CEP: {client.cep}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Algum aviso ou observação?</h2>
          <textarea
            onChange={(e) => setClientObservation(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="2"
            className="border border-black mt-2 rounded"
            placeholder="Digite aqui (campo opcional)"
          ></textarea>
        </section>
      </div>
    </main>
  );
};

export default ReviseData;
