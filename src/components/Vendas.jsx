import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/configs";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeVenda, setQuantidadeVenda] = useState(1);
  const [clienteSelecionado, setClienteSelecionado] = useState("");

  // Dados para resumo
  const [totalVendasMes, setTotalVendasMes] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  // Carrega produtos e clientes do Firestore
  useEffect(() => {
    const unsubProdutos = onSnapshot(collection(db, "Produtos"), (snapshot) => {
      setProdutos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubClientes = onSnapshot(collection(db, "Clientes"), (snapshot) => {
      setClientes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Consulta para pegar últimas 10 vendas ordenadas pela data
    const vendasQuery = query(
      collection(db, "Vendas"),
      orderBy("data", "desc"),
      limit(10)
    );
    const unsubVendas = onSnapshot(vendasQuery, (snapshot) => {
      const vendasList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVendas(vendasList);

      // Calcula resumo do mês atual
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      const vendasMes = vendasList.filter((v) => {
        const dataVenda = new Date(v.data);
        return dataVenda.getMonth() === mesAtual && dataVenda.getFullYear() === anoAtual;
      });

      const totalVendasMesCalc = vendasMes.reduce((acc, v) => acc + v.total, 0);
      const totalPedidosCalc = vendasMes.length;
      const ticketMedioCalc = totalPedidosCalc ? totalVendasMesCalc / totalPedidosCalc : 0;

      setTotalVendasMes(totalVendasMesCalc);
      setTotalPedidos(totalPedidosCalc);
      setTicketMedio(ticketMedioCalc);
    });

    return () => {
      unsubProdutos();
      unsubClientes();
      unsubVendas();
    };
  }, []);

  async function registrarVenda(e) {
    e.preventDefault();

    if (!produtoSelecionado || !clienteSelecionado || quantidadeVenda <= 0) {
      alert("Selecione produto, cliente e quantidade válida.");
      return;
    }

    const produto = produtos.find((p) => p.id === produtoSelecionado);
    if (!produto) {
      alert("Produto não encontrado.");
      return;
    }

    if (produto.quantidade < quantidadeVenda) {
      alert("Quantidade insuficiente em estoque.");
      return;
    }

    try {
      const produtoRef = doc(db, "Produtos", produtoSelecionado);
      await updateDoc(produtoRef, {
        quantidade: produto.quantidade - quantidadeVenda,
      });

      const venda = {
        produtoId: produtoSelecionado,
        produtoNome: produto.nome,
        clienteId: clienteSelecionado,
        quantidade: quantidadeVenda,
        precoUnitario: produto.preco,
        total: produto.preco * quantidadeVenda,
        data: new Date().toISOString(),
      };
      await addDoc(collection(db, "Vendas"), venda);

      alert("Venda registrada com sucesso!");
      setProdutoSelecionado("");
      setClienteSelecionado("");
      setQuantidadeVenda(1);
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar venda.");
    }
  }

  return (
    <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel de Vendas</h2>

      {/* Resumo dinâmico */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Vendas no mês</h3>
          <p className="text-2xl font-bold text-green-600">
            R$ {totalVendasMes.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Pedidos</h3>
          <p className="text-2xl font-bold text-blue-600">{totalPedidos}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Ticket médio</h3>
          <p className="text-2xl font-bold text-purple-600">
            R$ {ticketMedio.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Formulário de registro de venda */}
      <form
        onSubmit={registrarVenda}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-lg mb-10"
      >
        <div>
          <label className="block mb-2 font-semibold">Produto</label>
          <select
            className="w-full border-2 border-black rounded p-2"
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione um produto
            </option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} (Estoque: {p.quantidade})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Quantidade</label>
          <input
            type="number"
            min="1"
            max={
              produtoSelecionado
                ? produtos.find((p) => p.id === produtoSelecionado)?.quantidade
                : undefined
            }
            className="w-full border-2 border-black rounded p-2"
            value={quantidadeVenda}
            onChange={(e) => setQuantidadeVenda(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Cliente</label>
          <select
            className="w-full border-2 border-black rounded p-2"
            value={clienteSelecionado}
            onChange={(e) => setClienteSelecionado(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione um cliente
            </option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-full flex justify-center mt-6">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-md hover:opacity-70"
          >
            Registrar Venda
          </button>
        </div>
      </form>

      {/* Tabela de vendas recentes */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Vendas Recentes</h3>
        <table className="min-w-full border-separate border-spacing-y-2 text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-3">Data</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Produto</th>
              <th className="p-3">Valor</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {vendas.map((v) => (
              <tr
                key={v.id}
                className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition"
              >
                <td className="p-3">
                  {new Date(v.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-3">
                  {clientes.find((c) => c.id === v.clienteId)?.nome || "Desconhecido"}
                </td>
                <td className="p-3">{v.produtoNome}</td>
                <td className="p-3 text-green-600">
                  R$ {parseFloat(v.total).toFixed(2)}
                </td>
              </tr>
            ))}
            {vendas.length === 0 && (
              <tr>
                <td className="p-3 text-center" colSpan={4}>
                  Nenhuma venda recente
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
