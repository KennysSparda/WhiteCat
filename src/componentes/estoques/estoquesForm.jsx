// src/componentes/estoques/EstoqueForm.jsx

import React, { useState, useEffect } from 'react';

const EstoqueForm = ({ estoque, onSubmit, onClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (estoque) {
      setNome(estoque.Nome || '');
      setDescricao(estoque.Descricao || '');
    } else {
      setNome('');
      setDescricao('');
    }
  }, [estoque]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const estoqueData = {
      nome: nome,
      descricao: descricao,
    };

    try {
      let response;
      if (estoque) {
        // Atualizando estoque existente
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/estoques/${estoque.EstoqueID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(estoqueData),
        });
      } else {
        // Adicionando novo estoque
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/estoques`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(estoqueData),
        });
      }

      if (!response.ok) {
        throw new Error(estoque ? 'Failed to update estoque' : 'Failed to add estoque');
      }

      const updatedEstoque = await response.json();
      onSubmit(updatedEstoque);
    } catch (error) {
      console.error('Error submitting estoque:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{estoque ? 'Atualizar Estoque' : 'Adicionar Estoque'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border rounded"
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
              {estoque ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstoqueForm;

