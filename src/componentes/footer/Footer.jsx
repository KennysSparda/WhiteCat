import BtnLinkedin from "./ButtonLinkedin";

const Footer = () => {
  return (
    <footer className="bg-gray-800 h-30 text-white text-sm py-8 relative bottom-0 w-full z-30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-4">
          <BtnLinkedin />
        </div>

        <p className="pl-44 text-center md:text-left">
          © 2024 Kenny Vargas. Todos os direitos reservados.
        </p>
        {/* Seção das informações de atualização e versão */}
        <div className="text-center md:text-right text-gray-500">
          {/* Informações de atualização e versão */}
          <p className="mb-2">Versão: 0.0.129</p>
          <p className="mb-2">Atualizado em 28/06/2024 | Campo Largo, PR</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
