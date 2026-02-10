// components/Header.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ListaCompras from "../componentes/listadecompras/ListaDeCompras"; // Importe o componente ListaCompras

const Header = ({ currentComponent, onChangeComponent, userAccessLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showListaCompras, setShowListaCompras] = useState(false); // Estado para controlar visibilidade do ListaCompras

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define 768 como breakpoint para mobile
    };

    handleResize(); // Chama uma vez para definir o estado inicial
    window.addEventListener("resize", handleResize); // Adiciona um listener de resize

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener no cleanup
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleListaCompras = () => {
    setShowListaCompras(!showListaCompras); // Inverte o estado de visibilidade do ListaCompras
  };

  const handleCloseListaCompras = () => {
    setShowListaCompras(false); // Fecha o ListaCompras
  };

  const getLinkClass = (component) => {
    return currentComponent === component
      ? "primary-color cursor-pointer"
      : "text-white hover:text-gray-500 cursor-pointer";
  };

  const renderLoggedInButtons = () => {
    switch (userAccessLevel) {
      case 0:
        return (
          <a
            className="text-white hover:text-gray-500 cursor-pointer"
            onClick={() => onChangeComponent("login")}
          >
            Login
          </a>
        );
      case 1:
        return (
          <>
            <span
              className={getLinkClass("produtos")}
              onClick={() => onChangeComponent("produtos")}
            >
              Materiais
            </span>
            <span
              className={getLinkClass("estoques")}
              onClick={() => onChangeComponent("estoques")}
            >
              Estoques
            </span>
            <span
              className={getLinkClass("movimentacoes")}
              onClick={() => onChangeComponent("movimentacoes")}
            >
              Movimentações
            </span>
            <button
              className="text-white hover:text-gray-500 cursor-pointer"
              onClick={toggleListaCompras}
            >
              Lista de Compras
            </button>

            <button
              className="text-white hover:text-gray-500 cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        );
      case 2:
        return (
          <>
            <span
              className={getLinkClass("funcionarios")}
              onClick={() => onChangeComponent("funcionarios")}
            >
              Funcionários
            </span>
            <span
              className={getLinkClass("produtos")}
              onClick={() => onChangeComponent("produtos")}
            >
              Materiais
            </span>
            <span
              className={getLinkClass("estoques")}
              onClick={() => onChangeComponent("estoques")}
            >
              Estoques
            </span>
            <span
              className={getLinkClass("movimentacoes")}
              onClick={() => onChangeComponent("movimentacoes")}
            >
              Movimentações
            </span>
            <button
              className="text-white hover:text-gray-500 cursor-pointer"
              onClick={toggleListaCompras}
            >
              Lista de Compras
            </button>
            <button
              className="text-white hover:text-gray-500 cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Lógica para deslogar o usuário
    // Redirecionar para a página de login
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-3xl a-space-demo-font text-white cursor-pointer"
          onClick={() => onChangeComponent("home")}
        >
          <span className="primary-color">self</span>
          <span className="hover-primary-color">control</span>
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
            {/* Renderiza botões diferentes com base no nível de acesso */}
            {renderLoggedInButtons()}
          </nav>
        )}
      </div>

      {isMobile && (
        <motion.nav
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 md:items-center md:w-auto mt-4 md:mt-0">
            {/* Renderiza botões diferentes com base no nível de acesso */}
            {renderLoggedInButtons()}
          </div>
        </motion.nav>
      )}
      {/* ListaCompras - renderiza se showListaCompras for true */}
      {showListaCompras && <ListaCompras onClose={handleCloseListaCompras} />}
    </header>
  );
};

export default Header;
