import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, fetchProducts, onClose }) => {
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
      nome: nome,
      valor: parseFloat(valor),
      descricao: descricao,
    };

    try {
      let response;
      if (product) {
        // Atualizando produto existente
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produtos/${product.ProdutoID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      } else {
        // Adicionando novo produto
        response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com/produtos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        throw new Error(product ? 'Failed to update product' : 'Failed to add product');
      }

      fetchProducts(); // Atualiza a lista de produtos após a operação
      onClose(); // Fecha o formulário após a conclusão

    } catch (error) {
      console.error('Error submitting product:', error);
      // Exibir mensagem de erro para o usuário, por exemplo:
      // setErrorMessage('Erro ao salvar produto. Verifique os campos e tente novamente.');
    }
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

