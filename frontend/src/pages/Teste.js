import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Revise from "../../../components/PurchaseFlow/Revise";
import { DataForm } from "../../../components/PurchaseFlow/DataForm";

// Redux
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function MakeAPurchase() {
  const cart = useSelector((state) => state.cart);

  const [activeTab, setActiveTab] = useState("revisar");

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };

  const handleNext = () => {
    let nextTab;
    switch (activeTab) {
      case "revisar":
        nextTab = "preencherDados";
        break;
      case "preencherDados":
        nextTab = "formaPagamento";
        break;
      case "formaPagamento":
        nextTab = "revisaoFinal";
        break;
      default:
        return;
    }
    setActiveTab(nextTab);
  };

  const handleFinish = () => {
    // Lógica para finalizar a compra
    console.log("Compra finalizada!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "revisar":
        return (
          <TabPanel value="revisar">
            <h1 className="text-center text-xl">Revise os produtos</h1>
            {cart.length === 0 ? (
              <p>Carrinho vazio</p>
            ) : (
              <>
                {cart.map((product) => (
                  <Revise key={product._id} product={product} />
                ))}
              </>
            )}
            <div className="flex justify-center items-center">
              <Link to="/cart">
                <button className="text-white bg-black w-28 h-10 p-2 rounded m-2">
                  Cancelar
                </button>
              </Link>
              <button
                className="text-white bg-black w-28 h-10 p-2 rounded m-2"
                onClick={handleNext}
              >
                Avançar
              </button>
            </div>
          </TabPanel>
        );
      case "preencherDados":
        return (
          <TabPanel value="preencherDados">
            <DataForm />
            <button onClick={handleNext}>Avançar</button>
          </TabPanel>
        );
      case "formaPagamento":
        return (
          <TabPanel value="formaPagamento">
            {/* Conteúdo da aba "Forma de Pagamento" */}
            <p>Conteúdo da aba "Forma de Pagamento"</p>
            <button onClick={handleNext}>Avançar</button>
          </TabPanel>
        );
      case "revisaoFinal":
        return (
          <TabPanel value="revisaoFinal">
            {/* Conteúdo da aba "Revisão Final" */}
            <p>Conteúdo da aba "Revisão Final"</p>
            <button onClick={handleFinish}>Finalizar</button>
          </TabPanel>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Tabs value={activeTab} onChange={handleTabChange} className="w-full">
        <TabsHeader
          className="bg-transparent"
          indicatorProps={{
            className: "bg-blue-500/10 shadow-none text-blue-500",
          }}
        >
          <Tab value="revisar" className="whitespace-nowrap">
            Revisar
          </Tab>
          <Tab value="preencherDados" className="whitespace-nowrap">
            Preencher Dados
          </Tab>
          <Tab value="formaPagamento" className="whitespace-nowrap">
            Forma de Pagamento
          </Tab>
          <Tab value="revisaoFinal" className="whitespace-nowrap">
            Revisão Final
          </Tab>
        </TabsHeader>
        <TabsBody>{renderContent()}</TabsBody>
      </Tabs>
    </div>
  );
}
