import React, { useState, useEffect } from "react";

const FuncionarioForm = ({ funcionario, fetchFuncionarios, onClose }) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelacesso, setNivelAcesso] = useState(1);

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome || "");
      setCargo(funcionario.cargo || "");
      setUsuario(funcionario.usuario || "");
      // Não preencha a senha por segurança
      setSenha("");
      setNivelAcesso(funcionario.nivelacesso || 0);
    } else {
      // Limpar os campos ao adicionar um novo funcionário
      setNome("");
      setCargo("");
      setUsuario("");
      setSenha("");
      setNivelAcesso(0);
    }
  }, [funcionario]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const funcionarioData = {
      nome,
      cargo,
      usuario,
      senha: senha || undefined,
      nivelacesso,
    };

    try {
      let response;
      if (funcionario) {
        response = await fetch(
          `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/funcionario/${funcionario.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(funcionarioData),
          },
        );
      } else {
        response = await fetch(
          `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/funcionario`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(funcionarioData),
          },
        );
      }

      if (!response.ok) {
        const errorMessage = funcionario
          ? "Falha ao atualizar funcionário"
          : "Falha ao adicionar funcionário";
        const errorData = await response.json();
        if (errorData.message === "Usuário já existe") {
          alert("Usuário já existe. Escolha outro usuário.");
        } else {
          throw new Error(errorMessage);
        }
      } else {
        fetchFuncionarios();
        onClose();
      }
    } catch (error) {
      console.error("Erro ao enviar funcionário:", error);
      alert("Erro ao enviar funcionário: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          {funcionario ? "Atualizar Funcionário" : "Adicionar Funcionário"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cargo</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 border rounded"
              required={!funcionario} // Senha é obrigatória apenas ao adicionar um novo funcionário
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nível de Acesso</label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  value={0}
                  checked={nivelacesso == 0}
                  onChange={(e) => setNivelAcesso(Number(e.target.value))}
                />
                Comum
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value={1}
                  checked={nivelacesso == 1}
                  onChange={(e) => setNivelAcesso(Number(e.target.value))}
                />
                Estoquista
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value={2}
                  checked={nivelacesso == 2}
                  onChange={(e) => setNivelAcesso(Number(e.target.value))}
                />
                Administrador
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {funcionario ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuncionarioForm;
