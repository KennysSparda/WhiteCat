// src/componentes/funcionarios/FuncionariosForm.jsx

import React, { useState, useEffect } from 'react';

const FuncionariosForm = ({ funcionario, onSubmit, onClose }) => {
  const URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL
  const PORT= process.env.NEXT_PUBLIC_PORT
  
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.Nome || '');
      setCargo(funcionario.Cargo || '');
    } else {
      setNome('');
      setCargo('');
    }
  }, [funcionario]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const funcionarioData = {
      nome: nome,
      cargo: cargo
    };

    onSubmit(funcionarioData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{funcionario ? 'Atualizar Funcionário' : 'Adicionar Funcionário'}</h2>
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
              {funcionario ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuncionariosForm;

