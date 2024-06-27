import React, { useState, useEffect } from 'react';
import EstoquesList from '../estoque/EstoqueList';

const ProdutoEstoqueList = ({ estoqueId }) => {
  const [produtos, setProdutos] = useState([]);
  const [totalQuantidade, setTotalQuantidade] = useState(0);
  const [quantidadeDiferentes, setQuantidadeDiferentes] = useState(0);
  const [showEstoquesList, setShowEstoquesList] = useState(false);

  useEffect(() => {
    fetchProdutosEstoque();
  }, [estoqueId]);

  const fetchProdutosEstoque = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/produto-estoque/${estoqueId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch produtos do estoque');
      }
      const data = await response.json();
      setProdutos(data);
      console.log(data)

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
    }
  };

  const handleVoltarClick = () => {
    setShowEstoquesList(true); // Define o estado para mostrar o componente EstoquesList
  };

  // Renderiza o componente EstoquesList ao clicar no botão de voltar
  if (showEstoquesList) {
    return <EstoquesList />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos do Estoque</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleVoltarClick}
      >
        Voltar para Lista de Estoques
      </button>
      <div className="mb-4">
        <p>Total de Quantidade de Produtos: {totalQuantidade}</p>
        <p>Quantidade de Produtos Diferentes: {quantidadeDiferentes}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {produtos.map(produto => (
          <div key={produto.produtoestoqueid} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{produto.nomeproduto}</h3>
            <h4 className="text-lg font-semibold mb-2">{produto.descricaoproduto}</h4>
            <p className="text-gray-600">Quantidade: {produto.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdutoEstoqueList;
