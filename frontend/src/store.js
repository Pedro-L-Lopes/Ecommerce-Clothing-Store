// é um objeto central do Redux que armazena o estado global da aplicação. Ele é responsável por manter o estado e permitir que os componentes acessem, atualizem e recebam notificações de alterações no estado.

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  // Onde todos os Contextos (dados) da aplicação serão salvos para serem distribuidos para a aplicação (+- assim)
  reducer: {},
});
