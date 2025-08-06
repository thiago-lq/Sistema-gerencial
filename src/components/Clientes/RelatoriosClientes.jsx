import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RelatorioClientes({ clientes }) {
  const agora = new Date();
  const umMesAtras = new Date();
  umMesAtras.setMonth(agora.getMonth() - 1);

  const mesAtual = agora.getMonth();

  // Clientes aniversariantes do mês
  const aniversariantesDoMes = clientes.filter(c => {
    if (!c.data) return false;
    const dataNascimento = new Date(c.data);
    return dataNascimento.getMonth() === mesAtual;
  });

  // Função para calcular idade baseado na data de nascimento
  function calculaIdade(dataNascimentoStr) {
    const nascimento = new Date(dataNascimentoStr);
    let idade = agora.getFullYear() - nascimento.getFullYear();
    const m = agora.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && agora.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  // Calcular média das idades
  const idades = clientes
    .filter(c => c.data)
    .map(c => calculaIdade(c.data));

  const mediaIdade =
    idades.length > 0
      ? (idades.reduce((acc, val) => acc + val, 0) / idades.length).toFixed(1)
      : "N/A";

  // Faixas etárias para o gráfico
  const faixas = [
    { label: "0-17", min: 0, max: 17 },
    { label: "18-25", min: 18, max: 25 },
    { label: "26-35", min: 26, max: 35 },
    { label: "36-45", min: 36, max: 45 },
    { label: "46-60", min: 46, max: 60 },
    { label: "60+", min: 61, max: 150 },
  ];

  // Conta quantos clientes em cada faixa
  const contagemFaixas = faixas.map(({ min, max }) =>
    idades.filter(idade => idade >= min && idade <= max).length
  );

  // Dados para o gráfico
  const data = {
    labels: faixas.map(f => f.label),
    datasets: [
      {
        label: "Quantidade de Clientes",
        data: contagemFaixas,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // azul Tailwind
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de Clientes por Faixa Etária",
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-xl mt-5">
      <h2 className="text-2xl font-bold mb-6">Relatório de Clientes</h2>

      <div className="flex flex-row justify-between">
        <div>
        <p>Total de clientes cadastrados: <strong>{clientes.length}</strong></p>
        <p>Média de idade dos clientes: <strong>{mediaIdade} anos</strong></p>
      </div>

      <div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Aniversariantes do mês</h3>
        {aniversariantesDoMes.length > 0 ? (
          <ul className="list-disc list-inside">
            {aniversariantesDoMes.map(c => (
              <li key={c.id}>{c.nome} — {new Date(c.data).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>Não há aniversariantes neste mês.</p>
        )}
      </div>
      </div>

      <div className="mt-10">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
