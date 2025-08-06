import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/configs";

export default function Financeiro() {
  const [lancamentos, setLancamentos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");

  // Totais calculados
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const saldoAtual = totalEntradas - totalSaidas;

  useEffect(() => {
    const lancamentosQuery = query(
      collection(db, "LancamentosFinanceiros"),
      orderBy("data", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(lancamentosQuery, (snapshot) => {
      const lancs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLancamentos(lancs);

      // Calcular totais
      let entradas = 0;
      let saidas = 0;
      lancs.forEach((l) => {
        if (l.tipo === "entrada") entradas += Number(l.valor);
        else if (l.tipo === "saida") saidas += Number(l.valor);
      });
      setTotalEntradas(entradas);
      setTotalSaidas(saidas);
    });

    return () => unsubscribe();
  }, []);

  async function adicionarLancamento(e) {
    e.preventDefault();
    if (!descricao || !valor || isNaN(valor)) {
      alert("Preencha a descrição e o valor corretamente.");
      return;
    }

    try {
      await addDoc(collection(db, "LancamentosFinanceiros"), {
        descricao,
        valor: parseFloat(valor),
        tipo,
        data: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });
      setDescricao("");
      setValor("");
      setTipo("entrada");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar lançamento.");
    }
  }

  return (
    <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel Financeiro</h2>

      {/* Resumo dinâmico */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Saldo Atual</h3>
          <p className="text-2xl font-bold text-green-600">
            R$ {saldoAtual.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Entradas</h3>
          <p className="text-2xl font-bold text-blue-600">
            R$ {totalEntradas.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Saídas</h3>
          <p className="text-2xl font-bold text-red-600">
            R$ {totalSaidas.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Formulário para adicionar lançamento */}
      <form
        onSubmit={adicionarLancamento}
        className="bg-white p-6 rounded-xl shadow-lg mb-10 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <input
          type="text"
          placeholder="Descrição"
          className="border-2 border-black rounded p-2"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Valor"
          className="border-2 border-black rounded p-2"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border-2 border-black rounded p-2"
          required
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button
          type="submit"
          className="col-span-full bg-black text-white px-8 py-3 rounded-md hover:opacity-70"
        >
          Adicionar Lançamento
        </button>
      </form>

      {/* Tabela de lançamentos recentes */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Lançamentos Recentes
        </h3>
        <table className="min-w-full border-separate border-spacing-y-2 text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-3">Data</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Tipo</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {lancamentos.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center">
                  Nenhum lançamento registrado
                </td>
              </tr>
            )}
            {lancamentos.map((l) => (
              <tr
                key={l.id}
                className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition"
              >
                <td className="p-3">
                  {new Date(l.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-3">{l.descricao}</td>
                <td
                  className={`p-3 font-semibold ${
                    l.tipo === "entrada" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {l.tipo === "entrada" ? "+ " : "- "}R$ {parseFloat(l.valor).toFixed(2)}
                </td>
                <td className="p-3 capitalize">{l.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
