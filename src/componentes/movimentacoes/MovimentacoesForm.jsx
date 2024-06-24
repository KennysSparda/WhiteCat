// MovimentacoesForm.jsx

import React, { useState, useEffect } from 'react';

const MovimentacoesForm = ({ movimentacao, fetchMovimentacoes, onClose }) => {
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [produtoID, setProdutoID] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [funcionarioID, setFuncionarioID] = useState('');
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos disponíveis
  const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar os funcionários disponíveis
  const [tiposMovimentacao] = useState(['entrada', 'saída']); // Tipos de movimentação disponíveis

  useEffect(() => {
    fetchProdutosDisponiveis();
    fetchFuncionariosDisponiveis();

    if (movimentacao) {
      setData(movimentacao.Data);
      setTipo(movimentacao.Tipo);
      setProdutoID(movimentacao.ProdutoID.toString());
      setQuantidade(movimentacao.Quantidade.toString());
      setFuncionarioID(movimentacao.FuncionarioID.toString());
    } else {
      setData('');
      setTipo('');
      setProdutoID('');
      setQuantidade('');
      setFuncionarioID('');
    }
  }, [movimentacao]);

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

  const fetchFuncionariosDisponiveis = async () => {
    try {
      const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/funcionarios');
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários disponíveis');
      }
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao buscar funcionários disponíveis:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const movimentacaoData = {
      Data: data,
      Tipo: tipo,
      ProdutoID: parseInt(produtoID),
      Quantidade: parseInt(quantidade),
      FuncionarioID: parseInt(funcionarioID),
    };

    try {
      let response;
      if (movimentacao) {
        // Atualizar movimentação existente
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/movimentacoes/${movimentacao.ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movimentacaoData),
        });
      } else {
        // Adicionar nova movimentação
        response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/movimentacoes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movimentacaoData),
        });
      }

      if (!response.ok) {
        throw new Error(movimentacao ? 'Erro ao atualizar movimentação' : 'Erro ao adicionar movimentação');
      }

      fetchMovimentacoes(); // Atualiza a lista de movimentações após a operação
      onClose(); // Fecha o formulário após a conclusão

    } catch (error) {
      console.error('Erro ao submeter movimentação:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{movimentacao ? 'Atualizar Movimentação' : 'Adicionar Movimentação'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Movimentação</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um tipo</option>
              {tiposMovimentacao.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)} {/* Capitaliza a primeira letra */}
                </option>
              ))}
            </select>
          </div>
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
                <option key={produto.ID} value={produto.ID}>
                  {produto.Nome}
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
          <div className="mb-4">
            <label className="block text-gray-700">Funcionário</label>
            <select
              value={funcionarioID}
              onChange={(e) => setFuncionarioID(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um funcionário</option>
              {funcionarios.map((funcionario) => (
                <option key={funcionario.ID} value={funcionario.ID}>
                  {funcionario.Nome}
                </option>
              ))}
            </select>
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
              {movimentacao ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovimentacoesForm;
