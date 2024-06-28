import React, { useState, useEffect } from 'react';
import EstoqueForm from './EstoqueForm';
import ProdutoEstoqueList from '../produtoestoque/ProdutoEstoqueList';

const EstoqueSkeleton = () => {
  return (
    <div className="border p-4 rounded shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded w-1/2"></div>
      <div className="flex mt-4 space-x-2">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const EstoquesList = () => {
  const [estoques, setEstoques] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEstoque, setCurrentEstoque] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('list');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEstoques();
  }, []);

  const fetchEstoques = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/estoque`);
      if (!response.ok) {
        throw new Error('Failed to fetch estoques');
      }
      const data = await response.json();
      setEstoques(data);
    } catch (error) {
      console.error('Error fetching estoques:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEstoque = (estoque) => {
    setCurrentEstoque(estoque);
    setIsFormVisible(true);
  };

  const deleteEstoque = async (estoqueId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/estoque/${estoqueId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete estoque');
      }
      // Remove o estoque da lista atualizada
      setEstoques(prevEstoques => prevEstoques.filter(e => e.id !== estoqueId));
    } catch (error) {
      console.error('Error deleting estoque:', error);
    }
  };

  const addEstoque = () => {
    setCurrentEstoque(null);
    setIsFormVisible(true);
  };

  const handleVerProdutosClick = (estoqueId) => {
    setCurrentComponent('produtoEstoque');
    setCurrentEstoque(estoqueId);
  };

  const handleVoltarClick = () => {
    setCurrentComponent('list'); // Define o estado de volta para a lista de estoques
  };

  return (
    <div>
      {currentComponent === 'list' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Lista de Estoques</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={addEstoque}
          >
            Adicionar Estoque
          </button>
          <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            // Exibir skeletons enquanto os produtos estão sendo carregados
            Array.from({ length: 6 }).map((_, index) => (
              <EstoqueSkeleton key={index} />
            ))
          ) : (
            estoques.map(estoque => (
                <div key={estoque.id} className="border p-4 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{estoque.nome}</h3>
                  {estoque.descricao && <p className="text-gray-600">{estoque.descricao}</p>}
                  <p className="text-gray-700 mt-2">Local: {estoque.local}</p>
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => updateEstoque(estoque)}
                    >
                      Atualizar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => deleteEstoque(estoque.id)}
                    >
                      Excluir
                    </button>
                    {/* Adicione o link para ver produtos */}
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => handleVerProdutosClick(estoque.id)}
                    >
                      Ver Produtos
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {isFormVisible && (
            <EstoqueForm
              estoque={currentEstoque}
              onSubmit={() => {
                // Atualiza a lista após adicionar ou atualizar
                fetchEstoques();
                setIsFormVisible(false);
              }}
              onClose={() => setIsFormVisible(false)}
            />
          )}
        </div>
      )}

      {currentComponent === 'produtoEstoque' && (
        <ProdutoEstoqueList
          estoqueId={currentEstoque}
          onVoltarClick={handleVoltarClick} // Passa a função de voltar como prop
        />
      )}
    </div>
  );
};

export default EstoquesList;
