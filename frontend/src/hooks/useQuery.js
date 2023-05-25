// Extrair valores da da query string

import { useLocation } from "react-router-dom";
import { useMemo } from "react"; // maneira performatica de guardar valor

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]); // Extrair dados como se fosse objetos
}
