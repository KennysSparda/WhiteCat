import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ListaCompras from "../componentes/listadecompras/ListaDeCompras";
import { apiFetch } from "../utils/apiFetch";

const getBrasiliaHour = () => {
  const hourStr = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    hour12: false,
  }).format(new Date());

  return Number(hourStr);
};

const getDayTimeLabel = (hour) => {
  if (hour >= 5 && hour <= 11) return "Bom dia";
  if (hour >= 12 && hour <= 17) return "Boa tarde";
  return "Boa noite";
};

export function useHeaderGreeting() {
  const [dayTime, setDayTime] = useState("");
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    setDayTime(getDayTimeLabel(getBrasiliaHour()));

    const cached = (() => {
      try {
        const raw = localStorage.getItem("user.cache");
        if (!raw) return null;
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })();

    if (cached?.name) setUser({ name: cached.name });

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    const fetchUser = async () => {
      try {
        const res = await apiFetch(
          `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/funcionario/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!res.ok) return;

        const data = await res.json();
        console.log(data.nome);
        const nextUser = {
          nome: data.nome,
        };
        console.log(nextUser.nome);
        if (!nextUser.nome) return;

        setUser(nextUser.nome);

        try {
          localStorage.setItem("user.cache", JSON.stringify(nextUser.nome));
        } catch {}
      } catch {}
    };

    fetchUser();
  });
  return { dayTime, user };
}

const Header = ({
  currentComponent,
  onChangeComponent,
  userAccessLevel,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showListaCompras, setShowListaCompras] = useState(false);

  const { dayTime, user } = useHeaderGreeting(userAccessLevel);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen((v) => !v);
  const toggleListaCompras = () => setShowListaCompras((v) => !v);
  const handleCloseListaCompras = () => setShowListaCompras(false);

  const getLinkClass = (component) => {
    return currentComponent === component
      ? "primary-color cursor-pointer"
      : "text-white hover:text-gray-500 cursor-pointer";
  };

  const level = Number(userAccessLevel || 0);

  const greetingText = useMemo(() => {
    if (level <= 0) return "";
    const name = user?.name ? `, ${user.name}` : "";
    return `Olá, ${dayTime}${name}!`;
  }, [dayTime, level, user?.name]);

  const renderLoggedInButtons = () => {
    if (level === 0) {
      return (
        <span
          className="text-white hover:text-gray-500 cursor-pointer"
          onClick={() => onChangeComponent("login")}
        >
          Login
        </span>
      );
    }

    return (
      <>
        {level >= 2 && (
          <span
            className={getLinkClass("funcionarios")}
            onClick={() => onChangeComponent("funcionarios")}
          >
            Funcionários
          </span>
        )}

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
          type="button"
        >
          Lista de Compras
        </button>

        <button
          className="text-white hover:text-gray-500 cursor-pointer"
          onClick={onLogout}
          type="button"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50 p-4">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <h1
          className="text-3xl a-space-demo-font text-white cursor-pointer"
          onClick={() => onChangeComponent("home")}
        >
          <span className="primary-color">self</span>
          <span className="hover-primary-color">control</span>
        </h1>

        {greetingText ? (
          <span className="text-white/80 text-sm sm:text-base whitespace-nowrap">
            {dayTime} {user} !
          </span>
        ) : (
          <span />
        )}

        {isMobile ? (
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              type="button"
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
          <nav className="space-x-4">{renderLoggedInButtons()}</nav>
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
            {renderLoggedInButtons()}
          </div>
        </motion.nav>
      )}

      {showListaCompras && <ListaCompras onClose={handleCloseListaCompras} />}
    </header>
  );
};

export default Header;
