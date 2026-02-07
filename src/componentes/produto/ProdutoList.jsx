import React, { useState, useEffect } from "react";
import ProductForm from "./ProdutoForm";

const ProductSkeleton = () => {
  return (
    <div className="border p-4 rounded shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div> {/* Título */}
      <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>{" "}
      {/* Descrição (opcional) */}
      <div className="h-4 bg-gray-300 mb-2 rounded w-1/2"></div> {/* Valor */}
      <div className="flex mt-4 space-x-2">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>{" "}
        {/* Botão Atualizar */}
        <div className="h-8 w-20 bg-gray-300 rounded"></div>{" "}
        {/* Botão Excluir */}
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/produto`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/produto/${productId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.descricao &&
        product.descricao.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Materiais</h2>
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addProduct}
        >
          Adicionar Produto
        </button>
        <input
          type="text"
          placeholder="Buscar..."
          className="border p-2 rounded w-1/3 text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-black p-4 rounded shadow-md flex justify-between items-start w-42 h-36"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{product.nome}</h3>
                  {product.descricao && (
                    <p className="text-gray-600 overflow-hidden overflow-ellipsis h-5">
                      {product.descricao}
                    </p>
                  )}
                  <p className="text-gray-700 mt-2">
                    Valor: R$ {product.valor}
                  </p>
                </div>
                <div className="w-8 flex flex-col space-y-2 ml-4">
                  <button
                    title="Atualizar"
                    className="bg-transparent hover:bg-blue-500 text-blue-900 hover:text-white w-8 rounded"
                    onClick={() => updateProduct(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.607 18.746c0 .881-.716 1.624-1.597 1.624H5.231c-.881 0-1.597-.743-1.597-1.624V5.967c0-.881.716-1.571 1.597-1.571h7.454V3.332H5.231c-1.468 0-2.662 1.168-2.662 2.636v12.778c0 1.468 1.194 2.688 2.662 2.688h12.778c1.468 0 2.662-1.221 2.662-2.688v-7.428h-1.065V18.746z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.807 3.17c-.804-.805-2.207-.805-3.012 0l-7.143 7.143c-.068.068-.117.154-.14.247L9.76 13.571c-.045.181.008.373.14.506.101.101.237.156.376.156.043 0 .086-.005.129-.016l3.012-.753c.094-.023.179-.072.247-.14l7.143-7.143c.402-.402.624-.937.624-1.506S21.21 3.572 20.807 3.17zM13.016 12.467l-2.008.502.502-2.008 5.909-5.909 1.506 1.506-5.909 5.909zM20.054 5.428l-.376.376-1.506-1.506.376-.376c.402-.402 1.104-.402 1.506 0 .201.201.312.468.312.753 0 .285-.111.552-.312.753z"
                      />
                    </svg>
                  </button>
                  <button
                    title="Remover"
                    className="bg-transparent hover:bg-red-500 text-red-900 hover:text-white w-8 rounded"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
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
