export default function CadastrarProduto({
  aoSalvar,
  resetarFormularioProduto,
}) {
  return (
    <div className="m-15 justify-center">
      <form
        id="ProdutosADD"
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
          name="codigo"
          placeholder="Digite o codigo"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="url"
          name="imagem"
          placeholder="Digite a URL da imagem"
          className="border-2 border-black rounded-md p-2 bg-white"
          required
        ></input>
        <input
          type="number"
          name="preco"
          placeholder="Digite o preço"
          className="border-2 border-black rounded-md p-2 bg-white"
          min="0"
          step="0.01"
          required
        ></input>
        <input
          type="number"
          name="quantidade"
          placeholder="Digite a quantidade"
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
            onClick={resetarFormularioProduto}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
