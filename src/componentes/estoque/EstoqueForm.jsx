import React, { useState, useEffect } from "react";

const EstoqueForm = ({ estoque, onSubmit, onClose }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    if (estoque) {
      setNome(estoque.nome || "");
      setDescricao(estoque.descricao || "");
      setLocal(estoque.local || "");
    } else {
      setNome("");
      setDescricao("");
      setLocal("");
    }
  }, [estoque]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const estoqueData = {
      nome: nome,
      descricao: descricao,
      local: local,
    };

    try {
      let response;
      if (estoque) {
        // Updating existing stock
        response = await fetch(
          `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/estoque/${estoque.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(estoqueData),
          },
        );
      } else {
        // Adding new stock
        response = await fetch(
          `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/estoque`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(estoqueData),
          },
        );
      }

      if (!response.ok) {
        throw new Error(
          estoque ? "Failed to update stock" : "Failed to add stock",
        );
      }

      const updatedEstoque = await response.json();
      onSubmit(updatedEstoque);
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error sending stock:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          {estoque ? "Atualizar Estoque" : "Adicionar Estoque"}
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
            <label className="block text-gray-700">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Localização</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full p-2 border rounded"
            />
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
              {estoque ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstoqueForm;
