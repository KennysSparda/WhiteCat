import React, { useState, useEffect } from 'react';
import ProdutoDropdown from '../Dropdown/ProdutoDropdown';
import EstoqueDropdown from '../Dropdown/EstoqueDropdown';
import FuncionarioDropdown from '../Dropdown/FuncionarioDropdown';

const GetToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(formattedDate)) {
    throw new Error('Data inválida');
  }

  return formattedDate;
};

const ProductForm = ({ product, onSubmit, onClose }) => {
  const [data, setData] = useState(GetToday());
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [produtoID, setProdutoID] = useState('');
  const [funcionarioID, setFuncionarioID] = useState('');
  const [estoqueID, setEstoqueID] = useState('');

  useEffect(() => {
    if (product) {
      setData(product.Data || GetToday());
      setQuantidade(product.Quantidade || '');
      setTipo(product.Tipo ? 'entrada' : 'saida');
      setProdutoID(product.fk_Produto_ID || '');
      setFuncionarioID(product.fk_Funcionario_ID || '');
      setEstoqueID(product.fk_Estoque_ID || '');
    } else {
      setData(GetToday());
      setQuantidade('');
      setTipo('entrada');
      setProdutoID('');
      setFuncionarioID('');
      setEstoqueID('');
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const movimentacaoData = {
      Data: data,
      Quantidade: parseInt(quantidade),
      fk_Tipo_ID: tipo === 'entrada' ? 1 : 2, // Converte tipo para ID correspondente
      fk_Produto_ID: parseInt(produtoID),
      fk_Funcionario_ID: parseInt(funcionarioID),
      fk_Estoque_ID: parseInt(estoqueID),
    };
  
    onSubmit(movimentacaoData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Atualizar Movimentação' : 'Adicionar Movimentação'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  value="entrada"
                  checked={tipo === 'entrada'}
                  onChange={() => setTipo('entrada')}
                  className="mr-2"
                />
                Entrada
              </label>
              <label>
                <input
                  type="radio"
                  value="saida"
                  checked={tipo === 'saida'}
                  onChange={() => setTipo('saida')}
                  className="mr-2"
                />
                Saída
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Produto</label>
            <ProdutoDropdown
              onSelectProduto={setProdutoID}
              selectedProdutoID={produtoID}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Funcionário</label>
            <FuncionarioDropdown
              onSelectFuncionario={setFuncionarioID}
              selectedFuncionarioID={funcionarioID}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estoque</label>
            <EstoqueDropdown
              onSelectEstoque={setEstoqueID}
              selectedEstoqueID={estoqueID}
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
              {product ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
