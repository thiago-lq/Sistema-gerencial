export default function CadastrarProduto({ aoSalvar }) {
  return (
    <div className="m-15 justify-center">
      <form id="ProdutosADD" onSubmit={aoSalvar} className="space-y-10 gap-10">
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
            <h1>Código</h1>
            <input
              type="text"
              name="codigo"
              placeholder="Digite o codigo"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            ></input>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Imagem</h1>
            <input
              type="url"
              name="imagem"
              placeholder="Digite a URL da imagem"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            ></input>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Preço</h1>
            <input
              type="number"
              name="preco"
              placeholder="Digite o preço"
              className="border-2 border-black rounded-md p-2 bg-white"
              min="0"
              step="0.01"
              required
            ></input>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Quantidade</h1>
            <input
              type="number"
              name="quantidade"
              placeholder="Digite a quantidade"
              className="border-2 border-black rounded-md p-2 bg-white"
              required
            ></input>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Data de cadastro</h1>
            <input
              type="date"
              name="data"
              placeholder="dd/mm/aaaa"
              className="border-2 border-black rounded-md w-full p-2 bg-white"
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
