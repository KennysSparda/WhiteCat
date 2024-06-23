// src/componentes/funcionarios/FuncionariosList.jsx

import React, { useState, useEffect } from 'react';
import FuncionariosForm from './funcionariosForm';

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentFuncionario, setCurrentFuncionario] = useState(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/funcionarios`);
        if (!response.ok) {
          throw new Error('Failed to fetch funcionarios');
        }
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error('Error fetching funcionarios:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  const updateFuncionario = (funcionario) => {
    setCurrentFuncionario(funcionario);
    setIsFormVisible(true);
  };

  const deleteFuncionario = async (funcionarioId) => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/funcionarios/${funcionarioId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete funcionario');
      }
      setFuncionarios(funcionarios.filter(funcionario => funcionario.FuncionarioID !== funcionarioId));
    } catch (error) {
      console.error('Error deleting funcionario:', error);
    }
  };

  const addFuncionario = () => {
    setCurrentFuncionario(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (newFuncionario) => {
    if (currentFuncionario) {
      // Atualizando funcionario existente
      try {
        const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/funcionarios/${currentFuncionario.FuncionarioID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFuncionario),
        });
        if (!response.ok) {
          throw new Error('Failed to update funcionario');
        }
        const updatedFuncionario = await response.json();
        setFuncionarios(funcionarios.map(funcionario => funcionario.FuncionarioID === updatedFuncionario.FuncionarioID ? updatedFuncionario : funcionario));
      } catch (error) {
        console.error('Error updating funcionario:', error);
      }
    } else {
      // Adicionando novo funcionario
      try {
        const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/funcionarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFuncionario),
        });
        if (!response.ok) {
          throw new Error('Failed to add funcionario');
        }
        const addedFuncionario = await response.json();
        setFuncionarios([...funcionarios, addedFuncionario]);
      } catch (error) {
        console.error('Error adding funcionario:', error);
      }
    }
    setIsFormVisible(false);
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
        {funcionarios.map(funcionario => (
          <div key={funcionario.FuncionarioID} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{funcionario.Nome}</h3>
            <p className="text-gray-600">Cargo: {funcionario.Cargo}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateFuncionario(funcionario)}
              >
                Atualizar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteFuncionario(funcionario.FuncionarioID)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <FuncionariosForm
          funcionario={currentFuncionario}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default FuncionariosList;

