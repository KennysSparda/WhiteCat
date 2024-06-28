// pages/index.jsx

import { useState } from 'react';
import Header from '../componentes/Header';
import Home from '../componentes/Home';
import About from '../componentes/About'
import ProdutoList from '../componentes/produto/ProdutoList';
import FuncionarioList from '../componentes/funcionario/FuncionarioList';
import EstoqueList from '../componentes/estoque/EstoqueList';
import MovimentacoesList from '../componentes/movimentacoes/MovimentacoesList';


const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState('home');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />
      case 'funcionarios':
        return <FuncionarioList />;
      case 'produtos':
        return <ProdutoList />;
      case 'estoques':
        return <EstoqueList />;
      case 'movimentacoes':
        return <MovimentacoesList />;
      default:
        return <Home />;
    }
  };

  const handleChangeComponent = (component) => {
    setCurrentComponent(component);
  };

  // Determina se o componente deve ocupar a largura total ou ter margens
  const shouldFullWidth = currentComponent === 'home' || currentComponent === 'about';

  return (
    <div>
      <Header currentComponent={currentComponent} onChangeComponent={handleChangeComponent} />
      <div className={shouldFullWidth ? 'w-full h-screen' : 'flex-1 overflow-y-auto container mx-auto mt-20'}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default IndexPage;
