// Verificar os estados (Loading, erro, sucesso e etc) // Estará no store para ser compartilhado com o projeto

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

// Pegando usuário da localStorage (se tiver)
const user = JSON.parse(localStorage.getItem("user"));

// Estado inicial
const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Registrando e logando usuário // Criando com AsyncThunk: nome = entidade(auth)/ação(register) segundo argumento é uma função async
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // thunkAPI permite funções extras, ex: para a execução e identificar erro da api e isso que vai fazer o desparo do comportamento de erro aqui
    const data = await authService.register(user); // Com o usuário da localStorage, usa a função register do authService e registra o usuário

    // Chechando erros
    if (data.errors) {
      // Rejeitando a requisição //errors é o array do back com varias mensagens, sempre pegando o primeiro erro e exibindo
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data; // usuário cadastrado
  }
);

// Criando slice com as funções do slice

export const authSlice = createSlice({
  name: "auth", // Nome pelo qual vai ser chamado na store e vai ter como extrair valores
  initialState,
  reducers: {
    reset: (state) => {
      // Reseta todos os estados // Ex: Limpar um componente como se fosse recarregar a pag
      state.loading = false;
      state.error = false;
      state.sucsess = false;
    },
  },
  // Parte das execuções que a gente faz na api // Trabalha diretamente com o estado atual de cada req
  extraReducers: (builder) => {
    // Builder = criar ações separadamente
    // Pode add diversos casos com o metodo addcase
    builder
      .addCase(register.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        // Action: dados recebidos do register la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload; // Atualiza os dados do usuário ao valor fornecido na action
      })
      .addCase(register.rejected, (state, action) => {
        // Tem action pq o dado é a msg de erro
        state.loading = false;
        state.error = action.payload; // Ativa o erro
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer; 
