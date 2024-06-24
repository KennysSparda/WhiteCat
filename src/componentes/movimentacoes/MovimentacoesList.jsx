// MovimentacoesList.jsx

import React, { useState, useEffect } from 'react';
import MovimentacoesForm from './MovimentacoesForm';

const MovimentacoesList = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMovimentacao, setCurrentMovimentacao] = useState(null);

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  const fetchMovimentacoes = async () => {
    try {
      const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/movimentacoes');
      if (!response.ok) {
        throw new Error('Erro ao buscar movimentações');
      }
      const data = await response.json();
      setMovimentacoes(data);
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
    }
  };

  const addMovimentacao = () => {
    setCurrentMovimentacao(null);
    setIsFormVisible(true);
  };

  const updateMovimentacao = (movimentacao) => {
    setCurrentMovimentacao(movimentacao);
    setIsFormVisible(true);
  };

  const deleteMovimentacao = async (id) => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/movimentacoes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar movimentação');
      }
      setMovimentacoes(movimentacoes.filter(m => m.ID !== id));
    } catch (error) {
      console.error('Erro ao deletar movimentação:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Movimentações</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addMovimentacao}
      >
        Adicionar Movimentação
      </button>
      <div className="grid grid-cols-3 gap-4">
        {movimentacoes.map(m => (
          <div key={m.ID} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">ID: {m.ID}</h3>
            <p className="text-gray-700 mt-2">Data: {m.Data}</p>
            <p className="text-gray-700 mt-2">Tipo: {m.Tipo}</p>
            <p className="text-gray-700 mt-2">Produto ID: {m.ProdutoID}</p>
            <p className="text-gray-700 mt-2">Quantidade: {m.Quantidade}</p>
            <p className="text-gray-700 mt-2">Funcionário ID: {m.FuncionarioID}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateMovimentacao(m)}
              >
                Atualizar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteMovimentacao(m.ID)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <MovimentacoesForm
          movimentacao={currentMovimentacao}
          fetchMovimentacoes={fetchMovimentacoes}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default MovimentacoesList;
