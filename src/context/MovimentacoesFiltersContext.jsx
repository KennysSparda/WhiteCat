import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const MovimentacoesFiltersContext = createContext(null);

const getTodayISO = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
};

export const MovimentacoesFiltersProvider = ({ children }) => {
  const today = getTodayISO();

  const [state, setState] = useState(() => {
    const fallback = {
      filtroGeral: "",
      dataInicial: today,
      dataFinal: today,
      currentPage: 1,
      sortKey: "id",
      sortDir: "desc",
    };

    if (typeof window === "undefined") return fallback;

    try {
      const raw = localStorage.getItem("mov.filters.v1");
      if (!raw) return fallback;

      const saved = JSON.parse(raw);

      return {
        filtroGeral:
          typeof saved?.filtroGeral === "string" ? saved.filtroGeral : "",
        dataInicial:
          typeof saved?.dataInicial === "string" ? saved.dataInicial : today,
        dataFinal:
          typeof saved?.dataFinal === "string" ? saved.dataFinal : today,
        currentPage: Number.isFinite(saved?.currentPage)
          ? Number(saved.currentPage)
          : 1,
        sortKey: typeof saved?.sortKey === "string" ? saved.sortKey : "id",
        sortDir:
          saved?.sortDir === "asc" || saved?.sortDir === "desc"
            ? saved.sortDir
            : "desc",
      };
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mov.filters.v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const setFiltroGeral = (value) =>
    setState((s) => ({ ...s, filtroGeral: value, currentPage: 1 }));
  const setDataInicial = (value) =>
    setState((s) => ({ ...s, dataInicial: value, currentPage: 1 }));
  const setDataFinal = (value) =>
    setState((s) => ({ ...s, dataFinal: value, currentPage: 1 }));
  const setCurrentPage = (value) =>
    setState((s) => ({ ...s, currentPage: value }));

  const setSort = (sortKey) =>
    setState((s) => {
      const same = s.sortKey === sortKey;
      const nextDir = same ? (s.sortDir === "asc" ? "desc" : "asc") : "asc";
      return { ...s, sortKey, sortDir: nextDir, currentPage: 1 };
    });

  const resetFilters = () =>
    setState({
      filtroGeral: "",
      dataInicial: today,
      dataFinal: today,
      currentPage: 1,
      sortKey: "id",
      sortDir: "desc",
    });

  const value = useMemo(
    () => ({
      filtroGeral: state.filtroGeral,
      dataInicial: state.dataInicial,
      dataFinal: state.dataFinal,
      currentPage: state.currentPage,
      sortKey: state.sortKey,
      sortDir: state.sortDir,
      setFiltroGeral,
      setDataInicial,
      setDataFinal,
      setCurrentPage,
      setSort,
      resetFilters,
    }),
    [state],
  );

  return (
    <MovimentacoesFiltersContext.Provider value={value}>
      {children}
    </MovimentacoesFiltersContext.Provider>
  );
};

export const useMovimentacoesFilters = () => {
  const ctx = useContext(MovimentacoesFiltersContext);
  if (!ctx)
    throw new Error(
      "useMovimentacoesFilters precisa estar dentro do MovimentacoesFiltersProvider",
    );
  return ctx;
};
