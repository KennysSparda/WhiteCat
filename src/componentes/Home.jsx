// components/Home.jsx

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="absolute top-20 left-0 transform -translate-y-1/2 w-full text-center z-20 text-white">
        <h2 className="oxanium-font text-3xl font-bold">
          Bem-vindo ao Sistema de Gestão
        </h2>
        <h1 className="text-5xl font-bold mt-4 oxanium-font"><span className="primary-color">self</span>control</h1>
        <h2 className="text-6x1 oxanium-font">
          By
        </h2>
      </div>

      {/* Banner image */}
      <div className="absolute top-40 left-0 right-0 z-20 flex justify-center">
        <img
          className="h-60 w-auto"
          src="/logo.jpg"
          alt="Banner"
        />
      </div>

      {/* Text content */}
      <div className="absolute bottom-20 left-0 right-0 p-8 text-white z-20">
        <p className="text-gray-200">
          Este é um sistema de gestão onde você pode gerenciar produtos, funcionários, estoques e movimentações.
        </p>
        <p className="text-gray-200 mt-4">
          Para começar, utilize o menu acima para navegar entre as diferentes seções do sistema.
        </p>

        <h2 className="text-lg font-bold mt-8">Como utilizar o sistema:</h2>
        <p className="text-gray-200 mt-2">
          Este sistema permite que você gerencie produtos e movimentações de estoque de forma eficiente:
        </p>
        <ul className="list-disc list-inside text-gray-200 mt-2">
          <li>
            <strong>Funcionários:</strong> Utilize a seção de Funcionários para cadastrar novos funcionários, definindo nome e cargo.
          </li>
          <li>
            <strong>Produtos:</strong> Utilize a seção de Produtos para cadastrar novos produtos, definindo nome, descrição e valor.
          </li>
          <li>
            <strong>Estoques:</strong> Utilize a seção de Estoques para cadastrar novos Estoques, definindo nome, descrição e local.
          </li>
          <li>
            <strong>Movimentações:</strong> Na seção de Movimentações, registre entradas e saídas de produtos nos Estoques. Inclua informações como data, quantidade de produtos e o funcionário responsável.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
