import React, { useState, useEffect } from 'react';
import FuncionarioForm from './FuncionarioForm';

const FuncionarioSkeleton = () => {
  return (
    <div className="border p-4 rounded shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div> {/* Título */}
      <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div> {/* Descrição (opcional) */}
      <div className="h-4 bg-gray-300 mb-2 rounded w-1/2"></div> {/* Valor */}
      <div className="flex mt-4 space-x-2">
        <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Botão Atualizar */}
        <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Botão Excluir */}
      </div>
    </div>
  );
};


const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFuncionario, setCurrentFuncionario] = useState(null);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/funcionario`);
      if (!response.ok) {
        throw new Error('Failed to fetch funcionarios');
      }
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error('Error fetching funcionarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFuncionario = () => {
    setCurrentFuncionario(null);
    setIsFormVisible(true);
  };

  const updateFuncionario = (funcionario) => {
    setCurrentFuncionario(funcionario);
    setIsFormVisible(true);
  };

  const deleteFuncionario = async (funcionarioId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/funcionario/${funcionarioId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete funcionario');
      }
      setFuncionarios(funcionarios.filter(func => func.id !== funcionarioId));
    } catch (error) {
      console.error('Error deleting funcionario:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Funcionários</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addFuncionario}
      >
        Adicionar Funcionário
      </button>
      <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
          // Exibir skeletons enquanto os produtos estão sendo carregados
          Array.from({ length: 6 }).map((_, index) => (
            <FuncionarioSkeleton key={index} />
          ))
        ) : (
          funcionarios.map(funcionario => (
            <div key={funcionario.id} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">{funcionario.nome}</h3>
              <p className="text-gray-600">Cargo: {funcionario.cargo}</p>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => updateFuncionario(funcionario)}
                >
                  Atualizar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteFuncionario(funcionario.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isFormVisible && (
        <FuncionarioForm
          funcionario={currentFuncionario}
          fetchFuncionarios={fetchFuncionarios} // Passa a função de atualização da lista como prop
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default FuncionariosList;
