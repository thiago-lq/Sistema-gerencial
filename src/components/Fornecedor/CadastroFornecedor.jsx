import { useState } from "react";
import CadastrarFornecedor from "./CadastrarFornecedor";
import ListaDeFornecedor from "./ListaDeFornecedor";
import RelatorioFornecedores from "./RelatoriosFonecedores";

export default function CadastroFornecedor({ aoSalvar, listaFornecedor, fornecedorEditar, excluirFornecedor, resetarFormularioFornecedor, salvarEdicao, modalEditarFornecedor, editarFornecedor, setEditarFornecedor, fornecedores }) {
    const [tabMenu, setTabMenu] = useState("CadastrarFornecedor")
    
    
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl">
            <div>
                <div className="flex gap-10 bg-white w-full shadow-lg">
                    <button
                        className={`p-5 hover:opacity-60 cursor-pointer transition text-lg ${
                            tabMenu === "CadastrarFornecedor"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("CadastrarFornecedor")}
                        >
                        Cadastrar Fornecedor
                    </button>
                    <button
                        className={`p-5 hover:opacity-60 text-lg transition cursor-pointer ${
                            tabMenu === "ListaFornecedor"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("ListaFornecedor")}
                        >
                        Lista de Fornecedor
                    </button>
                    <button
                        className={`p-5 hover:opacity-60 text-lg transition cursor-pointer ${
                            tabMenu === "RelatorioFornecedores" ? "font-bold p-3" : ""
                        }`}
                        onClick={() => setTabMenu("RelatorioFornecedores")}
                        >
                        <p>Relatório Fornecedores</p>
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
            {tabMenu === "RelatorioFornecedores" && 
                <RelatorioFornecedores fornecedores={fornecedores}/>
            }
        </div>
    )
}