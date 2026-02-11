import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "./footer/Footer";

const Home = () => {
  // State para controlar seções visíveis
  const [section1Visible, setSection1Visible] = useState(false);
  const [section2Visible, setSection2Visible] = useState(false);
  const [section3Visible, setSection3Visible] = useState(false);

  // Refs para os elementos das seções
  const refSection1 = useRef();
  const refSection2 = useRef();
  const refSection3 = useRef();

  // Configuração do Intersection Observer para cada seção
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.3, // Quando 30% do elemento está visível
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.3,
  });

  // Efeito para atualizar estado quando a seção está visível
  useEffect(() => {
    if (inView1) setSection1Visible(true);
    if (inView2) setSection2Visible(true);
    if (inView3) setSection3Visible(true);
  }, [inView1, inView2, inView3]);

  return (
    <div className="relative bg-black text-white">
      {/* Background overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={section1Visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="relative text-center py-20 z-20"
        ref={ref1}
      >
        <h2 className="a-space-demo-font text-3xl">
          Bem-vindo ao Sistema de Gestão
        </h2>
        <h1 className="text-5xl font-bold mt-4 a-space-demo-font">
          <span className="primary-color">self</span>control
        </h1>
      </motion.div>

      {/* Banner image with blur effect */}
      <div className="relative z-1 flex justify-center mb-20">
        <img className="h-100 w-auto" src="/img/Home-1.jpg" alt="Banner" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-xl p-8">
        {/* How to use the system */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={section2Visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative mt-8 md:mt-12"
          ref={ref2}
        >
          <div className="relative z-20 bg-gradient-to-r from-gray-700 via-gray-700 via-gray-900 to-blue-600 bg-opacity-75 rounded-3xl p-6 text-center">
            <h2 className="text-3xl font-extrabold text-white a-space-demo-font">
              <span className="primary-color">como utilizar</span> o sistema:
            </h2>
            <p className="text-2xl font-bold mt-4 text-white text-blue">
              Este sistema permite que você gerencie produtos e movimentações de
              estoque de forma eficiente:
            </p>
            <div className="mt-6 text-left">
              <ul className="list-disc list-inside text-white space-y-4">
                <li>
                  <span className="font-bold primary-color">Funcionários:</span>{" "}
                  Utilize a seção de Funcionários para cadastrar novos
                  funcionários, definindo nome e cargo.
                </li>
                <li>
                  <span className="font-bold primary-color">Produtos:</span>{" "}
                  Utilize a seção de Produtos para cadastrar novos produtos,
                  definindo nome, descrição e valor.
                </li>
                <li>
                  <span className="font-bold primary-color">Estoques:</span>{" "}
                  Utilize a seção de Estoques para cadastrar novos Estoques,
                  definindo nome, descrição e local.
                </li>
                <li>
                  <span className="font-bold primary-color">
                    Movimentações:
                  </span>{" "}
                  Na seção de Movimentações, registre entradas e saídas de
                  produtos nos Estoques. Inclua informações como data,
                  quantidade de produtos e o funcionário responsável.
                </li>
              </ul>
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={section2Visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="top-0 left-0 w-full h-full blur-sm"
            src="/img/text-logo.png"
            alt="Background"
          />
          {/* Glass effect overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" />
        </motion.div>

        {/* Behind the scenes */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={section3Visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center mt-16"
          ref={ref3}
        >
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-3xl font-extrabold text-white">
              O que acontece nos bastidores:
            </h2>
            <p className="text-lg text-gray-300 mt-4">
              Por trás de cada operação, nosso sistema realiza uma série de
              processos automatizados que garantem a integridade e a eficiência
              dos dados:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-6 space-y-4">
              <li>
                <span className="font-bold text-white">Funcionários:</span> Ao
                registrar um novo funcionário, o sistema verifica se ele já está
                cadastrado no banco de dados e o adiciona se não estiver
                presente.
              </li>
              <li>
                <span className="font-bold text-white">Produtos:</span> O
                cadastro de produtos passa por rigorosas validações para
                assegurar que cada item tenha um nome único e valores
                apropriados.
              </li>
              <li>
                <span className="font-bold text-white">Estoques:</span> A
                criação de estoques envolve a associação com localizações
                específicas, garantindo a unicidade e a organização de cada
                estoque.
              </li>
              <li>
                <span className="font-bold text-white">Movimentações:</span> As
                entradas e saídas de produtos são registradas com precisão,
                atualizando automaticamente os estoques correspondentes e
                gerenciando a disponibilidade de cada item.
              </li>
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={section3Visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-8 md:mt-0 md:ml-8 flex justify-center"
          >
            <img
              className="w-full h-auto rounded-lg"
              src="/img/Home-2.jpg"
              alt="Behind the scenes"
            />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
