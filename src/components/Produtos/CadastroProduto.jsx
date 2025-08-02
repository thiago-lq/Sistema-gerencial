import { useState } from "react";
import CadastrarProduto from "./CadastrarProduto";
import ListaDeProdutos from "./ListaDeProdutos";
export default function CadastroProduto({ aoSalvar, listaProduto, produtoEditar, excluirProduto, resetarFormularioProduto, salvarEdicao, modalEditarProduto, editarProduto, setEditarProduto }) {
    const [tabMenu, setTabMenu] = useState("CadastrarProduto")
    
    
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl">
            <div>
                <div className="flex gap-10 bg-white w-full shadow-lg">
                    <button
                        className={`p-5 ${
                            tabMenu === "CadastrarProduto"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("CadastrarProduto")}
                        >
                        Cadastrar Produto
                    </button>
                    <button
                        className={`p-5 ${
                            tabMenu === "ListaProduto"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("ListaProduto")}
                        >
                        Lista de Produto
                    </button>
                </div>
            </div>
            {tabMenu === "CadastrarProduto" && 
                <CadastrarProduto
                    aoSalvar={aoSalvar}
                    resetarFormularioProduto={resetarFormularioProduto}
                />
            }
            {tabMenu === "ListaProduto" &&
                <ListaDeProdutos
                    listaProduto={listaProduto}
                    produtoEditar={produtoEditar}
                    excluirProduto={excluirProduto}
                    salvarEdicao={salvarEdicao}
                    modalEditarProduto={modalEditarProduto}
                    editarProduto={editarProduto}
                    setEditarProduto={setEditarProduto}
                />
            }
        </div>
    )
}