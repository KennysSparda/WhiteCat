import BtnLinkedin from './ButtonLinkedin';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 absolute bottom-0 w-full z-30">
    <div className="container mx-auto flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-center md:space-x-4">
      <BtnLinkedin />
    </div>
    <div className="mt-8 text-center text-gray-500">
      <p className="mb-2">Atualizado em 28/06/2024 | Campo Largo, PR</p>
      <p className="mb-2">Versão do projeto: 0.5.79</p>
      <p>© Kenny Vargas</p>
    </div>
  </footer>
  );
}
