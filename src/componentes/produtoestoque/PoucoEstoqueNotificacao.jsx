import React, { useState } from 'react';
import ListaDeCompras from '../listadecompras/ListaDeCompras';

const PoucoEstoqueNotificacao = ({ products, onClose }) => {
  const [showListaDeCompras, setShowListaDeCompras] = useState(false);

  const handleClose = () => {
    onClose(); // Chama a função de fechar passada por props
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Fecha apenas se clicar no fundo (backdrop)
    }
  };

  const handleOpenListaCompras = () => {
   setShowListaDeCompras(true); // Mostra o ListaCompras ao clicar no ícone de ListaCompras
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-white p-4 rounded shadow-md max-w-lg w-full md:max-w-screen-md lg:max-w-screen-lg relative">
        <button className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800" onClick={handleClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Produtos com Estoque Baixo</h2>
        <ul className="divide-y divide-gray-200">
          {products.map(produto => (
            <li key={produto.produtoestoqueid} className="py-2">
              <div className="flex justify-between items-center">
                <span>{produto.nomeproduto}</span>
                <span>Quantidade: {produto.quantidade}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleOpenListaCompras}>
            Adicionar a Lista de Compras
          </button>
        </div>
      </div>
      {showListaDeCompras && <ListaDeCompras userId={null} produtosSelecionados={products} onClose={() => setShowListaDeCompras(false)} />}
    </div>
  );
};

export default PoucoEstoqueNotificacao;
