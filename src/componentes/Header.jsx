// src/components/Header.js

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = ({ currentComponent, onChangeComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define 768 como breakpoint para mobile
    };

    handleResize(); // Chama uma vez para definir o estado inicial
    window.addEventListener('resize', handleResize); // Adiciona um listener de resize

    return () => {
      window.removeEventListener('resize', handleResize); // Remove o listener no cleanup
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (component) => {
    return currentComponent === component
      ? 'primary-color cursor-pointer'
      : 'text-white hover:text-gray-500 cursor-pointer';
  };

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl a-space-demo-font text-white">
          <span className="primary-color">self</span>control
        </h1>
        {isMobile ? (
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        ) : (
          <nav className="space-x-4">
            <span
              className={getLinkClass('home')}
              onClick={() => onChangeComponent('home')}
            >
              Início
            </span>
            <span
              className={getLinkClass('about')}
              onClick={() => onChangeComponent('about')}
            >
              Sobre
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
        )}
      </div>

      {isMobile && (
        <motion.nav
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 md:items-center md:w-auto mt-4 md:mt-0">
            <motion.span
              className={`block md:inline-block ${getLinkClass('home')}`}
              onClick={() => {
                onChangeComponent('home');
                setIsOpen(false);
              }}
            >
              Início
            </motion.span>
            <motion.span
              className={`block md:inline-block ${getLinkClass('about')}`}
              onClick={() => {
                onChangeComponent('about');
                setIsOpen(false);
              }}
            >
              Sobre
            </motion.span>
            <motion.span
              className={`block md:inline-block ${getLinkClass('produtos')}`}
              onClick={() => {
                onChangeComponent('produtos');
                setIsOpen(false);
              }}
            >
              Materiais
            </motion.span>
            <motion.span
              className={`block md:inline-block ${getLinkClass('funcionarios')}`}
              onClick={() => {
                onChangeComponent('funcionarios');
                setIsOpen(false);
              }}
            >
              Funcionários
            </motion.span>
            <motion.span
              className={`block md:inline-block ${getLinkClass('estoques')}`}
              onClick={() => {
                onChangeComponent('estoques');
                setIsOpen(false);
              }}
            >
              Estoques
            </motion.span>
            <motion.span
              className={`block md:inline-block ${getLinkClass('movimentacoes')}`}
              onClick={() => {
                onChangeComponent('movimentacoes');
                setIsOpen(false);
              }}
            >
              Movimentações
            </motion.span>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
