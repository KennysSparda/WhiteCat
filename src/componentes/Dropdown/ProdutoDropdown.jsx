import React, { useState, useEffect } from "react";

const ProdutoDropdown = ({ onSelectProduto, selectedProdutoID }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/produto`,
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <select
      value={selectedProdutoID}
      onChange={(e) => onSelectProduto(e.target.value)}
      className="w-full p-2 border rounded text-black"
      required
    >
      <option value="">Selecione um produto</option>
      {produtos.map((produto) => (
        <option key={produto.id} value={produto.id}>
          {produto.nome}
        </option>
      ))}
    </select>
  );
};

export default ProdutoDropdown;
