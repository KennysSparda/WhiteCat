import React, { useState, useEffect } from "react";
import MovimentacoesForm from "./MovimentacoesForm";
import { apiFetch } from "../../utils/apiFetch";
import { useMovimentacoesFilters } from "../../context/MovimentacoesFiltersContext";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, index) => (
      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
    ))}
  </tr>
);

const MovimentacoesSkeleton = ({ rowCount = 10 }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </>
  );
};

const MovimentacoesList = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMovimentacao, setCurrentMovimentacao] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    filtroGeral,
    setFiltroGeral,
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    currentPage,
    setCurrentPage,
    sortKey,
    sortDir,
    setSort,
    resetFilters,
  } = useMovimentacoesFilters();

  useEffect(() => {
    fetchMovimentacoes();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    calculateItemsPerPage();
  }, [windowWidth]);

  useEffect(() => {
    calculateTotalPages();
  }, [movimentacoes, itemsPerPage, filtroGeral, dataInicial, dataFinal]);

  const fetchMovimentacoes = async () => {
    try {
      const response = await apiFetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/movimentacoes`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movimentacoes");
      }
      const data = await response.json();
      setMovimentacoes(data);
    } catch (error) {
      console.error("Error fetching movimentacoes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMovimentacao = () => {
    setCurrentMovimentacao(null);
    setIsFormVisible(true);
  };

  const handleSubmit = async (movimentacaoData) => {
    try {
      const response = await apiFetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/movimentacoes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movimentacaoData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit movimentacao");
      }

      return result; // Retorna a resposta para ser usada no handleSubmit do formulário
    } catch (error) {
      console.error("Error submitting movimentacao:", error);
      return { success: false, message: error.message };
    }
  };

  const formatDate = (dateString) => {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const match = dateString.match(regex);

    if (!match) {
      throw new Error("Invalid date format");
    }

    const [_, year, month, day] = match;

    return `${day}/${month}/${year}`;
  };

  const calculateTotalPages = () => {
    const filteredMovimentacoes = filterMovimentacoes();
    const totalPagesCount = Math.ceil(
      filteredMovimentacoes.length / itemsPerPage === 0
        ? 1
        : filteredMovimentacoes.length / itemsPerPage,
    );
    setTotalPages(totalPagesCount > 0 ? totalPagesCount : 1);
    if (currentPage > totalPagesCount) {
      setCurrentPage(totalPagesCount);
    }
  };

  const calculateItemsPerPage = () => {
    setItemsPerPage(getItemsPerPage());
  };

  const getItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 10;
    } else if (screenWidth >= 768) {
      return 7;
    } else {
      return 5;
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleFilterChange = (event) => {
    setFiltroGeral(event.target.value);
  };

  const handleDataInicialChange = (event) => {
    setDataInicial(event.target.value);
  };

  const handleDataFinalChange = (event) => {
    setDataFinal(event.target.value);
  };

  function sortRows(rows, sortKey, sortDir) {
    if (!sortKey) return rows;

    const dir = sortDir === "asc" ? 1 : -1;

    return [...rows].sort((a, b) => {
      const av = a?.[sortKey];
      const bv = b?.[sortKey];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (sortKey === "data") {
        const ad = new Date(av).getTime();
        const bd = new Date(bv).getTime();
        return (ad - bd) * dir;
      }

      if (typeof av === "number" && typeof bv === "number")
        return (av - bv) * dir;

      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      return as.localeCompare(bs) * dir;
    });
  }

  const filterMovimentacoes = () => {
    return movimentacoes.filter((movimentacao) => {
      const movimentacaoDate = new Date(movimentacao.data);
      const initialDate = dataInicial ? new Date(dataInicial) : null;
      const finalDate = dataFinal ? new Date(dataFinal) : null;

      // Ajusta a data final para incluir todo o dia
      if (finalDate) {
        finalDate.setDate(finalDate.getDate() + 1);
      }

      return (
        (!initialDate || movimentacaoDate >= initialDate) &&
        (!finalDate || movimentacaoDate < finalDate) &&
        (movimentacao.data.includes(filtroGeral) ||
          movimentacao.nomeproduto
            .toLowerCase()
            .includes(filtroGeral.toLowerCase()) ||
          movimentacao.nomefuncionario
            .toLowerCase()
            .includes(filtroGeral.toLowerCase()) ||
          movimentacao.nomeestoque
            .toLowerCase()
            .includes(filtroGeral.toLowerCase()))
      );
    });
  };

  const filteredMovimentacoes = filterMovimentacoes();
  const sortedMovimentacoes = sortRows(filteredMovimentacoes, sortKey, sortDir);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMovimentacoes.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const maxQtd = Math.max(
    1,
    ...currentItems.map((m) => Math.abs(Number(m.quantidade || 0))),
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  const columns = [
    { key: "id", label: "ID", type: "number" },
    { key: "data", label: "Data", type: "date" },
    { key: "tipo", label: "Tipo", type: "number" },
    { key: "nomeproduto", label: "Produto", type: "string" },
    { key: "quantidade", label: "Quantidade", type: "number" },
    { key: "nomeestoque", label: "Estoque", type: "string" },
    { key: "nomefuncionario", label: "Funcionário", type: "string" },
  ];

  const palette = [
    "bg-blue-500/20",
    "bg-green-500/20",
    "bg-purple-500/20",
    "bg-orange-500/20",
    "bg-pink-500/20",
    "bg-teal-500/20",
  ];

  const getRowFillClass = (id) =>
    palette[Math.abs(Number(id || 0)) % palette.length];

  const normalize = (v, type) => {
    if (type === "number") return Number(v ?? 0);
    if (type === "date") return new Date(v).getTime() || 0;
    return String(v ?? "").toLowerCase();
  };

  const SortIcon = ({ active, dir }) => {
    if (!active) return <span className="ml-2 text-gray-300">↕</span>;
    return (
      <span className="ml-2 text-gray-700">{dir === "asc" ? "↑" : "↓"}</span>
    );
  };

  return (
    <div className="m-2">
      <h2 className="text-2xl font-bold mb-4">Lista de Movimentações</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addMovimentacao}
        >
          Adicionar Movimentação
        </button>
        <div>
          <div className="flex items-center ">
            <label htmlFor="filtroGeral" className="ml-4 mr-2">
              Buscar:
            </label>
            <input
              type="text"
              id="filtroGeral"
              value={filtroGeral}
              onChange={handleFilterChange}
              className="border border-gray-300 px-2 py-1 rounded"
            />
            <label htmlFor="dataInicial" className=" ml-4 mr-2">
              Data Inicial:
            </label>
            <input
              type="date"
              id="dataInicial"
              value={dataInicial}
              onChange={handleDataInicialChange}
              className="border border-gray-300 px-2 py-1 rounded"
            />

            <label htmlFor="dataFinal" className="ml-4 mr-2">
              Data Final:
            </label>
            <input
              type="date"
              id="dataFinal"
              value={dataFinal}
              onChange={handleDataFinalChange}
              className="border border-gray-300 px-2 py-1 rounded"
            />
            <button
              className="ml-3 bg-gray-200 text-gray-800 px-3 py-2 rounded"
              onClick={resetFilters}
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border border-gray-300 px-4 py-2 select-none cursor-pointer hover:bg-gray-50"
                  onClick={() => setSort(col.key)}
                >
                  <div className="flex items-center justify-center">
                    <span>{col.label}</span>
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <MovimentacoesSkeleton rowCount={8} />
            ) : (
              currentItems.map((movimentacao) => (
                <tr key={movimentacao.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {movimentacao.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {formatDate(movimentacao.data)}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-center ${movimentacao.tipo == 1 ? "text-green-500" : "text-red-500"}`}
                  >
                    {movimentacao.tipo == 1 ? "Entrada" : "Saída"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {movimentacao.nomeproduto}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="relative h-8 rounded overflow-hidden bg-gray-100">
                      <div
                        className={`absolute inset-y-0 left-0 ${getRowFillClass(movimentacao.id)}`}
                        style={{
                          width: `${Math.min(100, (Math.abs(Number(movimentacao.quantidade || 0)) / maxQtd) * 100)}%`,
                        }}
                      />
                      <div className="relative z-10 h-8 flex items-center justify-center font-semibold">
                        {movimentacao.quantidade}
                      </div>
                    </div>
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {movimentacao.nomeestoque}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {movimentacao.nomefuncionario}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center items-center">
        {/* Botões de Paginação */}
        <button
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={firstPage}
          disabled={currentPage === 1}
        >
          Primeira
        </button>
        <button
          className={`ml-2 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
        <button
          className={`ml-2 px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={lastPage}
          disabled={currentPage === totalPages}
        >
          Última
        </button>
      </div>
      {isFormVisible && (
        <MovimentacoesForm
          onSubmit={handleSubmit}
          onClose={() => setIsFormVisible(false)}
          movimentacao={currentMovimentacao}
          fetchMovimentacoes={fetchMovimentacoes}
        />
      )}
    </div>
  );
};

export default MovimentacoesList;
