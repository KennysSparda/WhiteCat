// pages/index.js

import { useState } from 'react';
import Header from '../componentes/Header';
import Home from '../componentes/Home';
import ProductsList from '../componentes/produtos/ProductList';
import FuncionariosList from '../componentes/funcionarios/funcionariosList'
import EstoquesList from '../componentes/estoques/estoquesList'
import MovimentacoesList from '../componentes/movimentacoes/MovimentacoesList'

// Importar outros componentes conforme necessário

const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState('home');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home />;
      case 'funcionarios':
        return <FuncionariosList />
      case 'produtos':
        return <ProductsList />;
      case 'estoques':
        return <EstoquesList />

      case 'movimentacoes':
          return <MovimentacoesList />;
      // Adicionar outros cases conforme necessário
      default:
        return <Home />;
    }
  };

  const handleChangeComponent = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div>
      <Header onChangeComponent={handleChangeComponent} /> {/* Passando a prop onChangeComponent para o Header */}
      <div className="container mx-auto mt-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default IndexPage;
