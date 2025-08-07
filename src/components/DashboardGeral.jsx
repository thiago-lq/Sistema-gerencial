import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/configs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setTab("clientes")}
          className={`p-3 rounded-md font-semibold ${
            tab === "clientes" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setTab("fornecedores")}
          className={`p-3 rounded-md font-semibold ${
            tab === "fornecedores" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Fornecedores
        </button>
        <button
          onClick={() => setTab("produtos")}
          className={`p-3 rounded-md font-semibold ${
            tab === "produtos" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Produtos
        </button>
      </div>

      {tab === "clientes" && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard de Clientes
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <ResumoCard titulo="Novos" valor={clientesResumo.novos} cor="text-blue-600" />
            <ResumoCard titulo="Em Negociação" valor={clientesResumo.negociando} cor="text-yellow-600" />
            <ResumoCard titulo="Fechados" valor={clientesResumo.fechados} cor="text-green-600" />
          </div>

          {/* Gráfico */}
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
      )}

      {tab === "fornecedores" && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard de Fornecedores
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <ResumoCard titulo="Total" valor={fornecedores.length} cor="text-gray-900" />
            <ResumoCard titulo="Ativos" valor={fornecedoresResumo.ativos} cor="text-green-600" />
            <ResumoCard titulo="Inativos" valor={fornecedoresResumo.inativos} cor="text-red-600" />
          </div>

          <GraficoPizza
            dados={[
              { name: "Ativos", value: fornecedoresResumo.ativos },
              { name: "Inativos", value: fornecedoresResumo.inativos },
            ]}
            cores={["#22c55e", "#ef4444"]}
          />

          <TabelaFornecedores fornecedores={fornecedores} alterarStatus={alterarStatusFornecedor} />
        </div>
      )}

      {tab === "produtos" && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard de Produtos
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <ResumoCard titulo="Total" valor={produtos.length} cor="text-gray-900" />
            <ResumoCard titulo="Disponíveis" valor={produtosResumo.disponiveis} cor="text-green-600" />
            <ResumoCard titulo="Esgotados" valor={produtosResumo.esgotados} cor="text-red-600" />
          </div>

          <GraficoPizza
            dados={[
              { name: "Disponíveis", value: produtosResumo.disponiveis },
              { name: "Esgotados", value: produtosResumo.esgotados },
            ]}
            cores={["#22c55e", "#ef4444"]}
          />

          <TabelaProdutos produtos={produtos} alterarStatus={alterarStatusProduto} />
        </div>
      )}
    </div>
  );
}

// ==== COMPONENTES AUXILIARES ====

function ResumoCard({ titulo, valor, cor }) {
  return (
    <div className="bg-white shadow p-4 rounded-xl text-center">
      <h3 className="font-semibold text-gray-700">{titulo}</h3>
      <p className={`text-2xl font-bold ${cor}`}>{valor}</p>
    </div>
  );
}

function GraficoPizza({ dados, cores }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribuição</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={dados} dataKey="value" nameKey="name" outerRadius={120} label>
            {dados.map((_, index) => (
              <Cell key={index} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function TabelaClientes({ clientes, alterarStatus }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Últimos Clientes</h3>
      <table className="min-w-full border-separate border-spacing-y-2 text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Email</th>
            <th className="p-3">Telefone</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {clientes.slice(0, 5).map((c) => (
            <tr key={c.id} className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">{c.nome}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.telefone}</td>
              <td
                className={`p-3 font-semibold ${
                  c.status === "Novo"
                    ? "text-blue-600"
                    : c.status === "Em negociação"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {c.status}
              </td>
              <td className="p-3">
                <select
                  value={c.status}
                  onChange={(e) => alterarStatus(c.id, e.target.value)}
                  className="border border-gray-300 rounded p-1"
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
  );
}

function TabelaFornecedores({ fornecedores, alterarStatus }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Últimos Fornecedores</h3>
      <table className="min-w-full border-separate border-spacing-y-2 text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Email</th>
            <th className="p-3">Telefone</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {fornecedores.slice(0, 5).map((f) => (
            <tr key={f.id} className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">{f.nome}</td>
              <td className="p-3">{f.email}</td>
              <td className="p-3">{f.telefone}</td>
              <td
                className={`p-3 font-semibold ${
                  f.status === "Ativo" ? "text-green-600" : "text-red-600"
                }`}
              >
                {f.status}
              </td>
              <td className="p-3">
                <select
                  value={f.status}
                  onChange={(e) => alterarStatus(f.id, e.target.value)}
                  className="border border-gray-300 rounded p-1"
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
  );
}

function TabelaProdutos({ produtos, alterarStatus }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Últimos Produtos</h3>
      <table className="min-w-full border-separate border-spacing-y-2 text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {produtos.slice(0, 5).map((p) => (
            <tr key={p.id} className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">{p.nome}</td>
              <td className="p-3">{p.categoria}</td>
              <td className="p-3">R$ {p.preco}</td>
              <td
                className={`p-3 font-semibold ${
                  p.status === "Disponível" ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.status}
              </td>
              <td className="p-3">
                <select
                  value={p.status}
                  onChange={(e) => alterarStatus(p.id, e.target.value)}
                  className="border border-gray-300 rounded p-1"
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
  );
}
