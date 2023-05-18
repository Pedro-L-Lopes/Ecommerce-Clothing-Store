// Verificar se o usuário está autenticado ou não

import { useState, useEffect } from "react";

// Como os dados estão no redux, precisa importar para pegar na store do auth
import { useSelector } from "react-redux";

export const useAuth = () => {
  // Extraindo o user do initialState, recuperado da localStorage
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Não carregar nada enquanto não souber se o user ta autenticado

  // Ativado sempre que o usuário mudar
  useEffect(() => {
    if (user) {
      // Se tem algum usuário na localStorage
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading };
};
