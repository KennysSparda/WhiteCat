// ProdutosEstoqueList.jsx
import React, { useState, useEffect } from 'react';
import ProdutosEstoqueForm from './ProdutosEstoquesForm';

const ProdutosEstoqueList = () => {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProdutoEstoque, setCurrentProdutoEstoque] = useState(null);

  useEffect(() => {
    fetchProdutosEstoque();
  }, []);

  const fetchProdutosEstoque = async () => {
    try {
      const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produtos/produtos-estoque');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos em estoque');
      }
      const data = await response.json();
      setProdutosEstoque(data);
    } catch (error) {
      console.error('Erro ao buscar produtos em estoque:', error);
    }
  };

  const addProdutoEstoque = () => {
    setCurrentProdutoEstoque(null);
    setIsFormVisible(true);
  };

  const updateProdutoEstoque = (produtoEstoque) => {
    setCurrentProdutoEstoque(produtoEstoque);
    setIsFormVisible(true);
  };

  const deleteProdutoEstoque = async (id) => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produtos/produtos-estoque/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar produto em estoque');
      }
      setProdutosEstoque(produtosEstoque.filter(pe => pe.ID !== id));
    } catch (error) {
      console.error('Erro ao deletar produto em estoque:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Produtos em Estoque</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addProdutoEstoque}
      >
        Adicionar Produto em Estoque
      </button>
      <div className="grid grid-cols-3 gap-4">
        {produtosEstoque.map(pe => (
          <div key={pe.ID} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Produto ID: {pe.ProdutoID}</h3>
            <p className="text-gray-700 mt-2">Estoque ID: {pe.EstoqueID}</p>
            <p className="text-gray-700 mt-2">Quantidade: {pe.Quantidade}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateProdutoEstoque(pe)}
              >
                Atualizar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteProdutoEstoque(pe.ID)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <ProdutosEstoqueForm
          produtoEstoque={currentProdutoEstoque}
          fetchProdutosEstoque={fetchProdutosEstoque}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ProdutosEstoqueList;
