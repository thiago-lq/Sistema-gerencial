import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/configs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardGeral() {
  const [tab, setTab] = useState("clientes");
  const [clientes, setClientes] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // === CLIENTES ===
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Clientes"), (snap) => {
      const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClientes(lista);
    });
    return () => unsub();
  }, []);

  async function alterarStatusCliente(id, novoStatus) {
    const ref = doc(db, "Clientes", id);
    await updateDoc(ref, { status: novoStatus });
  }

  const clientesResumo = {
    novos: clientes.filter((c) => c.status === "Novo").length,
    negociando: clientes.filter((c) => c.status === "Em negociação").length,
    fechados: clientes.filter((c) => c.status === "Fechado").length,
  };

  // === FORNECEDORES ===
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Fornecedores"), (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        status: doc.data().status || "Ativo",
        ...doc.data(),
      }));
      setFornecedores(lista);
    });
    return () => unsub();
  }, []);

  async function alterarStatusFornecedor(id, novoStatus) {
    const ref = doc(db, "Fornecedores", id);
    await updateDoc(ref, { status: novoStatus });
  }

  const fornecedoresResumo = {
    ativos: fornecedores.filter((f) => f.status === "Ativo").length,
    inativos: fornecedores.filter((f) => f.status === "Inativo").length,
  };

  // === PRODUTOS ===
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Produtos"), (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        status: doc.data().status || "Disponível",
        ...doc.data(),
      }));
      setProdutos(lista);
    });
    return () => unsub();
  }, []);

  async function alterarStatusProduto(id, novoStatus) {
    const ref = doc(db, "Produtos", id);
    await updateDoc(ref, { status: novoStatus });
  }

  const produtosResumo = {
    disponiveis: produtos.filter((p) => p.status === "Disponível").length,
    esgotados: produtos.filter((p) => p.status === "Esgotado").length,
  };

  const cores = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="relative max-w-7xl h-auto bg-gradient-to-br from-gray-50 to-gray-100 mx-auto mt-8 rounded-2xl shadow-lg p-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setTab("clientes")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            tab === "clientes"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setTab("fornecedores")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            tab === "fornecedores"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Fornecedores
        </button>
        <button
          onClick={() => setTab("produtos")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            tab === "produtos"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Produtos
        </button>
      </div>

      {tab === "clientes" && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard de Clientes
            <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full"></span>
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResumoCard 
              titulo="Novos" 
              valor={clientesResumo.novos} 
              cor="text-blue-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>}
            />
            <ResumoCard 
              titulo="Em Negociação" 
              valor={clientesResumo.negociando} 
              cor="text-yellow-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>}
            />
            <ResumoCard 
              titulo="Fechados" 
              valor={clientesResumo.fechados} 
              cor="text-green-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            />
          </div>

          {/* Gráfico */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GraficoPizza
              dados={[
                { name: "Novos", value: clientesResumo.novos },
                { name: "Em negociação", value: clientesResumo.negociando },
                { name: "Fechados", value: clientesResumo.fechados },
              ]}
              cores={cores}
            />
            
            {/* Tabela */}
            <TabelaClientes clientes={clientes} alterarStatus={alterarStatusCliente} />
          </div>
        </div>
      )}

      {tab === "fornecedores" && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard de Fornecedores
            <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResumoCard 
              titulo="Total" 
              valor={fornecedores.length} 
              cor="text-gray-900" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>}
            />
            <ResumoCard 
              titulo="Ativos" 
              valor={fornecedoresResumo.ativos} 
              cor="text-green-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
            />
            <ResumoCard 
              titulo="Inativos" 
              valor={fornecedoresResumo.inativos} 
              cor="text-red-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GraficoPizza
              dados={[
                { name: "Ativos", value: fornecedoresResumo.ativos },
                { name: "Inativos", value: fornecedoresResumo.inativos },
              ]}
              cores={["#22c55e", "#ef4444"]}
            />
            
            <TabelaFornecedores fornecedores={fornecedores} alterarStatus={alterarStatusFornecedor} />
          </div>
        </div>
      )}

      {tab === "produtos" && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard de Produtos
            <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResumoCard 
              titulo="Total" 
              valor={produtos.length} 
              cor="text-gray-900" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>}
            />
            <ResumoCard 
              titulo="Disponíveis" 
              valor={produtosResumo.disponiveis} 
              cor="text-green-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
            />
            <ResumoCard 
              titulo="Esgotados" 
              valor={produtosResumo.esgotados} 
              cor="text-red-600" 
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GraficoPizza
              dados={[
                { name: "Disponíveis", value: produtosResumo.disponiveis },
                { name: "Esgotados", value: produtosResumo.esgotados },
              ]}
              cores={["#22c55e", "#ef4444"]}
            />
            
            <TabelaProdutos produtos={produtos} alterarStatus={alterarStatusProduto} />
          </div>
        </div>
      )}
    </div>
  );
}

// ==== COMPONENTES AUXILIARES ====

function ResumoCard({ titulo, valor, cor, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{titulo}</h3>
          <p className={`text-3xl font-bold mt-2 ${cor}`}>{valor}</p>
        </div>
        <div className={`p-3 rounded-full ${cor.replace('text', 'bg').replace('-600', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function GraficoPizza({ dados, cores }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={60}
            labelLine={false}
            // remove o label aqui para evitar sobreposição
          >
            {dados.map((_, index) => (
              <Cell key={index} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}`, 'Quantidade']}
            contentStyle={{
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ marginTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function TabelaClientes({ clientes, alterarStatus }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Últimos Clientes</h3>
        <span className="text-sm text-gray-500">Total: {clientes.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.slice(0, 5).map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    c.status === "Novo"
                      ? "bg-blue-100 text-blue-800"
                      : c.status === "Em negociação"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={c.status}
                    onChange={(e) => alterarStatus(c.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Novo">Novo</option>
                    <option value="Em negociação">Em negociação</option>
                    <option value="Fechado">Fechado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaFornecedores({ fornecedores, alterarStatus }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Últimos Fornecedores</h3>
        <span className="text-sm text-gray-500">Total: {fornecedores.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fornecedores.slice(0, 5).map((f) => (
              <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{f.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{f.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{f.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    f.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={f.status}
                    onChange={(e) => alterarStatus(f.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaProdutos({ produtos, alterarStatus }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Últimos Produtos</h3>
        <span className="text-sm text-gray-500">Total: {produtos.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produtos.slice(0, 5).map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {p.preco}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    p.status === "Disponível" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={p.status}
                    onChange={(e) => alterarStatus(p.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Esgotado">Esgotado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}