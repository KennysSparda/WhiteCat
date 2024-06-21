// src/components/Header.js

import Link from 'next/link';

const Header = ({ onChangeComponent }) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Sistema de Gestão</h1>
        <nav className="space-x-4">
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={() => onChangeComponent('home')}
          >
            Home
          </span>
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={() => onChangeComponent('produtos')}
          >
            Produtos
          </span>
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={() => onChangeComponent('funcionarios')}
          >
            Funcionários
          </span>
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={() => onChangeComponent('estoques')}
          >
            Estoques
          </span>
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={() => onChangeComponent('movimentacoes')}
          >
            Movimentações
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
