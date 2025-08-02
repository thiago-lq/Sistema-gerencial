export default function CRM() {
  return (
    <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">CRM - Gestão de Clientes</h2>

      {/* Resumo rápido */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Novos Contatos</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Em Negociação</h3>
          <p className="text-2xl font-bold text-yellow-600">7</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h3 className="font-semibold text-gray-700">Negócios Fechados</h3>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
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
            <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">João Pedro</td>
              <td className="p-3">joao@example.com</td>
              <td className="p-3">(11) 99999-1234</td>
              <td className="p-3 text-blue-600 font-semibold">Novo</td>
            </tr>
            <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">Ana Clara</td>
              <td className="p-3">ana.clara@example.com</td>
              <td className="p-3">(21) 98888-5678</td>
              <td className="p-3 text-yellow-600 font-semibold">Em negociação</td>
            </tr>
            <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
              <td className="p-3">Carlos Eduardo</td>
              <td className="p-3">carlos.edu@example.com</td>
              <td className="p-3">(31) 97777-4321</td>
              <td className="p-3 text-green-600 font-semibold">Fechado</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Botão ilustrativo */}
      <div className="flex justify-center mt-8">
        <button className="bg-black text-white text-lg hover:opacity-60 cursor-pointer px-8 py-3 rounded-md">
          Adicionar Contato
        </button>
      </div>
    </div>
  );
}
