// FuncionariosDropdown.jsx
import React, { useState, useEffect } from "react";

const FuncionariosDropdown = ({
  onSelectFuncionario,
  selectedFuncionarioID,
}) => {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/funcionario`,
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar funcionários");
      }
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  return (
    <select
      value={selectedFuncionarioID}
      onChange={(e) => onSelectFuncionario(e.target.value)}
      className="w-full p-2 border rounded"
      required
    >
      <option value="">Selecione um funcionário</option>
      {funcionarios.map((funcionario) => (
        <option key={funcionario.id} value={funcionario.id}>
          {funcionario.nome}
        </option>
      ))}
    </select>
  );
};

export default FuncionariosDropdown;
