export default function CadastrarCliente({
  aoSalvar,
  resetarFormularioCliente,
}) {
  return (
    <div className="m-15 justify-center">
      <form
        id="ClientesADD"
        onSubmit={aoSalvar}
        className="space-y-10 grid grid-cols-3 gap-10"
      >
        <input
          type="text"
          name="nome"
          placeholder="Digite o nome"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="Digite o CPF"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="tel"
          name="celular"
          placeholder="Digite o número de celular"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="text"
          name="endereco"
          placeholder="Digite o endereço"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="date"
          name="data"
          placeholder="dd/mm/aaaa"
          className="border-2 border-black rounded-md w-max ml-18 p-2 bg-white"
          required
        ></input>
        <div className="col-span-3 flex justify-center p-5">
          <button
            type="submit"
            className="bg-black text-white text-lg hover:opacity-60 cursor-pointer px-8 py-3 rounded-md"
            onClick={resetarFormularioCliente()}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
