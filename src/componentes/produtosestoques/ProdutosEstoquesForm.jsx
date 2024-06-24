// ProdutosEstoqueForm.jsx
import React, { useState, useEffect } from 'react';

const ProdutosEstoqueForm = ({ produtoEstoque, fetchProdutosEstoque, onClose }) => {
  const [produtos, setProdutos] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [produtoID, setProdutoID] = useState('');
  const [estoqueID, setEstoqueID] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    fetchProdutosDisponiveis();
    fetchEstoquesDisponiveis();

    if (produtoEstoque) {
      setProdutoID(produtoEstoque.ProdutoID.toString());
      setEstoqueID(produtoEstoque.EstoqueID.toString());
      setQuantidade(produtoEstoque.Quantidade.toString());
    } else {
      setProdutoID('');
      setEstoqueID('');
      setQuantidade('');
    }
  }, [produtoEstoque]);

  const fetchProdutosDisponiveis = async () => {
    try {
      const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos disponíveis');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos disponíveis:', error);
    }
  };

  const fetchEstoquesDisponiveis = async () => {
    try {
      const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/estoques');
      if (!response.ok) {
        throw new Error('Erro ao buscar estoques disponíveis');
      }
      const data = await response.json();
      setEstoques(data);
    } catch (error) {
      console.error('Erro ao buscar estoques disponíveis:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const produtoEstoqueData = {
      ProdutoID: parseInt(produtoID),
      EstoqueID: parseInt(estoqueID),
      Quantidade: parseInt(quantidade),
    };

    try {
      let response;
      if (produtoEstoque) {
        // Atualizando entrada de produto em estoque existente
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produto-estoque/${produtoEstoque.ProdutoEstoqueID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produtoEstoqueData),
        });
      } else {
        // Adicionando nova entrada de produto em estoque
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produto-estoque`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produtoEstoqueData),
        });
      }

      if (!response.ok) {
        throw new Error(produtoEstoque ? 'Erro ao atualizar entrada de produto em estoque' : 'Erro ao adicionar entrada de produto em estoque');
      }

      fetchProdutosEstoque(); // Atualiza a lista de produtos em estoque após a operação
      onClose(); // Fecha o formulário após a conclusão

    } catch (error) {
      console.error('Erro ao submeter entrada de produto em estoque:', error);
      // Exibir mensagem de erro para o usuário, por exemplo:
      // setErrorMessage('Erro ao salvar entrada de produto em estoque. Verifique os campos e tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{produtoEstoque ? 'Atualizar Entrada de Produto em Estoque' : 'Adicionar Entrada de Produto em Estoque'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Produto</label>
            <select
              value={produtoID}
              onChange={(e) => setProdutoID(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.ProdutoID} value={produto.ProdutoID}>
                  {produto.Nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estoque</label>
            <select
              value={estoqueID}
              onChange={(e) => setEstoqueID(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um estoque</option>
              {estoques.map((estoque) => (
                <option key={estoque.EstoqueID} value={estoque.EstoqueID}>
                  {estoque.Nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {produtoEstoque ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdutosEstoqueForm;
