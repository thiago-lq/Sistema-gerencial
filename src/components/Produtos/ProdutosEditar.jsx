export default function ProdutosEditar({modalEditarProduto, salvarEdicao, editarProduto, setEditarProduto, aoFechar}) {
    if (!modalEditarProduto || !editarProduto) return null;
    
    return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-3">
        <div className="bg-white p-3 gap-5 rounded-xl w-full max-w-md relative shadow-lg">
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Editar Produto</h3>
                <button className="text-xl font-bold mb-6 hover:bg-black hover:text-white rounded-2xl px-2 text-center"
                        onClick={aoFechar}>
                    <h1>X</h1>
                </button>
            </div>
            
            <form onSubmit={salvarEdicao} className="space-y-3">
                <h1>Nome</h1>
                <input type="text"
                        placeholder="Digite o nome"
                        value={editarProduto.nome}
                        onChange={(e) => 
                            setEditarProduto({
                                ...editarProduto,
                                nome: e.target.value,
                            })
                        }
                        className="w-full p-2 border-2 border-black rounded-lg bg-white"
                        required>
                </input>
                <h1>Código</h1>
                <input type="text"
                        placeholder="Digite o código"
                        value={editarProduto.codigo}
                        onChange={(e) =>
                            setEditarProduto({
                                ...editarProduto,
                                codigo: e.target.value
                            })
                        }
                        className="w-full border-2 border-black rounded-lg p-2 bg-white"
                        required>
                </input>
                <h1>Imagem</h1>
                <input type="url"
                        value={editarProduto.imagem}
                        placeholder="Digite a URL da imagem"
                        onChange={(e) =>
                            setEditarProduto({
                                ...editarProduto,
                                imagem: e.target.value,
                            })
                        }
                        className="w-full p-2 border-2 border-black rounded-lg bg-white"
                        required>
                </input>
                <h1>Preço</h1>
                <input type="number"
                        value={editarProduto.preco}
                        placeholder="Digite o preço"
                        onChange={(e) => 
                            setEditarProduto({
                                ...editarProduto,
                                preco: e.target.value
                            })
                        }
                        className="w-full border-2 border-black rounded-lg p-2 bg-white"
                        min="0"
                        step="0.01"
                        required>
                </input>
                <h1>Quantidade</h1>
                <input type="number"
                        value={editarProduto.quantidade}
                        placeholder="Digite a quantidade"
                        onChange={(e) => setEditarProduto({
                            ...editarProduto,
                            quantidade: e.target.value
                        })}
                        className="w-full border-2 border-black rounded-lg bg-white p-2"
                        required>
                </input>
                <h1>Data de entrada</h1>
                <input type="date"
                        placeholder="dd/mm/aaaa"
                        value={editarProduto.data}
                        onChange={(e) => setEditarProduto({
                            ...editarProduto,
                            data: e.target.value
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