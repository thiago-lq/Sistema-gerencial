import { useState } from "react";
import CadastrarCliente from "./CadastrarCliente";
import ListaDeClientes from "./ListaDeClientes";
export default function CadastroClientes({ aoSalvar, listaCliente, clienteEditar, excluirCliente, resetarFormularioCliente, salvarEdicao, modalEditarCliente, editarCliente, setEditarCliente }) {
    const [tabMenu, setTabMenu] = useState("CadastrarCliente")
    
    
    return (
        <div className="relative max-w-7xl h-auto bg-gray-200 mx-auto mt-15 rounded-xl shadow-2xl">
            <div>
                <div className="flex gap-10 bg-white w-full shadow-lg">
                    <button
                        className={`p-5 hover:opacity-60 cursor-pointer transition text-lg ${
                            tabMenu === "CadastrarCliente"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("CadastrarCliente")}
                        >
                        Cadastrar Cliente
                    </button>
                    <button
                        className={`p-5 hover:opacity-60 cursor-pointer transition text-lg ${
                            tabMenu === "ListaCliente"
                            ? "font-bold p-3"
                            : ""
                        }`}
                        onClick={() => setTabMenu("ListaCliente")}
                        >
                        Lista de Clientes
                    </button>
                </div>
            </div>
            {tabMenu === "CadastrarCliente" && 
                <CadastrarCliente
                    aoSalvar={aoSalvar}
                    resetarFormularioCliente={resetarFormularioCliente}
                />
            }
            {tabMenu === "ListaCliente" &&
                <ListaDeClientes
                    listaCliente={listaCliente}
                    clienteEditar={clienteEditar}
                    excluirCliente={excluirCliente}
                    salvarEdicao={salvarEdicao}
                    modalEditarCliente={modalEditarCliente}
                    editarCliente={editarCliente}
                    setEditarCliente={setEditarCliente}
                />
            }
        </div>
    )
}