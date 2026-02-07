import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import ProdutoDropdown from "../Dropdown/ProdutoDropdown";

const ListaCompras = ({ userId, produtosSelecionados = [], onClose }) => {
  const [totalValor, setTotalValor] = useState(0);
  const [produtos, setProdutos] = useState([]);

  // Iniciar produtos com quantidade 0 e apenas dados necessários
  useEffect(() => {
    if (produtosSelecionados.length > 0) {
      const produtosIniciais = produtosSelecionados.map((produto) => ({
        produtoid: produto.produtoid,
        nomeproduto: produto.nomeproduto,
        valorproduto: produto.valorproduto,
        quantidade: 0,
      }));
      setProdutos(produtosIniciais);
    }
  }, [produtosSelecionados]);

  // Calcular o valor total do carrinho em tempo real
  useEffect(() => {
    let total = 0;
    produtos.forEach((produto) => {
      total +=
        parseFloat(produto.quantidade) * parseFloat(produto.valorproduto);
    });
    setTotalValor(total);
  }, [produtos]);

  // Atualiza a quantidade do produto quando o usuário modificar o input
  const handleQuantidadeChange = (index, event) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = parseInt(event.target.value, 10);
    setProdutos(novosProdutos);
  };

  // Adicionar um novo produto à lista de compras
  const adicionarProduto = async (produtoId) => {
    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/produto/${produtoId}`,
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do produto");
      }
      const [produto] = await response.json();
      const novoProduto = {
        produtoid: produto.produtoid,
        nomeproduto: produto.nomeproduto,
        valorproduto: produto.valorproduto,
        quantidade: 0,
      };

      setProdutos((prevProdutos) => {
        if (
          prevProdutos.some((prod) => prod.produtoid === novoProduto.produtoid)
        ) {
          alert("O produto já está na lista de compras");
          return prevProdutos;
        }
        return [...prevProdutos, novoProduto];
      });
    } catch (error) {
      console.error("Erro ao adicionar produto à lista de compras:", error);
    }
  };

  // Remover um produto da lista de compras
  const removerProduto = (index) => {
    const novosProdutos = [...produtos];
    novosProdutos.splice(index, 1);
    setProdutos(novosProdutos);
  };

  // Estrutura de dados para o CSV
  const csvData = [
    ...produtos.map((produto) => ({
      Nome: produto.nomeproduto,
      Quantidade: produto.quantidade,
      "Preço Unitário": parseFloat(produto.valorproduto).toFixed(2),
      "Valor Total": (produto.quantidade * produto.valorproduto).toFixed(2),
    })),
    { Nome: "Total", "Valor Total": totalValor.toFixed(2) },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md max-w-lg w-full md:max-w-screen-md lg:max-w-screen-lg relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Lista de Compras</h2>
        <div className="mb-4">
          <ProdutoDropdown onSelectProduto={adicionarProduto} />
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Nome do Produto</th>
                <th className="py-2">Quantidade</th>
                <th className="py-2">Valor Unitário (R$)</th>
                <th className="py-2">Valor Total (R$)</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtos.map((produto, index) => (
                <tr key={produto.produtoid}>
                  <td className="py-2 text-center">{produto.nomeproduto}</td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      value={produto.quantidade}
                      onChange={(e) => handleQuantidadeChange(index, e)}
                      className="w-10 text-right p-1 ml-4"
                    />
                  </td>
                  <td className="py-2 text-center">
                    {parseFloat(produto.valorproduto).toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    {(produto.quantidade * produto.valorproduto).toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => removerProduto(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="font-semibold">
            Valor Total: R${" "}
            <span className="font-extrabold text-red-500">
              {parseFloat(totalValor).toFixed(2)}
            </span>
          </span>
          <CSVLink
            data={csvData}
            filename={`lista-compras-${userId}.csv`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Exportar CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default ListaCompras;
