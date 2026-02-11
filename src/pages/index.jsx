// pages/index.jsx
import { useEffect, useState } from "react"
import Header from "../componentes/Header"
import Home from "../componentes/Home"
import Login from "../componentes/Login"
import ProdutoList from "../componentes/produto/ProdutoList"
import FuncionarioList from "../componentes/funcionario/FuncionarioList"
import EstoqueList from "../componentes/estoque/EstoqueList"
import MovimentacoesList from "../componentes/movimentacoes/MovimentacoesList"

const IndexPage = () => {
  const [currentComponent, setCurrentComponent] = useState("home")
  const [userId, setUserId] = useState(null)
  const [userAccessLevel, setUserAccessLevel] = useState(null) // null = desconhecido ainda
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    // carrega sessão do localStorage
    const token = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")
    const storedLevel = localStorage.getItem("userAccessLevel")

    if (token && storedUserId && storedLevel) {
      setUserId(Number(storedUserId))
      setUserAccessLevel(Number(storedLevel))
    } else {
      setUserId(null)
      setUserAccessLevel(0)
    }

    setIsAuthReady(true)
  }, [])

  const handleChangeComponent = (component) => {
    // bloqueia rotas privadas se não tiver login
    const privateRoutes = ["produtos", "estoques", "funcionarios", "movimentacoes"]
    const token = localStorage.getItem("token")

    if (privateRoutes.includes(component) && !token) {
      setCurrentComponent("login")
      return
    }

    setCurrentComponent(component)
  }

  const handleSuccessLogin = ({ id, nivel, token }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userId", String(id))
    localStorage.setItem("userAccessLevel", String(nivel))

    setUserId(id)
    setUserAccessLevel(nivel)

    // redireciona baseado no nível (use o valor recebido, não o state)
    if (nivel === 2) setCurrentComponent("funcionarios")
    else if (nivel === 1) setCurrentComponent("produtos")
    else setCurrentComponent("home")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userAccessLevel")

    setUserId(null)
    setUserAccessLevel(0)
    setCurrentComponent("home")
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "home":
        return <Home />
      case "login":
        return (
          <Login
            onSuccessLogin={handleSuccessLogin}
            onChangeComponent={handleChangeComponent}
          />
        )
      case "funcionarios":
        return <FuncionarioList />
      case "produtos":
        return <ProdutoList />
      case "estoques":
        return <EstoqueList />
      case "movimentacoes":
        return <MovimentacoesList />
      default:
        return <Home />
    }
  }

  const shouldFullWidth = currentComponent === "home" || currentComponent === "login"

  if (!isAuthReady) {
    return <div className="w-full h-screen bg-black" />
  }

  return (
    <div>
      <Header
        currentComponent={currentComponent}
        onChangeComponent={handleChangeComponent}
        userAccessLevel={userAccessLevel}
        onLogout={handleLogout}
      />
      <div className={shouldFullWidth ? "w-full h-screen" : "flex-1 overflow-y-auto container mx-auto mt-20"}>
        {renderComponent()}
      </div>
    </div>
  )
}

export default IndexPage
