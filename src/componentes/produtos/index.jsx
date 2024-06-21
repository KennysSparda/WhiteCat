// components/ProductsList.jsx

import React, { useState, useEffect } from 'react';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para fazer a requisição GET ao backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products'); // Substitua pela URL do seu backend
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Atualiza o estado com os produtos recebidos do backend
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Chama a função de fetch ao montar o componente
  }, []); // Dependência vazia para garantir que o useEffect seja executado apenas uma vez

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-700 mt-2">Preço: R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
