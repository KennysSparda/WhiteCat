// src/componentes/movimentacoes/MovimentacoesForm.jsx.jsx

import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onClose }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (product) {
      setNome(product.Nome || '');
      setValor(product.Valor || '');
      setDescricao(product.Descricao || '');
    } else {
      setNome('');
      setValor('');
      setDescricao('');
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      Nome: nome,
      Valor: parseFloat(valor),
      Descricao: descricao,
    };

    onSubmit(productData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Atualizar Produto' : 'Adicionar Produto'}</h2>
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
            <label className="block text-gray-700">Valor</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
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
              {product ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
