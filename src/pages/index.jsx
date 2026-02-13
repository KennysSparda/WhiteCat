import { useEffect, useState } from "react";
import { decodeJwt } from "../utils/decodeJwt";
import Header from "../componentes/Header";
import Home from "../componentes/Home";
import Login from "../componentes/Login";
import ProdutoList from "../componentes/produto/ProdutoList";
import FuncionarioList from "../componentes/funcionario/FuncionarioList";
import EstoqueList from "../componentes/estoque/EstoqueList";
import MovimentacoesList from "../componentes/movimentacoes/MovimentacoesList";

const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState("home");
  const [userId, setUserId] = useState(null);
  const [userAccessLevel, setUserAccessLevel] = useState(0);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserId(null);
      setUserAccessLevel(0);
      setIsAuthReady(true);
      return;
    }

    try {
      const decoded = decodeJwt(token);

      if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userAccessLevel");
        setUserId(null);
        setUserAccessLevel(0);
        setIsAuthReady(true);
        return;
      }

      const id = decoded?.sub ? Number(decoded.sub) : null;
      const nivel =
        decoded?.nivelacesso != null ? Number(decoded.nivelacesso) : 1;

      setUserId(id);
      setUserAccessLevel(nivel);

      localStorage.setItem("userId", String(id ?? ""));
      localStorage.setItem("userAccessLevel", String(nivel));

      setIsAuthReady(true);
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userAccessLevel");
      setUserId(null);
      setUserAccessLevel(0);
      setIsAuthReady(true);
    }
  }, []);

  const handleChangeComponent = (component) => {
    const token = localStorage.getItem("token");

    const privateRoutes = [
      "produtos",
      "estoques",
      "movimentacoes",
      "funcionarios",
    ];
    const adminRoutes = ["funcionarios"];

    if (privateRoutes.includes(component) && !token) {
      setCurrentComponent("login");
      return;
    }

    if (adminRoutes.includes(component) && Number(userAccessLevel) < 2) {
      setCurrentComponent("home");
      return;
    }

    setCurrentComponent(component);
  };

  const handleSuccessLogin = ({ id, nivel, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", String(id));
    localStorage.setItem("userAccessLevel", String(nivel));

    setUserId(id);
    setUserAccessLevel(nivel);

    if (nivel === 2) setCurrentComponent("funcionarios");
    else if (nivel === 1) setCurrentComponent("produtos");
    else setCurrentComponent("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userAccessLevel");

    setUserId(null);
    setUserAccessLevel(0);
    setCurrentComponent("home");
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "home":
        return <Home />;
      case "login":
        return (
          <Login
            onSuccessLogin={handleSuccessLogin}
            onChangeComponent={handleChangeComponent}
          />
        );
      case "funcionarios":
        return <FuncionarioList />;
      case "produtos":
        return <ProdutoList />;
      case "estoques":
        return <EstoqueList />;
      case "movimentacoes":
        return <MovimentacoesList />;
      default:
        return <Home />;
    }
  };

  const shouldFullWidth =
    currentComponent === "home" || currentComponent === "login";

  if (!isAuthReady) return <div className="w-full h-screen bg-black" />;

  return (
    <div>
      <Header
        currentComponent={currentComponent}
        onChangeComponent={handleChangeComponent}
        userAccessLevel={userAccessLevel}
        onLogout={handleLogout}
      />
      <div
        className={
          shouldFullWidth
            ? "w-full h-screen"
            : "flex-1 overflow-y-auto container mx-auto mt-20"
        }
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default IndexPage;
