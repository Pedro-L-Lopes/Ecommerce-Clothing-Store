// é um objeto central do Redux que armazena o estado global da aplicação. Ele é responsável por manter o estado e permitir que os componentes acessem, atualizem e recebam notificações de alterações no estado.

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"; // Renomeio o slice aqui para authReducer
import userReducer from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import shippingReducer from "./slices/shippingSlice";
import clientReducer from "./slices/clientSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  // Onde todos os Contextos (dados) da aplicação serão salvos para serem distribuidos para a aplicação (+- assim)
  reducer: {
    auth: authReducer, // Nome auth dado em authSlice no createSlice
    user: userReducer,
    product: productSlice,
    cart: cartReducer,
    shipping: shippingReducer,
    client: clientReducer,
    order: orderReducer,
  },
});
