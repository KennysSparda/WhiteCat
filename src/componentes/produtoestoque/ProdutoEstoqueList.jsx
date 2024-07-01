import React, { useState, useEffect } from 'react';
import EstoquesList from '../estoque/EstoqueList';

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
  const [showEstoquesList, setShowEstoquesList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProdutosEstoque();
  }, [estoqueId]);

  const fetchProdutosEstoque = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/produto-estoque/${estoqueId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch produtos do estoque');
      }
      const data = await response.json();
      setProdutos(data);

      // Calcular total de quantidade de produtos e quantidade de produtos diferentes
      let total = 0;
      let diferentes = new Set();
      data.forEach(produto => {
        total += produto.quantidade;
        diferentes.add(produto.nomeproduto);
      });
      setTotalQuantidade(total);
      setQuantidadeDiferentes(diferentes.size);
    } catch (error) {
      console.error('Error fetching produtos do estoque:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoltarClick = () => {
    setShowEstoquesList(true); // Define o estado para mostrar o componente EstoquesList
  };

  const handleSortChange = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };

  const sortProducts = (produtos) => {
    let sortedProducts = [...produtos];
    if (sortBy === 'nomeproduto') {
      sortedProducts.sort((a, b) => {
        const nameA = a.nomeproduto.toUpperCase();
        const nameB = b.nomeproduto.toUpperCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'quantidade') {
      sortedProducts.sort((a, b) => {
        return sortOrder === 'asc' ? a.quantidade - b.quantidade : b.quantidade - a.quantidade;
      });
    }
    return sortedProducts;
  };

  const filteredProducts = produtos.filter(product =>
    product.nomeproduto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos do Estoque</h2>
      <div className="mb-4 flex items-center">
        <p className="mr-4">Total de Quantidade de Produtos: {totalQuantidade}</p>
        <p className="mr-4">Quantidade de Produtos Diferentes: {quantidadeDiferentes}</p>
        <input
          type="text"
          placeholder="Buscar..."
          className="border p-2 rounded w-full w-1/3 mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleSortChange('nomeproduto')}
          >
            Ordenar por Nome {sortBy === 'nomeproduto' && `(${sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`}
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleSortChange('quantidade')}
          >
            Ordenar por Quantidade {sortBy === 'quantidade' && `(${sortOrder === 'asc' ? '+' : '-'})`}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProdutoEstoqueSkeleton key={index} />
          ))
        ) : (
          sortedProducts.map(produto => (
            <div key={produto.produtoestoqueid} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">{produto.nomeproduto}</h3>
              <h4 className="text-lg font-semibold mb-2">{produto.descricaoproduto}</h4>
              <p className="text-gray-600t-10">Quantidade: {produto.quantidade}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProdutoEstoqueList;
