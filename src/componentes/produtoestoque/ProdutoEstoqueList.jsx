import React, { useState, useEffect } from "react";
import PoucoEstoqueNotificacao from "./PoucoEstoqueNotificacao";

const ProdutoEstoqueSkeleton = () => {
  return (
    <div className="border p-4 rounded shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded w-1/2"></div>
    </div>
  );
};

const ProdutoEstoqueList = ({ estoqueId }) => {
  const [produtos, setProdutos] = useState([]);
  const [totalQuantidade, setTotalQuantidade] = useState(0);
  const [quantidadeDiferentes, setQuantidadeDiferentes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showPoucoEstoqueNotificacao, setShowPoucoEstoqueNotificacao] =
    useState(false);

  const lowStockProducts = produtos.filter((produto) => produto.quantidade < 5);

  useEffect(() => {
    fetchProdutosEstoque();
  }, [estoqueId]);

  const fetchProdutosEstoque = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/produto-estoque/${estoqueId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch produtos do estoque");
      }
      const data = await response.json();
      setProdutos(data);

      // Calcular total de quantidade de produtos e quantidade de produtos diferentes
      let total = 0;
      let diferentes = new Set();
      data.forEach((produto) => {
        total += produto.quantidade;
        diferentes.add(produto.nomeproduto);
      });
      setTotalQuantidade(total);
      setQuantidadeDiferentes(diferentes.size);

      // Verificar se há produtos com estoque baixo
      const hasLowStock = data.some((produto) => produto.quantidade < 5);
      setShowPoucoEstoqueNotificacao(hasLowStock); // Mostrar notificação se houver produtos com estoque baixo
    } catch (error) {
      console.error("Error fetching produtos do estoque:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("asc");
    }
  };

  const sortProducts = (produtos) => {
    let sortedProducts = [...produtos];
    if (sortBy === "nomeproduto") {
      sortedProducts.sort((a, b) => {
        const nameA = a.nomeproduto.toUpperCase();
        const nameB = b.nomeproduto.toUpperCase();
        if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
        if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    } else if (sortBy === "quantidade") {
      sortedProducts.sort((a, b) => {
        return sortOrder === "asc"
          ? a.quantidade - b.quantidade
          : b.quantidade - a.quantidade;
      });
    }
    return sortedProducts;
  };

  const filteredProducts = produtos.filter((product) =>
    product.nomeproduto.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = sortProducts(filteredProducts);

  const handleCloseNotification = () => {
    setShowPoucoEstoqueNotificacao(false); // Fecha a notificação de estoque baixo
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos do Estoque</h2>
      <div className="mb-4 flex justify-between items-start">
        <input
          type="text"
          placeholder="Buscar..."
          className="border p-2 rounded w-1/3 m-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <p className="m-4">
          Total de Produtos: <strong>{totalQuantidade}</strong>
        </p>
        <p className="m-4">
          Produtos Diferentes: <strong>{quantidadeDiferentes}</strong>
        </p>

        <div className="relative">
          <button
            className={`px-4 py-2 rounded m-2 w-36 ${sortBy === "nomeproduto" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
            onClick={() => handleSortChange("nomeproduto")}
          >
            Nome{" "}
            {sortBy === "nomeproduto" && (
              <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded m-2 w-36 ${sortBy === "quantidade" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
            onClick={() => handleSortChange("quantidade")}
          >
            Quantidade{" "}
            {sortBy === "quantidade" && (
              <span>{sortOrder === "asc" ? "↓" : "↑"}</span>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProdutoEstoqueSkeleton key={index} />
            ))
          : sortedProducts.map((produto) => (
              <div
                key={produto.produtoestoqueid}
                className="border-2 border-black  p-4 rounded shadow-md h-48"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {produto.nomeproduto}
                </h3>
                <h4 className="text-lg font-semibold mb-2">
                  {produto.descricaoproduto}
                </h4>
                <p className="text-gray-600t-10">
                  Quantidade: <strong>{produto.quantidade}</strong>
                </p>
                <p className="text-gray-600">
                  Preço: <strong>R$ {produto.valorproduto}</strong>
                </p>
                <p className="text-gray-600">
                  Total em estoque:{" "}
                  <strong>
                    R$ {(produto.quantidade * produto.valorproduto).toFixed(2)}
                  </strong>
                </p>
              </div>
            ))}
      </div>
      {showPoucoEstoqueNotificacao && (
        <PoucoEstoqueNotificacao
          products={lowStockProducts}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default ProdutoEstoqueList;
