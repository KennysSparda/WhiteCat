// pages/index.js

import { useState } from 'react';
import Header from '../componentes/Header';
import Home from '../componentes/Home';
import ProdutoList from '../componentes/produto/ProdutoList';
import FuncionarioList from '../componentes/funcionario/FuncionarioList'
import EstoqueList from '../componentes/estoque/EstoqueList'
import MovimentacoesList from '../componentes/movimentacoes/MovimentacoesList'

const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState('home');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home />;
      case 'funcionarios':
        return <FuncionarioList />
      case 'produtos':
        return <ProdutoList />;
      case 'estoques':
        return <EstoqueList />
      case 'movimentacoes':
          return <MovimentacoesList />;
      default:
        return <Home />;
    }
  };

  const handleChangeComponent = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div>
      <Header onChangeComponent={handleChangeComponent} />
      <div className="container mx-auto mt-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default IndexPage;
