import FornecedoresEditar from "./FornecedoresEditar";

export default function ListaDeFornecedor({listaFornecedor, fornecedorEditar, excluirFornecedor, salvarEdicao, modalEditarFornecedor, editarFornecedor, setEditarFornecedor}) {
    return(
        <div className="mt-5 w-full max-w-7xl p-6 bg-white rounded-2xl shadow-xl ">
            <div className="justify-between items-center mb-6 flex">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Fornecedores</h2>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-center">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                    <tr>
                       <th className="p-3">Nome</th>
                       <th className="p-3">CPF ou CNPJ</th>
                       <th className="p-3">Email</th>
                       <th className="p-3">Telefone</th>
                       <th className="p-3">Opções</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {listaFornecedor.map((p) => (
                        <tr key={p.id}
                            className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition">
                            <td className="p-3 font-medium capitalize">{p.nome}</td>
                            <td className="p-3 font-medium capitalize">{p.cnpjCpf}</td>
                            <td className="p-3 font-medium capitalize">{p.email}</td>
                            <td className="p-3 font-medium capitalize">{p.telefone}</td>
                            <td className="p-3 space-x-3">
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                        onClick={() => fornecedorEditar(p)}
                                        >
                                    Editar
                                </button>
                                <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                                        onClick={() => excluirFornecedor(p.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <FornecedoresEditar
                modalEditarFornecedor={modalEditarFornecedor}
                salvarEdicao={salvarEdicao}
                editarFornecedor={editarFornecedor}
                setEditarFornecedor={setEditarFornecedor}
                aoFechar={() => setEditarFornecedor(false)}
            />
        </div>
    )
}