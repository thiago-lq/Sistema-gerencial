import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/configs";

const STATUS_OPTIONS = [
  "Novo",
  "Em negociação",
  "Em andamento",
  "Fechado",
  "Perdido",
];

export default function CRM() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Clientes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "Novo",
      }));
      setClientes(lista);
    });

    return () => unsubscribe();
  }, []);

  async function alterarStatus(id, novoStatus) {
    try {
      const clienteRef = doc(db, "Clientes", id);
      await updateDoc(clienteRef, { status: novoStatus });
      // Como o onSnapshot está ativo, a UI atualiza automaticamente, sem precisar setar estado manualmente
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status. Tente novamente.");
    }
  }

  // Contagem dos status atuais
  const contagemStatus = {};
  STATUS_OPTIONS.forEach((status) => {
    contagemStatus[status] = clientes.filter((c) => c.status === status).length;
  });

  // Mapeia cores para status, facilita manter
  const statusColors = {
    "Novo": "text-blue-600",
    "Em negociação": "text-yellow-600",
    "Em andamento": "text-purple-600",
    "Fechado": "text-green-600",
    "Perdido": "text-red-600",
  };

  return (
    <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">CRM - Gestão de Clientes</h2>

      {/* Resumo rápido */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        {STATUS_OPTIONS.map((status) => (
          <div key={status} className="bg-white shadow p-4 rounded-xl text-center">
            <h3 className="font-semibold text-gray-700">{status}</h3>
            <p className={`text-2xl font-bold ${statusColors[status]}`}>
              {contagemStatus[status]}
            </p>
          </div>
        ))}
      </div>

      {/* Tabela de contatos */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contatos Recentes</h3>
        <table className="min-w-full border-separate border-spacing-y-2 text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition"
              >
                <td className="p-3">{cliente.nome}</td>
                <td className="p-3">{cliente.email}</td>
                <td className="p-3">{cliente.telefone || cliente.celular}</td>
                <td className="p-3">
                  <select
                    value={cliente.status}
                    onChange={(e) => alterarStatus(cliente.id, e.target.value)}
                    className={`font-semibold rounded border p-1 ${
                      statusColors[cliente.status]
                    }`}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
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
