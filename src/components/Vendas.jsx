export default function Vendas() {
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel de Vendas</h2>

            {/* Resumo simbólico */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Vendas no mês</h3>
                    <p className="text-2xl font-bold text-green-600">R$ 18.750,00</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Pedidos</h3>
                    <p className="text-2xl font-bold text-blue-600">47</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Ticket médio</h3>
                    <p className="text-2xl font-bold text-purple-600">R$ 398,93</p>
                </div>
            </div>

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
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">01/08/2025</td>
                            <td className="p-3">Ana Silva</td>
                            <td className="p-3">Caloi Strada Carbon</td>
                            <td className="p-3 text-green-600">R$ 5.200,00</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">30/07/2025</td>
                            <td className="p-3">Carlos Souza</td>
                            <td className="p-3">Monark Urban</td>
                            <td className="p-3 text-green-600">R$ 1.250,00</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">28/07/2025</td>
                            <td className="p-3">Maria Santos</td>
                            <td className="p-3">Caloi Tahoe 21 Marchas"</td>
                            <td className="p-3 text-green-600">R$ 2.100,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Botão ilustrativo */}
            <div className="flex justify-center mt-8">
                <button className="bg-black text-white text-lg hover:opacity-60 cursor-pointer px-8 py-3 rounded-md">
                    Registrar Nova Venda
                </button>
            </div>
        </div>
    );
}
