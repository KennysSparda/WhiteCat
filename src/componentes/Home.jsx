// components/Home.jsx

const Home = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema de Gestão</h2>
      <p className="text-gray-700">
        Este é um sistema de gestão onde você pode gerenciar produtos, funcionários, estoques e movimentações.
      </p>
      <p className="text-gray-700 mt-4">
        Para começar, utilize o menu acima para navegar entre as diferentes seções do sistema.
      </p>

      <h3 className="text-lg font-bold mt-8">Como utilizar o sistema:</h3>
      <p className="text-gray-700 mt-2">
        Este sistema permite que você gerencie produtos e movimentações de estoque de forma eficiente:
      </p>
      <ul className="list-disc list-inside text-gray-700 mt-2">
      <li>
          <strong>Funcionarios:</strong> Utilize a seção de Funcionarios para cadastrar novos funcionarios, definindo nome, e cargo.
        </li>
        <li>
          <strong>Produtos:</strong> Utilize a seção de Produtos para cadastrar novos produtos, definindo nome, descrição e valor.
        </li>
        <li>
          <strong>Estoques:</strong> Utilize a seção de Estoques para cadastrar novos Estoques, definindo nome, descrição e local.
        </li>
        <li>
          <strong>Movimentações:</strong> Na seção de Movimentações, registre entradas e saídas de produtos nos estoques.
          Inclua informações como data, quantidade de produtos e o funcionário responsável.
        </li>
      </ul>
    </div>
  );
};

export default Home;
