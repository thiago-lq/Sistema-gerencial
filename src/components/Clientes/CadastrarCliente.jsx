export default function CadastrarCliente({
  aoSalvar,
}) {
  return (
    <div className="m-15 justify-center">
      <form
        id="ClientesADD"
        onSubmit={aoSalvar}
        className="space-y-10 gap-10 justify between"
      >
        <div className="grid grid-cols-3 gap-10">
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
            <h1>CPF</h1>
            <input
              type="text"
              name="cpf"
              placeholder="Digite o CPF"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>Celular</h1>
            <input
              type="tel"
              name="celular"
              placeholder="Digite o número"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>E-mail</h1>
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>Endereço</h1>
            <input
              type="text"
              name="endereco"
              placeholder="Digite o endereço"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>Peso</h1>
            <input
              type="number"
              name="peso"
              placeholder="Digite o peso"
              className="border-2 border-black rounded-md p-2 bg-white"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>Altura</h1>
            <input
              type="number"
              name="altura"
              placeholder="Digite a altura"
              className="border-2 border-black rounded-md p-2 bg-white"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1>Data de nascimento</h1>
            <input
              type="date"
              name="dataNascimento"
              placeholder="dd/mm/aaaa"
              className="border-2 border-black rounded-md w-full p-2 bg-white"
              required
            />
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
