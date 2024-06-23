// src/componentes/estoques/EstoquesList.jsx

import React, { useState, useEffect } from 'react';
import EstoquesForm from './estoquesForm';

const EstoquesList = () => {
  const [estoques, setEstoques] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEstoque, setCurrentEstoque] = useState(null);

  useEffect(() => {
    fetchEstoques();
  }, []);

  const fetchEstoques = async () => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/estoques`);
      if (!response.ok) {
        throw new Error('Failed to fetch estoques');
      }
      const data = await response.json();
      setEstoques(data);
    } catch (error) {
      console.error('Error fetching estoques:', error);
    }
  };

  const updateEstoque = (estoque) => {
    setCurrentEstoque(estoque);
    setIsFormVisible(true);
  };

  const deleteEstoque = async (estoqueId) => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/estoques/${estoqueId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete estoque');
      }
      setEstoques(estoques.filter(estoque => estoque.EstoqueID !== estoqueId));
    } catch (error) {
      console.error('Error deleting estoque:', error);
    }
  };

  const addEstoque = () => {
    setCurrentEstoque(null);
    setIsFormVisible(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Estoques</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addEstoque}
      >
        Adicionar Estoque
      </button>
      <div className="grid grid-cols-3 gap-4">
        {estoques.map(estoque => (
          <div key={estoque.EstoqueID} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{estoque.Nome}</h3>
            {estoque.Descricao && <p className="text-gray-600">{estoque.Descricao}</p>}
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateEstoque(estoque)}
              >
                Atualizar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteEstoque(estoque.EstoqueID)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <EstoquesForm
          estoque={currentEstoque}
          onSubmit={() => {
            fetchEstoques();
            setIsFormVisible(false);
          }}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default EstoquesList;

