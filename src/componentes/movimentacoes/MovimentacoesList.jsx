import React, { useState, useEffect } from 'react';
import MovimentacoesForm from './MovimentacoesForm';

const MovimentacoesSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
    </tr>
  );
};


const MovimentacoesList = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMovimentacao, setCurrentMovimentacao] = useState(null);

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  const fetchMovimentacoes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/movimentacoes`);
      if (!response.ok) {
        throw new Error('Failed to fetch movimentacoes');
      }
      const data = await response.json();
      setMovimentacoes(data);
    } catch (error) {
      console.error('Error fetching movimentacoes:', error);
    } finally {
      setIsLoading(false);
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

  const deleteMovimentacao = async (movimentacaoId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/movimentacoes/${movimentacaoId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete movimentacao');
      }
      setMovimentacoes(movimentacoes.filter(mov => mov.id !== movimentacaoId));
    } catch (error) {
      console.error('Error deleting movimentacao:', error);
    }
  };

  const handleSubmit = async (movimentacaoData) => {
    try {
      const url = currentMovimentacao
        ? `${process.env.NEXT_PUBLIC_URL}/movimentacoes/${currentMovimentacao.id}`
        : `${process.env.NEXT_PUBLIC_URL}/movimentacoes`;

      const method = currentMovimentacao ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimentacaoData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit movimentacao');
      }

      fetchMovimentacoes();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error submitting movimentacao:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Quantidade</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Produto</th>
              <th className="border border-gray-300 px-4 py-2">Funcionário</th>
              <th className="border border-gray-300 px-4 py-2">Estoque</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <MovimentacoesSkeleton key={index} />
              ))
            ) : (
              movimentacoes.map(movimentacao => (
                <tr key={movimentacao.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{movimentacao.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{formatDate(movimentacao.data)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{movimentacao.quantidade}</td>
                  <td className={`border border-gray-300 px-4 py-2 text-center ${movimentacao.fk_tipomovimentacoes_id === 1 ? 'text-green-500' : 'text-red-500'}`}>
                    {movimentacao.fk_tipomovimentacoes_id === 1 ? 'Entrada' : 'Saída'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{movimentacao.nomeproduto}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{movimentacao.nomefuncionario}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{movimentacao.nomeestoque}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => updateMovimentacao(movimentacao)}
                    >
                      Atualizar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => deleteMovimentacao(movimentacao.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isFormVisible && (
        <MovimentacoesForm
          movimentacao={currentMovimentacao}
          onSubmit={handleSubmit}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default MovimentacoesList;
