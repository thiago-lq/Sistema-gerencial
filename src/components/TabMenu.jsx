import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/configs";
import CadastroClientes from "./Clientes/CadastroClientes";
import CadastroFornecedor from "./Fornecedor/CadastroFornecedor";
import CadastroProduto from "./Produtos/CadastroProduto";
import Logout from "../assets/logout.png";
import Logo from "../assets/logo.png";
import Financeiro from "./Financeiro";
import Vendas from "./Vendas";
import CRM from "./CRM";

export default function TabMenu({logout}) {
  const [tabMenu, setTabMenu] = useState("CadastroClientes");
  const [cliente, setCliente] = useState([]);
  const [editarCliente, setEditarCliente] = useState([]);
  const [modalEditarCliente, setModalEditarCliente] = useState(false);
  const [fornecedor, setFornecedor] = useState([]);
  const [editarFornecedor, setEditarFornecedor] = useState([]);
  const [modalEditarFornecedor, setModalEditarFornecedor] = useState(false);
  const [produto, setProduto] = useState([]);
  const [editarProduto, setEditarProduto] = useState([]);
  const [modalEditarProduto, setModalEditarProduto] = useState(false);

  function serializeForm(formElement) {
    const formData = new FormData(formElement);
    const data = {};

    for (const [key, value] of formData.entries()) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }

    return data;
  }


  useEffect(() => {
    const q = collection(db, "Clientes");
    const unsub = onSnapshot(q, (snapshot) => {
      const listaCliente = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCliente(listaCliente);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const q = collection(db, "Fornecedores");
    const unsub = onSnapshot(q, (snapshot) => {
      const listaFornecedor = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFornecedor(listaFornecedor);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const q = collection(db, "Produtos");
    const unsub = onSnapshot(q, (snapshot) => {
      const listaProdutos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduto(listaProdutos);
    });

    return () => unsub();
  }, []);

  const SalvaDBClientes = async (e) => {
    e.preventDefault();
    const formulario = document.getElementById("ClientesADD");
    const clientes = serializeForm(formulario);
    const { nome, cpf, celular, email, endereco, data } = clientes;
    if (!nome || !cpf || !celular || !email || !endereco || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, "Clientes"), clientes);
    resetarFormularioCliente();
    alert("Cliente cadastrado com sucesso!");
  };

  const SalvaDBFornecedores = async (e) => {
    e.preventDefault();
    const formulario = document.getElementById("FornecedoresADD");
    const fornecedores = serializeForm(formulario);
    const { nome, cnpjCpf, telefone, email, endereco, cep } = fornecedores;
    if (!nome || !cnpjCpf || !telefone || !email || !endereco || !cep) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, "Fornecedores"), fornecedores);
    resetarFormularioFornecedor();
    alert("Fornecedor cadastrado com sucesso!");
  };

  const SalvaDBProdutos = async (e) => {
    e.preventDefault();
    const formulario = document.getElementById("ProdutosADD");
    const produtos = serializeForm(formulario);
    const { nome, codigo, imagem, preco, quantidade, data } = produtos;
    if (!nome || !codigo || !preco || !quantidade || !imagem || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, "Produtos"), produtos);
    resetarFormularioProduto();
    alert("Produto cadastrado com sucesso!");
  };

  async function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este Cliente?")) {
      await deleteDoc(doc(db, "Clientes", id));
    }
  }

  async function excluirFornecedor(id) {
    if (confirm("Tem certeza que deseja excluir este Fornecedor?")) {
      await deleteDoc(doc(db, "Fornecedores", id));
    }
  }

  async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteDoc(doc(db, "Produtos", id));
    }
  }

  function resetarFormularioCliente() {
    const form = document.getElementById("ClientesADD");
    if (form) form.reset();
  }

  function resetarFormularioFornecedor() {
    const form = document.getElementById("FornecedoresADD");
    if (form) form.reset();
  }

  function resetarFormularioProduto() {
    const form = document.getElementById("ProdutosADD");
    if (form) form.reset();
  }

  function clienteEditar(cliente) {
    setEditarCliente(cliente);
    setModalEditarCliente(true);
  }

  function fornecedorEditar(fornecedor) {
    setEditarFornecedor(fornecedor);
    setModalEditarFornecedor(true);
  }

  function produtoEditar(produto) {
    setEditarProduto(produto);
    setModalEditarProduto(true);
  }

  async function salvarEdicaoClientes(e) {
    e.preventDefault();
    const ref = doc(db, "Clientes", editarCliente.id);
    const { nome, cpf, celular, email, endereco, data } =
      editarCliente;
    if (!nome || !cpf || !celular || !email || !endereco || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }  

    await updateDoc(ref, {
      nome,
      cpf,
      celular,
      email,
      endereco,
      data,
    });
    alert("Cliente atualizado")
    setModalEditarCliente(false)
  }

  async function salvarEdicaoFornecedores(e) {
    e.preventDefault();
    const ref = doc(db, "Fornecedores", editarFornecedor.id);
    const { nome, cnpjCpf, telefone, email, endereco, cep } =
      editarFornecedor;
    if (!nome || !cnpjCpf || !telefone || !email || !endereco || !cep) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    await updateDoc(ref, {
      nome,
      cnpjCpf,
      telefone,
      email,
      endereco,
      cep,
    });
    alert("Fornecedor atualizado")
    setModalEditarFornecedor(false)
  }

  async function salvarEdicaoProdutos(e) {
    e.preventDefault();
    const ref = doc(db, "Produtos", editarProduto.id);
    const { nome, codigo, imagem, preco, quantidade, data } =
      editarProduto;
    if (!nome || !codigo || !imagem || !preco || !quantidade || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }  

    await updateDoc(ref, {
      nome,
      codigo,
      imagem,
      preco,
      quantidade,
      data,
    });
    alert("Produto atualizado")
    setModalEditarProduto(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400">
      <div className="flex justify-between gap-10 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 w-full z-50 shadow-xl">
        <div>
          <img src={Logo} alt="Logo" className="h-[5rem]"/>
        </div>
        <div className="flex gap-10">
            <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "CadastroClientes"
              ? "border-b-2 border-black font-bold text-xl"
              : ""
          }`}
          onClick={() => setTabMenu("CadastroClientes")}
        >
          <p className="font-semibold">Cadastro de Clientes</p>
        </button>
        <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "CadastroFornecedores"
              ? "border-b-2 border-black font-bold text-xl"
              : ""
          }`}
          onClick={() => setTabMenu("CadastroFornecedores")}
        >
          <p className="font-semibold">Cadastro de Fornecedores</p>
        </button>
        <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "Produtos" ? "border-b-2 border-black font-bold text-xl" : ""
          }`}
          onClick={() => setTabMenu("Produtos")}
        >
          <p className="font-semibold">Produtos</p>
        </button>
        <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "Financeiro" ? "border-b-2 border-black font-bold text-xl" : ""
          }`}
          onClick={() => setTabMenu("Financeiro")}
        >
          <p className="font-semibold">Financeiro</p>
        </button>
        <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "Vendas" ? "border-b-2 border-black font-bold text-xl" : ""
          }`}
          onClick={() => setTabMenu("Vendas")}
        >
          <p className="font-semibold">Vendas</p>
        </button>
        <button
          className={`pb-2 hover:opacity-60 text-lg transition cursor-pointer ${
            tabMenu === "CRM" ? "border-b-2 border-black font-bold text-lg" : ""
          }`}
          onClick={() => setTabMenu("CRM")}
        >
          <p className="font-semibold">CRM</p>
        </button>
        </div>
        <div className="mx-4 my-5">
          <button onClick={logout}>
            <img src={Logout} alt="Sair" className="hover:opacity-60 cursor-pointer h-[2rem]"/>
          </button>
        </div>
      </div>
      <div className="mt-6">
        {tabMenu === "CadastroClientes" && 
            <CadastroClientes
              aoSalvar={SalvaDBClientes}
              listaCliente={cliente}
              clienteEditar={clienteEditar}
              clientes={cliente}
              excluirCliente={excluirCliente}
              salvarEdicao={salvarEdicaoClientes}
              modalEditarCliente={modalEditarCliente}
              editarCliente={editarCliente}
              setEditarCliente={setEditarCliente}
            />
        }
        {tabMenu === "CadastroFornecedores" &&
          <CadastroFornecedor
            aoSalvar={SalvaDBFornecedores}
            listaFornecedor={fornecedor}
            fornecedorEditar={fornecedorEditar}
            excluirFornecedor={excluirFornecedor}
            salvarEdicao={salvarEdicaoFornecedores}
            modalEditarFornecedor={modalEditarFornecedor}
            editarFornecedor={editarFornecedor}
            setEditarFornecedor={setEditarFornecedor}
          />
        }
        {tabMenu === "Produtos" &&
          <CadastroProduto
            aoSalvar={SalvaDBProdutos}
            listaProduto={produto}
            produtoEditar={produtoEditar}
            excluirProduto={excluirProduto}
            salvarEdicao={salvarEdicaoProdutos}
            modalEditarProduto={modalEditarProduto}
            editarProduto={editarProduto}
            setEditarProduto={setEditarProduto}
          />
        }
        {
          tabMenu === "Financeiro" &&
          <Financeiro/>
        }
        {
          tabMenu === "Vendas" &&
          <Vendas/>
        }
        {
          tabMenu === "CRM" &&
          <CRM/>
        }
      </div>
    </div>
  );
}