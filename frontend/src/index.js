import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
//Ele age como um ponto de entrada para a aplicação, fornecendo o estado Redux para todos os componentes que estão abaixo dele na árvore de componentes.
// Quando o Provider é renderizado, ele configura o contexto do Redux e faz com que todos os componentes em sua árvore possam acessar esse contexto. Isso significa que não é mais necessário passar manualmente o estado do Redux através das props de cada componente intermediário.
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Envolve a aplicação em um provider  */} 
    <Provider store={store}> {/* Compartilha o que quer que seja entregue aos componentes */}
      <App />
    </Provider>
  </React.StrictMode>
);
