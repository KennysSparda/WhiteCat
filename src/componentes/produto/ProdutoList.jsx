import React, { useState, useEffect } from 'react';
import ProductForm from './ProdutoForm';

const ProductSkeleton = () => {
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/produto`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = () => {
    setCurrentProduct(null);
    setIsFormVisible(true);
  };

  const updateProduct = (product) => {
    setCurrentProduct(product);
    setIsFormVisible(true);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/produto/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Materiais</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addProduct}
      >
        Adicionar Produto
      </button>
      <div className="grid grid-cols-3 gap-4">
        {isLoading ? (
          // Exibir skeletons enquanto os produtos estão sendo carregados
          Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">{product.nome}</h3>
              {product.descricao && <p className="text-gray-600">{product.descricao}</p>}
              <p className="text-gray-700 mt-2">Valor: R$ {product.valor}</p>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => updateProduct(product)}
                >
                  Atualizar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isFormVisible && (
        <ProductForm
          product={currentProduct}
          fetchProducts={fetchProducts}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
