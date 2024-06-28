// src/components/Header.js

import Link from 'next/link';

const Header = ({ currentComponent, onChangeComponent }) => {
  const getLinkClass = (component) => {
    return currentComponent === component
      ? 'primary-color cursor-pointer'
      : 'text-white hover:text-gray-500 cursor-pointer';
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl oxanium-font text-white"><span className="primary-color">self</span>control</h1>
        <nav className="space-x-4">
          <span
            className={getLinkClass('home')}
            onClick={() => onChangeComponent('home')}
          >
            Home
          </span>
          <span
            className={getLinkClass('produtos')}
            onClick={() => onChangeComponent('produtos')}
          >
            Materiais
          </span>
          <span
            className={getLinkClass('funcionarios')}
            onClick={() => onChangeComponent('funcionarios')}
          >
            Funcionários
          </span>
          <span
            className={getLinkClass('estoques')}
            onClick={() => onChangeComponent('estoques')}
          >
            Estoques
          </span>
          <span
            className={getLinkClass('movimentacoes')}
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
