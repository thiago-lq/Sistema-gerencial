import { useState } from "react";
import CadastrarFornecedor from "./CadastrarFornecedor";
import ListaDeFornecedor from "./ListaDeFornecedor";
export default function CadastroFornecedor({ aoSalvar, listaFornecedor, fornecedorEditar, excluirFornecedor, resetarFormularioFornecedor, salvarEdicao, modalEditarFornecedor, editarFornecedor, setEditarFornecedor }) {
    const [tabMenu, setTabMenu] = useState("CadastrarFornecedor")
    
    
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl">
            <div>
                <div className="flex gap-10 bg-white w-full shadow-lg">
                    <button
                        className={`p-5 ${
                            tabMenu === "CadastrarFornecedor"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("CadastrarFornecedor")}
                        >
                        Cadastrar Fornecedor
                    </button>
                    <button
                        className={`p-5 ${
                            tabMenu === "ListaFornecedor"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("ListaFornecedor")}
                        >
                        Lista de Fornecedor
                    </button>
                </div>
            </div>
            {tabMenu === "CadastrarFornecedor" && 
                <CadastrarFornecedor
                    aoSalvar={aoSalvar}
                    resetarFormularioFornecedor={resetarFormularioFornecedor}
                />
            }
            {tabMenu === "ListaFornecedor" &&
                <ListaDeFornecedor
                    listaFornecedor={listaFornecedor}
                    fornecedorEditar={fornecedorEditar}
                    excluirFornecedor={excluirFornecedor}
                    salvarEdicao={salvarEdicao}
                    modalEditarFornecedor={modalEditarFornecedor}
                    editarFornecedor={editarFornecedor}
                    setEditarFornecedor={setEditarFornecedor}
                />
            }
        </div>
    )
}