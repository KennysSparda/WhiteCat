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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/movimentacoes`);
      if (!response.ok) {
        throw new Error('Failed to fetch movimentacoes');
      }
      const data = await response.json();
      setMovimentacoes(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching movimentacoes:', error);
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
      setMovimentacoes(movimentacoes.filter(movimentacao => movimentacao.ID !== movimentacaoId));
    } catch (error) {
      console.error('Error deleting movimentacao:', error);
    }
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (movimentacaoData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/movimentacoes`, {
        method: currentMovimentacao ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimentacaoData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit movimentacao');
      }
      fetchMovimentacoes(); // Atualiza a lista após a submissão
      setIsFormVisible(false); // Fecha o formulário após a submissão
    } catch (error) {
      console.error('Error submitting movimentacao:', error);
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
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Quantidade</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Produto ID</th>
              <th className="border border-gray-300 px-4 py-2">Funcionário ID</th>
              <th className="border border-gray-300 px-4 py-2">Estoque ID</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map(movimentacao => (
              <tr key={movimentacao.id}>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.id}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.data}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.quantidade}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.fk_tipo_id ? 'Saída' : 'Entrada'}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.nomeproduto}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.nomefuncionario}</td>
                <td className="border border-gray-300 px-4 py-2">{movimentacao.nomeestoque}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => updateMovimentacao(movimentacao)}
                  >
                    Atualizar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteMovimentacao(movimentacao.ID)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormVisible && (
        <MovimentacoesForm
          movimentacao={currentMovimentacao}
          onSubmit={handleSubmit} // Passando a função handleSubmit para o form
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default MovimentacoesList;
