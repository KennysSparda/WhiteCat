// src/componentes/Registros/index.jsx

import React, { useState, useEffect } from 'react';
import MovimentacoesForm from './MovimentacoesForm';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://pure-reef-23012-9eb68eca9f5c.herokuapp.com:19164/Registros');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const updateProduct = (product) => {
    setCurrentProduct(product);
    setIsFormVisible(true);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://pure-reef-23012-9eb68eca9f5c.herokuapp.com:19164/Registros/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.RegistroID !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const addProduct = () => {
    setCurrentProduct(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (newProduct) => {
    if (currentProduct) {
      // Atualizando Registro existente
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}:${process.env.NEXT_PUBLIC_PORT}/Registros/${currentProduct.RegistroID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        const updatedProduct = await response.json();
        setProducts(products.map(product => product.RegistroID === updatedProduct.RegistroID ? updatedProduct : product));
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Adicionando novo Registro
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.PORT}/Registros`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    setIsFormVisible(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movimentacoes</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addProduct}
      >
        Adicionar Registro
      </button>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.RegistroID} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{product.Nome}</h3>
            {product.Descricao && <p className="text-gray-600">{product.Descricao}</p>}
            <p className="text-gray-700 mt-2">Preço: R$ {product.Valor}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateProduct(product)}
              >
                Atualizar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteProduct(product.RegistroID)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <MovimentacoesForm
          product={currentProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ProductsList;
