// EstoqueDropdown.jsx (implementação semelhante ao FuncionarioDropdown)
import React, { useState, useEffect } from 'react';

const EstoqueDropdown = ({ onSelectEstoque, selectedEstoqueID }) => {
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    fetchEstoques();
  }, []);

  const fetchEstoques = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/estoque`);
      if (!response.ok) {
        throw new Error('Erro ao buscar estoques');
      }
      const data = await response.json();
      setEstoques(data);
    } catch (error) {
      console.error('Erro ao buscar estoques:', error);
    }
  };

  return (
    <select
      value={selectedEstoqueID}
      onChange={(e) => onSelectEstoque(e.target.value)}
      className="w-full p-2 border rounded"
      required
    >
      <option value="">Selecione um estoque</option>
      {estoques.map(estoque => (
        <option key={estoque.id} value={estoque.id}>
          {estoque.nome}
        </option>
      ))}
    </select>
  );
};

export default EstoqueDropdown;
