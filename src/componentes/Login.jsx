// components/Login.js
import { useState } from 'react';

const Login = ({ setUserId, setUserAccessLevel, onSuccessLogin, onChangeComponent }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/funcionario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: username, senha: password }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha incorretos');
      }

      const data = await response.json();
      setUserId(data.id); // Define o ID do usuário logado
      setUserAccessLevel(data.nivelacesso); // Define o nível de acesso do usuário logado

      // Redirecionar para o home após login bem-sucedido
      onSuccessLogin();
      onChangeComponent('home')
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError(error.message); // Exibir mensagem de erro
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Logo */}
      <div className=" top-8 left-0 right-0 z-10 flex justify-center">
        <img
          className="mt-20 w-72 "
          src="/img/logo.jpeg"
          alt="Logo"
        />
      </div>

      {/* Formulário de login */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              required
            />
          </div>
          {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded-md">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default Login;
