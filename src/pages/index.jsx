// pages/index.jsx
import { useState } from 'react';
import Header from '../componentes/Header';
import Home from '../componentes/Home';
import Login from '../componentes/Login';
import ProdutoList from '../componentes/produto/ProdutoList';
import FuncionarioList from '../componentes/funcionario/FuncionarioList';
import EstoqueList from '../componentes/estoque/EstoqueList';
import MovimentacoesList from '../componentes/movimentacoes/MovimentacoesList';

const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState('home');
  const [userId, setUserId] = useState(null); // ID do usuário logado
  const [userAccessLevel, setUserAccessLevel] = useState(0); // Nível de acesso do usuário

  const handleSuccessLogin = () => {
    // Define o componente a ser renderizado após o login bem-sucedido
    switch (userAccessLevel) {
      case 0:
        setCurrentComponent('login'); // Exemplo: pode redirecionar para um componente específico para nível 0
        break;
      case 1:
        setCurrentComponent('produtos'); // Exemplo: pode redirecionar para um componente específico para nível 1
        break;
      case 2:
        setCurrentComponent('funcionarios'); // Exemplo: pode redirecionar para um componente específico para nível 2
        break;
      default:
        setCurrentComponent('home'); // Página inicial por padrão
        break;
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login setUserId={setUserId} setUserAccessLevel={setUserAccessLevel} onSuccessLogin={handleSuccessLogin} onChangeComponent={handleChangeComponent} />;
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
  const shouldFullWidth = currentComponent === 'home' || currentComponent === 'login';

  console.log(`userId: ${userId}`);
  console.log(`userAccessLevel: ${userAccessLevel}`);

  return (
    <div>
      <Header currentComponent={currentComponent} onChangeComponent={handleChangeComponent} userAccessLevel={userAccessLevel} />
      <div className={shouldFullWidth ? 'w-full h-screen' : 'flex-1 overflow-y-auto container mx-auto mt-20'}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default IndexPage;