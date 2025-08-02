export default function FornecedoresEditar({modalEditarFornecedor, salvarEdicao, editarFornecedor, setEditarFornecedor, aoFechar}) {
    if (!modalEditarFornecedor || !editarFornecedor) return null;
    
    return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-3">
        <div className="bg-white p-3 gap-5 rounded-xl w-full max-w-md relative shadow-lg">
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Editar Fornecedor</h3>
                <button className="text-xl font-bold mb-6 hover:bg-black hover:text-white rounded-2xl px-2 text-center"
                        onClick={aoFechar}>
                    <h1>X</h1>
                </button>
            </div>
            
            <form onSubmit={salvarEdicao} className="space-y-3">
                <h1>Nome</h1>
                <input type="text"
                        placeholder="Digite o nome"
                        value={editarFornecedor.nome}
                        onChange={(e) => 
                            setEditarFornecedor({
                                ...editarFornecedor,
                                nome: e.target.value,
                            })
                        }
                        className="w-full p-2 border-2 border-black rounded-lg bg-white"
                        required>
                </input>
                <h1>CNPJ ou CPF</h1>
                <input type="text"
                        placeholder="Digite o CPF ou CNPJ"
                        value={editarFornecedor.cnpjCpf}
                        onChange={(e) =>
                            setEditarFornecedor({
                                ...editarFornecedor,
                                cnpjCpf: e.target.value
                            })
                        }
                        className="w-full border-2 border-black rounded-lg p-2 bg-white"
                        required>
                </input>
                <h1>Telefone</h1>
                <input type="tel"
                        value={editarFornecedor.telefone}
                        placeholder="Digite o número"
                        onChange={(e) =>
                            setEditarFornecedor({
                                ...editarFornecedor,
                                telefone: e.target.value,
                            })
                        }
                        className="w-full p-2 border-2 border-black rounded-lg bg-white"
                        required>
                </input>
                <h1>E-mail</h1>
                <input type="email"
                        value={editarFornecedor.email}
                        placeholder="Digite o e-mail"
                        onChange={(e) => 
                            setEditarFornecedor({
                                ...editarFornecedor,
                                email: e.target.value
                            })
                        }
                        className="w-full border-2 border-black rounded-lg p-2 bg-white"
                        required>
                </input>
                <h1>Endereço</h1>
                <input type="text"
                        value={editarFornecedor.endereco}
                        placeholder="Digite o endereço"
                        onChange={(e) => setEditarFornecedor({
                            ...editarFornecedor,
                            endereco: e.target.value
                        })}
                        className="w-full border-2 border-black rounded-lg bg-white p-2"
                        required>
                </input>
                <h1>CEP</h1>
                <input type="tel"
                        placeholder="Digite o cep"
                        value={editarFornecedor.cep}
                        onChange={(e) => setEditarFornecedor({
                            ...editarFornecedor,
                            cep: e.target.value
                        })}
                        className="w-full border-2 border-black rounded-lg bg-white p-2"
                        required>
                </input>
                <div className="flex justify-between">
                    <div className="w-6"></div>
                    <button type="submit" className="w-[150px] bg-black text-white text-lg hover:opacity-60 cursor-pointer px-4 py-2 rounded-md">
                        Salvar
                    </button>
                    <div className="w-6"></div>
                </div>
            </form>
        </div>
    </div>
    )
}