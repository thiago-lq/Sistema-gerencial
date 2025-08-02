export default function Financeiro() {
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel Financeiro</h2>

            {/* Resumo simbólico */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Saldo Atual</h3>
                    <p className="text-2xl font-bold text-green-600">R$ 12.500,00</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Entradas</h3>
                    <p className="text-2xl font-bold text-blue-600">R$ 5.000,00</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-gray-700">Saídas</h3>
                    <p className="text-2xl font-bold text-red-600">R$ 2.300,00</p>
                </div>
            </div>

            {/* Tabela de lançamentos simbólica */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Lançamentos Recentes</h3>
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
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">01/08/2025</td>
                            <td className="p-3">Venda simbólica</td>
                            <td className="p-3 text-green-600">+ R$ 2.000,00</td>
                            <td className="p-3">Entrada</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">28/07/2025</td>
                            <td className="p-3">Compra de suprimentos</td>
                            <td className="p-3 text-red-600">- R$ 500,00</td>
                            <td className="p-3">Saída</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3">25/07/2025</td>
                            <td className="p-3">Serviço prestado</td>
                            <td className="p-3 text-green-600">+ R$ 1.500,00</td>
                            <td className="p-3">Entrada</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Botão simbólico */}
            <div className="flex justify-center mt-8">
                <button className="bg-black text-white text-lg hover:opacity-60 cursor-pointer px-8 py-3 rounded-md">
                    Exportar Relatório
                </button>
            </div>
        </div>
    );
}
