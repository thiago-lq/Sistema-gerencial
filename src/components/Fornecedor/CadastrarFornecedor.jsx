export default function CadastrarFornecedor({
  aoSalvar,
}) {
  return (
    <div className="m-15 justify-center">
      <form
        id="FornecedoresADD"
        onSubmit={aoSalvar}
        className="space-y-10 gap-10"
      >
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
          <h1>Nome</h1>
          <input
          type="text"
          name="nome"
          placeholder="Digite o nome"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
          />
          </div>
        <div className="flex flex-col gap-3">
          <h1>CPF ou CNPJ</h1>
        <input
          type="text"
          name="cnpjCpf"
          placeholder="Digite o CPF ou CNPJ"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Telefone</h1>
        <input
          type="tel"
          name="telefone"
          placeholder="Digite o número de telefone"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        </div>
        <div className="flex flex-col gap-3">
          <h1>E-mail</h1>
        <input
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Endereço</h1>
        <input
          type="text"
          name="endereco"
          placeholder="Digite o endereço"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        </div>
        <div className="flex flex-col gap-3">
          <h1>CEP</h1>
        <input
          type="tel"
          name="cep"
          placeholder="Digite o CEP"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        </div>
        <div className="col-span-3 flex justify-center p-5">
          <button
            type="submit"
            className="bg-black text-white text-lg hover:opacity-60 cursor-pointer px-8 py-3 rounded-md"
          >
            Cadastrar
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}
